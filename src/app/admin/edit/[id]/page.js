// src/app/admin/new/page.js (or edit/[id]/page.js)
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, X, ArrowUp, ArrowDown, Image as ImageIcon, Type, Heading } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BlogForm() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    cover_image: '/images/travel-1.jpg',
    content_blocks: [] // Array of content blocks
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetchPost(params.id);
    }
  }, [params?.id]);

  async function fetchPost(id) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFormData({
        ...data,
        content_blocks: data.content_blocks || []
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function handleTitleChange(e) {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  }

  function handleBasicChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function addContentBlock(type) {
    setFormData(prev => ({
      ...prev,
      content_blocks: [...prev.content_blocks, {
        id: Date.now(),
        type,
        content: type === 'image' ? '/images/travel-1.jpg' : '',
        caption: type === 'image' ? '' : undefined
      }]
    }));
  }

  function removeContentBlock(index) {
    setFormData(prev => ({
      ...prev,
      content_blocks: prev.content_blocks.filter((_, i) => i !== index)
    }));
  }

  function moveContentBlock(index, direction) {
    const newBlocks = [...formData.content_blocks];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
      setFormData(prev => ({
        ...prev,
        content_blocks: newBlocks
      }));
    }
  }

  function updateContentBlock(index, updatedContent) {
    setFormData(prev => ({
      ...prev,
      content_blocks: prev.content_blocks.map((block, i) => 
        i === index ? { ...block, ...updatedContent } : block
      )
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (params?.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', params.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        
        if (error) throw error;
      }

      router.push('/admin');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving post');
    } finally {
      setIsLoading(false);
    }
  }

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="relative border border-[#C4A484] p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <label className="text-[#C4A484]">Text Block</label>
              <div className="flex space-x-2">
                <button type="button" onClick={() => moveContentBlock(index, -1)}>
                  <ArrowUp className="w-4 h-4 text-[#C4A484]" />
                </button>
                <button type="button" onClick={() => moveContentBlock(index, 1)}>
                  <ArrowDown className="w-4 h-4 text-[#C4A484]" />
                </button>
                <button type="button" onClick={() => removeContentBlock(index)}>
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => updateContentBlock(index, { content: e.target.value })}
              className="w-full p-3 bg-black border border-[#C4A484] text-white h-32"
              placeholder="Enter text content..."
            />
          </div>
        );

      case 'heading':
        return (
          <div className="relative border border-[#C4A484] p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <label className="text-[#C4A484]">Heading</label>
              <div className="flex space-x-2">
                <button type="button" onClick={() => moveContentBlock(index, -1)}>
                  <ArrowUp className="w-4 h-4 text-[#C4A484]" />
                </button>
                <button type="button" onClick={() => moveContentBlock(index, 1)}>
                  <ArrowDown className="w-4 h-4 text-[#C4A484]" />
                </button>
                <button type="button" onClick={() => removeContentBlock(index)}>
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateContentBlock(index, { content: e.target.value })}
              className="w-full p-3 bg-black border border-[#C4A484] text-white"
              placeholder="Enter heading text..."
            />
          </div>
        );

      case 'image':
        return (
          <div className="relative border border-[#C4A484] p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <label className="text-[#C4A484]">Image</label>
              <div className="flex space-x-2">
                <button type="button" onClick={() => moveContentBlock(index, -1)}>
                  <ArrowUp className="w-4 h-4 text-[#C4A484]" />
                </button>
                <button type="button" onClick={() => moveContentBlock(index, 1)}>
                  <ArrowDown className="w-4 h-4 text-[#C4A484]" />
                </button>
                <button type="button" onClick={() => removeContentBlock(index)}>
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateContentBlock(index, { content: e.target.value })}
              className="w-full p-3 bg-black border border-[#C4A484] text-white mb-2"
              placeholder="Enter image URL..."
            />
            <input
              type="text"
              value={block.caption || ''}
              onChange={(e) => updateContentBlock(index, { caption: e.target.value })}
              className="w-full p-3 bg-black border border-[#C4A484] text-white"
              placeholder="Enter image caption (optional)..."
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-[#C4A484] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-[#C4A484]">
            {params?.id ? 'Edit Post' : 'New Post'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Post Information */}
          <div>
            <label className="block text-[#C4A484] mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full p-3 bg-black border border-[#C4A484] text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[#C4A484] mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleBasicChange}
              className="w-full p-3 bg-black border border-[#C4A484] text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[#C4A484] mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleBasicChange}
              className="w-full p-3 bg-black border border-[#C4A484] text-white h-24"
              required
            />
          </div>

          <div>
            <label className="block text-[#C4A484] mb-2">Cover Image URL</label>
            <input
              type="text"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleBasicChange}
              className="w-full p-3 bg-black border border-[#C4A484] text-white"
              required
            />
          </div>

          {/* Content Blocks */}
          <div>
            <label className="block text-[#C4A484] mb-4">Content Blocks</label>
            
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => addContentBlock('text')}
                className="flex items-center px-4 py-2 border border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-black transition-all"
              >
                <Type className="w-4 h-4 mr-2" />
                Add Text
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('heading')}
                className="flex items-center px-4 py-2 border border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-black transition-all"
              >
                <Heading className="w-4 h-4 mr-2" />
                Add Heading
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('image')}
                className="flex items-center px-4 py-2 border border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-black transition-all"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Add Image
              </button>
            </div>

            <div className="space-y-4">
              {formData.content_blocks.map((block, index) => (
                <div key={block.id}>
                  {renderContentBlock(block, index)}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C4A484] text-black py-3 font-semibold hover:bg-[#8B7355] transition-all disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : params?.id ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}