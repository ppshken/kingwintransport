import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';

export default function BlogSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            // Get recent 3 articles
            const response = await articleService.getAll(1, 3);
            setArticles(response.data || []);
        } catch (error) {
            console.error('Error loading articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" className="py-24 bg-dark-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                        News & Articles
                    </h3>
                    <h2 className="text-4xl font-bold text-white">บทความน่ารู้</h2>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-gold-500"></i>
                        <p className="text-gray-400 mt-4">กำลังโหลดข้อมูล...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className="bg-dark-900 rounded-2xl overflow-hidden shadow-lg group hover:shadow-gold-500/10 transition-all duration-300"
                            >
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={article.featured_image || `https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1000&auto=format&fit=crop`}
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {article.is_featured && (
                                        <div className="absolute top-4 left-4 bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                                            New
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="text-gray-500 text-sm mb-2">
                                        <i className="far fa-calendar-alt mr-2"></i>
                                        {formatDate(article.published_at || article.created_at)}
                                    </div>
                                    <a href={`/blog/${article.slug}`}>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                                            {article.title}
                                        </h3>
                                    </a>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                    <a
                                        href={`/blog/${article.slug}`}
                                        className="text-gold-500 font-medium text-sm hover:underline"
                                    >
                                        อ่านเพิ่มเติม
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
