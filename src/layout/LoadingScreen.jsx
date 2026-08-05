import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-4xl md:text-6xl font-serif tracking-[0.3em] text-wine mb-4">CÁT</h1>
                    <span className="text-xs tracking-[0.5em] text-wine/40 uppercase">Bracelet</span>
                </motion.div>

                {}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-wine/10 overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full bg-champagne"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
