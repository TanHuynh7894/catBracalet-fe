
import React from 'react';

// Landing Sections
import Hero from './LandingSections/Hero';
import Benefits from './LandingSections/Benefits';
import Problem from './LandingSections/Problem';
import AboutSection from './LandingSections/SectionAbout';
import Comparison from './LandingSections/Comparison';
import HowItWorks from './LandingSections/HowItWorks';
import CustomMix from './LandingSections/CustomMix';
import Slogan from './LandingSections/Slogan';
import Collection from './LandingSections/Collection';
import Testimonials from './LandingSections/Testimonials';
import BrandStory from './LandingSections/BrandStory';
import Consultation from './LandingSections/Consultation';

const Home = () => {
    return (
        <>
            <Hero />
            <Benefits />
            <Problem />
            <AboutSection />
            <Comparison />
            <HowItWorks />
            <CustomMix />
            <Slogan />
            <Collection />
            <Testimonials />
            <BrandStory />
            <Consultation />
        </>
    );
};

export default Home;
