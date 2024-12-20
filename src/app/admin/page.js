'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Edit, Trash, Plus } from 'lucide-react';
import Link from 'next/link';
import { createSupabaseClient } from '@/lib/supabase/client';

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [supabase, setSupabase] = useState(null);
  const ADMIN_PASSWORD = 'dobaniye123';

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setSupabase(createSupabaseClient());
      const isAuth = localStorage.getItem('isAdminAuthenticated');
      if (isAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && supabase && isClient) {
      fetchPosts();
    }
  }, [isAuthenticated, supabase, isClient]);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function deletePost(id) {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting post. Please try again.');
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      alert('Invalid password');
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#C4A484] text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md w-full p-6 border border-[#C4A484]">
          <div className="flex items-center space-x-3 mb-8">
            <img 
              src="/images/do-baniye-logo.png" 
              alt="Do Baniye" 
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-[#C4A484]">DO BANIYE</span>
              <span className="text-xs tracking-wider text-[#C4A484]/80">ADMIN PANEL</span>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 bg-black border border-[#C4A484] text-white rounded-none focus:outline-none focus:border-[#8B7355]"
            />
            <button
              type="submit"
              className="w-full bg-[#C4A484] text-black py-3 font-semibold hover:bg-[#8B7355] transition-all rounded-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#C4A484] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/do-baniye-logo.png" 
              alt="Do Baniye" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#C4A484]">Blog Admin</h1>
              <p className="text-sm text-[#C4A484]/60">{posts.length} posts</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-[#C4A484] hover:text-white transition-colors">
              View Website
            </Link>
            <Link
              href="/admin/new"
              className="inline-flex items-center bg-[#C4A484] text-black px-4 py-2 font-semibold hover:bg-[#8B7355] transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 border border-[#C4A484] border-dashed">
              <p className="text-white/80 mb-4">No blog posts yet</p>
              <Link
                href="/admin/new"
                className="inline-flex items-center text-[#C4A484] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create your first post
              </Link>
            </div>
          ) : (
            posts.map((post) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}