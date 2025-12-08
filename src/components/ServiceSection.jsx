import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceService } from '../services/serviceService';

export default function ServiceSection() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const data = await serviceService.getAll();
            setServices(data);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section id="services" className="py-24 bg-dark-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                            Our Services
                        </h3>
                        <h2 className="text-4xl font-bold text-white">บริการของเรา</h2>
                        <div className="w-20 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
                    </div>
                    <div className="text-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-gold-500"></i>
                        <p className="text-gray-400 mt-4">กำลังโหลดข้อมูล...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="py-24 bg-dark-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                        Our Services
                    </h3>
                    <h2 className="text-4xl font-bold text-white">บริการของเรา</h2>
                    <div className="w-20 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-dark-700 rounded-2xl p-8 border border-gray-700 card-hover group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full transition-all group-hover:bg-gold-500/20"></div>

                            {service.image_url ? (
                                <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
                                    <img
                                        src={service.image_url}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-dark-900 rounded-2xl flex items-center justify-center text-gold-500 text-3xl mb-6 shadow-lg group-hover:bg-gold-500 group-hover:text-black transition-colors">
                                    <i className={service.icon}></i>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 mb-6">
                                {service.description}
                            </p>
                            <Link
                                to="/service"
                                className="text-sm font-bold text-gold-500 uppercase tracking-wide group-hover:text-white"
                            >
                                ดูรายละเอียด <i className="fas fa-chevron-right text-xs ml-1"></i>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
