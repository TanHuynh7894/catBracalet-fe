import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({
    children,
    width = "100%",
    delay = 0.2,
    duration = 0.8,
    y = 50,
    x = 0,
    staggerChildren = 0,
    className = ""
}) => {
    return (
        <motion.div
            className={className}
            style={{ position: 'relative', width }}
            initial={{ opacity: 0, y, x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for premium feel
                staggerChildren
            }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
