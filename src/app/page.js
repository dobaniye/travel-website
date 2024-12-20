'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { CreditCard, Compass, Globe, DollarSign, ArrowUpRight, Star, TrendingUp, Map, Users, Calendar, ChevronRight } from 'lucide-react';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  async function fetchBlogPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/do-baniye-logo.png" 
                alt="Do Baniye" 
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-[#C4A484]">DO BANIYE</span>
                <span className="text-xs tracking-wider text-[#C4A484]/80">CREDIT CARDS. TRAVEL. LIFESTYLE</span>
              </div>
            </div>
            <div className="flex items-center space-x-12">
              <div className="hidden md:flex space-x-12 text-white text-lg">
                <button onClick={() => scrollToSection('services')} className="hover:text-[#C4A484] transition-colors">Services</button>
                <button onClick={() => scrollToSection('about')} className="hover:text-[#C4A484] transition-colors">About</button>
                <button onClick={() => scrollToSection('blog')} className="hover:text-[#C4A484] transition-colors">Blog</button>
              </div>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfCPfI5Cv_X0sIgjNQ49EtR3Y2znuubtqIviwwWbDjNc-S1wg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C4A484] text-black px-6 py-2 rounded-none font-semibold hover:bg-[#8B7355] transition-all"
              >
                Connect With Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#8B7355] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-[#C4A484] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-[#8B7355] rounded-none px-4 py-2 text-sm text-white mb-6">
                <Star className="w-4 h-4 text-[#C4A484] mr-2" />
                <span>Credit Card hacks & Travel deals</span>
              </div>
              <h1 className="text-6xl font-bold text-white leading-tight mb-6">
                Elevate Your
                <br />
                <span className="text-[#C4A484]">Lifestyle</span>
                <br />
                Journey.
              </h1>
              <p className="text-white/80 text-xl mb-8 max-w-lg">
                Discover premium credit card rewards, exclusive travel experiences, and sophisticated lifestyle choices.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfCPfI5Cv_X0sIgjNQ49EtR3Y2znuubtqIviwwWbDjNc-S1wg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C4A484] text-black px-8 py-4 rounded-none flex items-center space-x-2 hover:bg-[#8B7355] transition-all font-semibold"
                >
                  <span>Start Your Journey</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="px-8 py-4 rounded-none border-2 border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-black transition-all font-semibold"
                >
                  Explore Services
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-[#C4A484] text-3xl font-bold">₹10Cr+</div>
                  <div className="text-white/80">Rewards Generated</div>
                </div>
                <div>
                  <div className="text-[#C4A484] text-3xl font-bold">1000+</div>
                  <div className="text-white/80">Premium Clients</div>
                </div>
                <div>
                  <div className="text-[#C4A484] text-3xl font-bold">100%</div>
                  <div className="text-white/80">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-none overflow-hidden relative z-10">
                <img
                  src="/images/travel-1.jpg"
                  alt="Premium lifestyle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="absolute top-4 -right-4 bg-black/90 backdrop-blur-md p-4 rounded-none shadow-lg z-20 border border-[#C4A484]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C4A484]/20 rounded-none flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#C4A484]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#C4A484]">Average Benefits</div>
                    <div className="text-xl font-bold text-white">₹5L/Year</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-black/90 backdrop-blur-md p-4 rounded-none shadow-lg z-20 border border-[#C4A484]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C4A484]/20 rounded-none flex items-center justify-center">
                    <Map className="w-6 h-6 text-[#C4A484]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#C4A484]">Global Access</div>
                    <div className="text-xl font-bold text-white">Unlimited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#C4A484] mb-4">Premium Services</h2>
            <p className="text-white/80 text-lg">Exclusive benefits curated for the discerning individual</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: "Credit Card Portfolio Management",
                description: "Strategic credit card portfolio management for maximum lifestyle benefits and rewards."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Credit Card Points Redemption",
                description: "Great deals and hacks to maximize reapoing rewards from Credit Cards goldmine."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Trip/Itinerary planning",
                description: "Bespoke travel experiences and exclusive access to premium destinations worldwide."
              }
            ].map((service, index) => (
              <div key={index} className="bg-black border border-[#C4A484] p-8 hover:bg-[#C4A484]/10 transition-all duration-300">
                <div className="text-[#C4A484] mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/80 mb-6">{service.description}</p>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfCPfI5Cv_X0sIgjNQ49EtR3Y2znuubtqIviwwWbDjNc-S1wg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#C4A484] hover:text-white transition-colors"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#C4A484] mb-6">About Us</h2>
              <p className="text-white/80 text-lg mb-8">
                Do Baniye is your gateway to elevated living. We specialize in optimizing credit card rewards, crafting luxury travel experiences, and providing expert lifestyle consultation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "₹10Cr+", label: "Rewards Generated" },
                  { number: "1000+", label: "Premium Clients" },
                  { number: "100%", label: "Client Satisfaction" },
                  { number: "24/7", label: "Premium Support" }
                ].map((stat, index) => (
                  <div key={index} className="border border-[#C4A484] p-6">
                    <div className="text-[#C4A484] text-2xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="border border-[#C4A484]">
                <img
                  src="/images/travel-2.jpg"
                  alt="Premium lifestyle"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold text-[#C4A484]">Latest Insights</h2>
            <Link 
              href="/blog"
              className="inline-flex items-center text-[#C4A484] hover:text-white transition-colors"
            >
              <span>View All Posts</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
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
              ))
            ) : (
              [
                {
                  image: "travel-1.jpg",
                  title: "Premium Credit Cards Guide 2024",
                  description: "Exclusive insights into the most rewarding premium credit cards."
                },
                {
                  image: "travel-1.jpg",
                  title: "Maximizing Luxury Travel",
                  description: "Strategic approaches to elevate your travel experiences."
                },
                {
                  image: "travel-1.jpg",
                  title: "Lifestyle Optimization",
                  description: "Expert tips for maintaining a premium lifestyle through smart choices."
                }
              ].map((post, index) => (
                <div 
                  key={index}
                  className="border border-[#C4A484] group"
                >
                  <div className="relative h-48">
                    <img
                      src={`/images/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {post.title}
                    </h3>
                    <p className="text-white/80 mb-4">{post.description}</p>
                    <div className="inline-flex items-center text-[#C4A484]">
                      <span>Coming Soon</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#0A0A0A]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#C4A484] mb-6">
              Begin Your Premium Journey
            </h2>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              Join an exclusive community of discerning individuals who appreciate the finer aspects of life.
            </p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfCPfI5Cv_X0sIgjNQ49EtR3Y2znuubtqIviwwWbDjNc-S1wg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#C4A484] text-black px-8 py-4 rounded-none font-semibold hover:bg-[#8B7355] transition-all"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

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
                  <span className="text-xs tracking-wider text-[#C4A484]/80">CREDIT CARDS. TRAVEL. LIFESTYLE</span>
                </div>
              </div>
              <p className="text-white/80">
                Elevating lifestyles through strategic financial choices.
              </p>
            </div>

            <div>
              <h3 className="text-[#C4A484] font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfCPfI5Cv_X0sIgjNQ49EtR3Y2znuubtqIviwwWbDjNc-S1wg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-[#C4A484] transition-colors"
                >
                  Schedule Consultation
                </a>
                <a 
                  href="https://x.com/dobaniye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-[#C4A484] transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  @dobaniye
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#C4A484]/20 pt-8 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} Do Baniye. All rights reserved. Made with love</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

