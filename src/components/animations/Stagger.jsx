import React from 'react';
import { motion } from 'framer-motion';

export const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.1, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        delayChildren,
                        staggerChildren
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, y = 30, x = 0, className = "" }) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y, x },
                show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
        >
            {children}
        </motion.div>
    );
};
