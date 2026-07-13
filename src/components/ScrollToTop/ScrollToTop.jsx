import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

    useEffect(() => {
        // Toggle visibility based on scroll position
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Listen for authentication changes to adjust positioning
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem('accessToken'));
        };

        window.addEventListener('scroll', toggleVisibility);
        // Custom event or simple intervals to check token changes if route changes
        window.addEventListener('storage', checkAuth);
        const interval = setInterval(checkAuth, 1000);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            window.removeEventListener('storage', checkAuth);
            clearInterval(interval);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={scrollToTop}
                    className={`fixed ${isLoggedIn ? 'bottom-[100px]' : 'bottom-[28px]'
                        } right-[28px] z-[9990] flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#E8DED2] text-[#ab121c] shadow-xl hover:bg-[#ab121c] hover:text-[#FAF5EF] hover:border-[#ab121c] transition-all duration-300 transform hover:scale-110 active:scale-95`}
                    aria-label="Cuộn lên đầu trang"
                >
                    <ChevronUp size={22} strokeWidth={2.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
