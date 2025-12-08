import { useState, useEffect } from 'react';
import { customerService } from '../services/customerService';

export default function CustomerSection() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            // Get only active customers
            const data = await customerService.getAll(true);
            setCustomers(data);
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="customers" className="py-20 bg-dark-900 border-y border-gray-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                            Our Clients
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            ลูกค้าที่ไว้วางใจเรา
                        </h2>
                    </div>
                    <p className="text-gray-400 mt-4 md:mt-0 max-w-md text-right">
                        เราภูมิใจที่ได้เป็นส่วนหนึ่งในการเดินทางขององค์กรชั้นนำมากมาย
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-gold-500"></i>
                        <p className="text-gray-400 mt-4">กำลังโหลดข้อมูล...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {customers.map((customer) => (
                            <div
                                key={customer.id}
                                className="h-44 bg-dark-800 rounded-lg flex flex-col gap-1 items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all border border-gray-800 hover:border-gold-500/50"
                            >
                                <img
                                    src={customer.logo_url}
                                    alt={customer.name}
                                    className="max-h-24 max-w-full object-contain"
                                />
                                <span className="text-xl font-bold text-gray-500">{customer.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
