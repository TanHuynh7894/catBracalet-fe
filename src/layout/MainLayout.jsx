import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import SmoothScroll from '../components/animations/SmoothScroll';
import { AnimatePresence } from 'framer-motion';

const MainLayout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Global luxury loading delay for first entry
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-ivory selection:bg-wine selection:text-white">
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>

            {!isLoading && (
                <div className="animate-in fade-in duration-1000">
                    <SmoothScroll />
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default MainLayout;
