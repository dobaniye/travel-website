// src/app/admin/page.js
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowUpRight, Edit, Trash, Plus } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = 'dobaniye123'; // Change this to your desired password

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

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

  async function deletePost(id) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchPosts();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md w-full p-6 border border-[#C4A484]">
          <h1 className="text-2xl font-bold text-[#C4A484] mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 mb-4 bg-black border border-[#C4A484] text-white"
            />
            <button
              type="submit"
              className="w-full bg-[#C4A484] text-black py-2 font-semibold hover:bg-[#8B7355] transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#C4A484]">Blog Admin</h1>
          <Link
            href="/admin/new"
            className="inline-flex items-center bg-[#C4A484] text-black px-4 py-2 font-semibold hover:bg-[#8B7355] transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border border-[#C4A484] p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#C4A484] mb-2">{post.title}</h2>
                  <p className="text-white/80">{post.excerpt}</p>
                  <div className="text-sm text-[#C4A484]/60 mt-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="text-[#C4A484] hover:text-white transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#C4A484]/20">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#C4A484] hover:text-white transition-colors"
                  target="_blank"
                >
                  <span>View Post</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}