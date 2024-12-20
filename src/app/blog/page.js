// src/app/blog/page.js
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft } from 'lucide-react';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/images/do-baniye-logo.png" 
                alt="Do Baniye" 
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-[#C4A484]">DO BANIYE</span>
                <span className="text-xs tracking-wider text-[#C4A484]/80">
                  CREDIT CARDS. TRAVEL. LIFESTYLE
                </span>
              </div>
            </Link>
            <Link 
              href="/"
              className="flex items-center text-[#C4A484] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold text-[#C4A484] mb-16">Latest Blog Posts</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="border border-[#C4A484] group hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.cover_image || '/images/travel-1.jpg'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C4A484] transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/80 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#C4A484]/80 text-sm">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <div className="inline-flex items-center text-[#C4A484] group-hover:text-white transition-colors">
                    <span>Read More</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-[#C4A484]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/images/do-baniye-logo.png" 
                  alt="Do Baniye" 
                  className="h-12 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-semibold text-[#C4A484]">DO BANIYE</span>
                  <span className="text-xs tracking-wider text-[#C4A484]/80">
                    CREDIT CARDS. TRAVEL. LIFESTYLE
                  </span>
                </div>
              </div>
              <p className="text-white/80">
                Elevating lifestyles through strategic financial choices.
              </p>
            </div>
            <div>
              <h3 className="text-[#C4A484] font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <Link 
                  href="https://x.com/dobaniye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-[#C4A484] transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  @dobaniye
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#C4A484]/20 pt-8 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} Do Baniye. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}