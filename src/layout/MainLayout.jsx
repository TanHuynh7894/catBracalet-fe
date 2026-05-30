import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SmoothScroll from '../components/animations/SmoothScroll';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <SmoothScroll />
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
