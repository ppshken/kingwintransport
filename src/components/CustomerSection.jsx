import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customerService } from '../services/customerService';

export default function CustomerSection() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            // Get only active customers, limit to 6 for homepage
            const data = await customerService.getActive();
            // Show only first 6 items for homepage
            setCustomers(data.slice(0, 6));
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-24 bg-dark-800">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center py-20">
                        <i className="fas fa-spinner fa-spin text-6xl text-gold-500"></i>
                    </div>
                </div>
            </section>
        );
    }

    if (customers.length === 0) {
        return null; // Don't show section if no activities
    }

    return (
        <section className="py-24 bg-dark-800">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                        Our Customers
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ลูกค้า<span className="text-gradient-gold">ของเรา</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        ภาพบรรยากาศการให้บริการลูกค้าของเรา
                    </p>
                </div>

                {/* Activities Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {customers.map((activity) => (
                        <div
                            key={activity.id}
                            className="bg-dark-900 rounded-2xl overflow-hidden border border-gray-700 card-hover group"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Tag */}
                                {activity.tags && activity.tags.length > 0 && (
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-gold-500 text-black text-xs font-bold rounded-full">
                                            {activity.tags[0]}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                                    {activity.title}
                                </h3>
                                <p className="text-gold-500 text-xs font-medium mb-3">
                                    <i className="fas fa-building mr-2"></i>
                                    {activity.subtitle}
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {activity.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center">
                    <Link
                        to="/customers"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full transition-colors shadow-lg"
                    >
                        ดูทั้งหมด
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}
