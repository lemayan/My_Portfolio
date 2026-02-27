import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import blogPostsData from '../data/blogPosts.json';
import SectionReveal from '../components/SectionReveal';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = blogPostsData.find((p) => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white text-2xl font-bold font-general">
                Post not found
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <motion.div
                    className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
                    animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]"
                    animate={{ x: [0, 90, 0], y: [0, -100, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionReveal>
                    {/* Back Button */}
                    <motion.button
                        onClick={() => navigate('/#blog')}
                        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
                        whileHover={{ x: -5 }}
                    >
                        <svg
                            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </motion.button>
                </SectionReveal>

                <SectionReveal>
                    <article className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                        {/* Header / Hero Image */}
                        <div className="relative h-64 md:h-96 w-full overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold backdrop-blur-md border border-purple-500/30">
                                        {post.category}
                                    </span>
                                    <span className="text-gray-300 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {post.readTime}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-general">
                                    {post.title}
                                </h1>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                        {post.author.split(' ').map((n) => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{post.author}</p>
                                        <p className="text-gray-400 text-sm">{post.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-8 md:p-12">
                            <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-headings:text-white prose-a:text-purple-400">
                                <p className="text-xl text-gray-200 font-medium mb-8 leading-relaxed border-l-4 border-purple-500 pl-4">
                                    {post.excerpt}
                                </p>
                                {/* Splitting the content by paragraphs if there are line breaks */}
                                {post.content.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-6 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Tags Section */}
                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-3">
                                {post.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-full text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                </SectionReveal>
            </div>
        </div>
    );
};

export default BlogPost;
