// src/app/blog/[slug]/page.js
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={block.id || index} className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
              {block.content}
            </p>
          </div>
        );

      case 'heading':
        return (
          <h2 
            key={block.id || index}
            className="text-3xl font-bold text-[#C4A484] mb-6 mt-12"
          >
            {block.content}
          </h2>
        );

      case 'image':
        return (
          <div key={block.id || index} className="mb-8">
            <img
              src={block.content}
              alt={block.caption || ''}
              className="w-full rounded-none border border-[#C4A484]"
            />
            {block.caption && (
              <p className="text-center text-white/60 mt-2">{block.caption}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#C4A484] text-xl">Loading...</div>
      </div>
    );
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
              href="/blog"
              className="flex items-center text-[#C4A484] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Blog Post Content */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Cover Image */}
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover mb-8 border border-[#C4A484]"
        />

        {/* Title and Meta */}
        <h1 className="text-4xl font-bold text-[#C4A484] mb-4">{post.title}</h1>
        <div className="text-[#C4A484]/80 mb-8">
          {new Date(post.created_at).toLocaleDateString()}
        </div>

        {/* Excerpt */}
        <div className="text-xl text-white/80 mb-12 leading-relaxed">
          {post.excerpt}
        </div>

        {/* Content Blocks */}
        <div className="space-y-6">
          {post.content_blocks && post.content_blocks.map((block, index) => 
            renderContentBlock(block, index)
          )}
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