import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { vehicleTypeService } from '../services/vehicleTypeService';
import { vehicleImageService } from '../services/vehicleImageService';

export default function Service() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleImages, setVehicleImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentGallery, setCurrentGallery] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // Load vehicle types
            const types = await vehicleTypeService.getAll();
            setVehicleTypes(types);

            // Load images for each vehicle type
            const imagesData = {};
            for (const type of types) {
                const images = await vehicleImageService.getAll(type.id);
                imagesData[type.id] = images;
            }
            setVehicleImages(imagesData);
        } catch (error) {
            console.error('Error loading data:', error);
            alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
        } finally {
            setLoading(false);
        }
    };

    const openGallery = (vehicleTypeId) => {
        const images = vehicleImages[vehicleTypeId] || [];
        const vehicleType = vehicleTypes.find(vt => vt.id === vehicleTypeId);

        setCurrentGallery({
            title: `แกลเลอรี่: ${vehicleType?.name || 'รถ'}`,
            images: images.map(img => `http://localhost:5000${img.image_url}`)
        });
        setModalOpen(true);
    };

    const closeGallery = () => {
        setModalOpen(false);
        setCurrentGallery(null);
    };

    const openImage = (img) => {
        setSelectedImage(img);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const getMainImage = (vehicleTypeId) => {
        const images = vehicleImages[vehicleTypeId] || [];
        if (images.length > 0) {
            return `http://localhost:5000${images[0].image_url}`;
        }
        return 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop';
    };

    return (
        <>
            <Navbar />

            {/* Page Header */}
            <section className="relative h-[50vh] flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat mt-16">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        ประเภทรถ<span className="text-gradient-gold">ให้บริการ</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        เราคัดสรรรถคุณภาพเยี่ยม หลากหลายประเภท
                        เพื่อตอบโจทย์ทุกความต้องการในการเดินทางของคุณ
                    </p>
                </div>
            </section>

            {/* Vehicles List Section */}
            <section className="py-24 bg-dark-900">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <i className="fas fa-spinner fa-spin text-6xl text-gold-500"></i>
                            <p className="text-gray-400 mt-6 text-xl">กำลังโหลดข้อมูลรถ...</p>
                        </div>
                    ) : vehicleTypes.length === 0 ? (
                        <div className="text-center py-20">
                            <i className="fas fa-inbox text-6xl text-gray-600 mb-4"></i>
                            <p className="text-gray-400 text-xl">ยังไม่มีข้อมูลรถ</p>
                        </div>
                    ) : (
                        vehicleTypes.map((vehicle, index) => (
                            <div
                                key={vehicle.id}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } gap-8 ${index < vehicleTypes.length - 1 ? 'mb-24' : ''
                                    } items-center group`}
                            >
                                {/* Vehicle Image */}
                                <div
                                    className="w-full md:w-1/2 relative cursor-pointer overflow-hidden rounded-2xl"
                                    onClick={() => openGallery(vehicle.id)}
                                >
                                    <img
                                        src={getMainImage(vehicle.id)}
                                        alt={vehicle.name}
                                        className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="border border-gold-500 text-gold-500 px-6 py-2 rounded-full font-medium tracking-wide bg-black/60 backdrop-blur-sm">
                                            <i className="fas fa-images mr-2"></i> ดูรูปภาพเพิ่มเติม
                                        </span>
                                    </div>
                                    {vehicle.capacity && (
                                        <div className="absolute top-4 left-4 bg-gold-500 text-black font-bold px-4 py-1 rounded-md shadow-lg">
                                            {vehicle.capacity} ที่นั่ง
                                        </div>
                                    )}
                                </div>

                                {/* Vehicle Details */}
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-gold-500 text-sm font-bold tracking-widest uppercase mb-2">
                                        {vehicle.size ? `${vehicle.size} เมตร` : 'Premium Service'}
                                    </h3>
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        {vehicle.name}
                                    </h2>
                                    <p className="text-gray-400 mb-6 leading-relaxed whitespace-pre-line">
                                        {vehicle.description}
                                    </p>

                                    {/* Image Count */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <i className="fas fa-images text-gold-500"></i>
                                            <span>มีรูปภาพ {vehicleImages[vehicle.id]?.length || 0} รูป</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <a
                                            href="https://script.google.com/macros/s/AKfycbwI-nqrOcBlPgnigckVHeZdfriCUGs_CyCGuSHtH4_58E0o4jeZqLygYDNd1HtjpTBh/exec"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-gold px-8 py-3 rounded-full font-bold shadow-lg"
                                        >
                                            จองรถทันที <i className="fas fa-arrow-right ml-2"></i>
                                        </a>
                                        {vehicleImages[vehicle.id]?.length > 0 && (
                                            <button
                                                onClick={() => openGallery(vehicle.id)}
                                                className="px-6 py-3 rounded-full border border-gray-600 text-gray-300 hover:border-gold-500 hover:text-gold-500 transition-colors"
                                            >
                                                ดูรูปภาพ ({vehicleImages[vehicle.id].length})
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Gallery Modal */}
            {modalOpen && currentGallery && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeGallery}></div>
                    <div className="bg-dark-800 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-gray-700 relative z-10 flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-dark-900">
                            <h3 className="text-xl font-bold text-gold-500">{currentGallery.title}</h3>
                            <button
                                onClick={closeGallery}
                                className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto flex-1">
                            {currentGallery.images.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <i className="fas fa-image text-4xl mb-3 block"></i>
                                    <p>ยังไม่มีรูปภาพ</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {currentGallery.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => openImage(img)}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-700 bg-dark-900 text-center">
                            <p className="text-sm text-gray-400">
                                รูปภาพใช้เพื่อการโฆษณาเท่านั้น รถจริงอาจมีการตกแต่งแตกต่างกันเล็กน้อย
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Image Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={closeImage}>
                    <button
                        onClick={closeImage}
                        className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl transition-colors z-[80]"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full Screen"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <Footer />
        </>
    );
}
