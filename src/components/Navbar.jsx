import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = isScrolled
        ? 'fixed w-full z-50 transition-all duration-300 top-0 glass-nav py-2'
        : 'fixed w-full z-50 transition-all duration-300 top-0 py-4';

    return (
        <nav id="navbar" className={navClass}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/assets/kw_logo.png"
                        alt="KW Logo"
                        className="h-10 rounded-lg w-auto object-contain fallback-logo"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<i class="fas fa-crown text-gold-500 text-2xl px-2"></i>';
                        }}
                    />
                    <div>
                        <h1 className="text-xl font-bold tracking-wider text-white">
                            KINGWIN <span className="text-gold-500">TRANSPORT</span>
                        </h1>
                        <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">
                            Premium Bus Service
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="nav-link text-sm font-medium text-gray-300 hover:text-gold-400 uppercase tracking-wide">หน้าแรก</Link>
                    <Link to="/about" className="nav-link text-sm font-medium text-gray-300 hover:text-gold-400 uppercase tracking-wide">เกี่ยวกับเรา</Link>
                    <Link to="/service" className="nav-link text-sm font-medium text-gray-300 hover:text-gold-400 uppercase tracking-wide">บริการ</Link>
                    <Link to="/customers" className="nav-link text-sm font-medium text-gray-300 hover:text-gold-400 uppercase tracking-wide">ลูกค้าของเรา</Link>
                    <Link to="/partner" className="nav-link text-sm font-medium text-gray-300 hover:text-gold-400 uppercase tracking-wide">บริษัทในเครือ</Link>
                    <Link to="/blog" className="nav-link text-sm font-medium text-gray-300 hover:text-gold-400 uppercase tracking-wide">บทความ</Link>
                    <Link to="/contact" className="btn-gold px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]">ติดต่อเรา</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    id="menu-btn"
                    className="md:hidden text-gold-500 text-2xl focus:outline-none"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-40 transform transition-transform duration-300 mobile-menu flex flex-col justify-center items-center gap-8 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    id="close-menu"
                    className="absolute top-6 right-6 text-gold-500 text-3xl"
                    onClick={() => setIsOpen(false)}
                >
                    <i className="fas fa-times"></i>
                </button>
                <Link to="/" className="mobile-link text-2xl font-light text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>หน้าแรก</Link>
                <Link to="/about" className="mobile-link text-2xl font-light text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>เกี่ยวกับเรา</Link>
                <Link to="/service" className="mobile-link text-2xl font-light text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>บริการ</Link>
                <Link to="/customers" className="mobile-link text-2xl font-light text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>ลูกค้าของเรา</Link>
                <Link to="/partner" className="mobile-link text-2xl font-light text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>บริษัทในเครือ</Link>
                <Link to="/blog" className="mobile-link text-2xl font-light text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>บทความ</Link>
                <Link to="/contact" className="mobile-link text-2xl font-bold text-gold-500" onClick={() => setIsOpen(false)}>ติดต่อเรา</Link>
            </div>
        </nav>
    );
}
