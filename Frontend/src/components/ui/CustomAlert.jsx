import React, { useEffect, useState } from "react";

const CustomAlert = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Allow exit animation to finish
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-4 min-w-[300px] text-center text-[hsl(184,70%,21%)] flex flex-col items-center gap-3">
                <p className="font-semibold text-lg text-slate-800">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="bg-[hsl(184,70%,21%)] text-white px-6 py-1.5 rounded-full text-sm font-medium hover:bg-[hsl(184,70%,15%)] transition shadow-md"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;
