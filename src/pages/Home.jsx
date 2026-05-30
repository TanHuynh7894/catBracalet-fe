
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Fingerprint, CheckCircle, Flower2 } from 'lucide-react';
import styles from './Home.module.css';
import Reveal from '../components/animations/Reveal';
import TextReveal from '../components/animations/TextReveal';
import { StaggerContainer, StaggerItem } from '../components/animations/Stagger';
import Parallax from '../components/animations/Parallax';
import { motion } from 'framer-motion';

// Components
import LandingNavbar from '../components/Landing/LandingNavbar';
import Hero from '../components/Landing/Hero';
import Benefits from '../components/Landing/Benefits';
import Problem from '../components/Landing/Problem';
import About from '../components/Landing/About';
import Comparison from '../components/Landing/Comparison';
import HowItWorks from '../components/Landing/HowItWorks';
import CustomMix from '../components/Landing/CustomMix';
import Slogan from '../components/Landing/Slogan';
import Collection from '../components/Landing/Collection';
import Testimonials from '../components/Landing/Testimonials';
import BrandStory from '../components/Landing/BrandStory';
import Consultation from '../components/Landing/Consultation';
import Footer from '../components/Landing/Footer';
import LoadingScreen from '../components/Landing/LoadingScreen';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Luxury loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-ivory selection:bg-wine selection:text-white">
            <AnimatePresence>
                {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>

            {!isLoading && (
                <div className="animate-in fade-in duration-1000">
                    <LandingNavbar />
                    <main>
                        <Hero />
                        <Benefits />
                        <Problem />
                        <About />
                        <Comparison />
                        <HowItWorks />
                        <CustomMix />
                        <Slogan />
                        <Collection />
                        <Testimonials />
                        <BrandStory />
                        <Consultation />
                    </main>
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Home;
