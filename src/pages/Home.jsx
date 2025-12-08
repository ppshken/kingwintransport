import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServiceSection from '../components/ServiceSection';
import CustomerSection from '../components/CustomerSection';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <AboutSection />
            <ServiceSection />
            <CustomerSection />
            <BlogSection />
            <Footer />
        </>
    );
}
