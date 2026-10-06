const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const nodemailer = require("nodemailer");

// In-memory store for OTPs
const otpStore = new Map();
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Session middleware (needed for Passport)
const session = require("express-session");
router.use(
  session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false })
);
router.use(passport.initialize());
router.use(passport.session());

// Passport GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = new User({
            name: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
            githubId: profile.id,
            password: "", // OAuth users don't have a local password
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Send OTP route
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const otp = generateOTP();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 mins expiry

    // Basic Nodemailer configuration. 
    // Requires EMAIL_USER and EMAIL_PASS set in .env
    // Console log the OTP for testing purposes in case the email fails!
    console.log(`\n\n============================`);
    console.log(`🔑 DEV MODE OTP: ${otp}`);
    console.log(`============================\n\n`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your ExtensionHub Signup OTP",
      text: `Your OTP for signup is: ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Nodemailer error:", err);
    // As a fallback for development when SMTP fails, still return a 200 so the UI can proceed
    // since we printed the OTP to the console!
    res.status(200).json({ message: "Email failed, but OTP was printed in the server console for testing." });
  }
});

// Signup route (Now checks OTP)
router.post("/signup", async (req, res) => {
  const { name, email, password, otp } = req.body;
  if (!otp) return res.status(400).json({ message: "OTP is required" });

  try {
    const storedOtpData = otpStore.get(email);
    if (!storedOtpData) return res.status(400).json({ message: "No OTP found. Please request one." });

    if (Date.now() > storedOtpData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired." });
    }

    if (storedOtpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Clear after success
    otpStore.delete(email);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🔹 GitHub OAuth login route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// 🔹 GitHub OAuth callback route
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Issue JWT after successful GitHub login
    const token = jwt.sign({ id: req.user._id, name: req.user.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

module.exports = router;
