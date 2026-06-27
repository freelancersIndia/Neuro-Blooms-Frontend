import React, { useState, useEffect } from 'react';
import { useBlogs } from '../../hooks/useBlogs';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../../components/common/ErrorMessage';

// Subcomponents
import BlogHeroSection from './components/BlogHeroSection';
import FeaturedBlogSection from './components/FeaturedBlogSection';
import LatestArticlesSection from './components/LatestArticlesSection';
import CategoriesSection from './components/CategoriesSection';
import PopularBlogsSection from './components/PopularBlogsSection';
import NewsletterSection from './components/NewsletterSection';
import BlogCTASection from './components/BlogCTASection';

export const BlogPage = () => {
  const { data: blogs, isLoading, error, refetch } = useBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 when search query or selected category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Available categories for filter pills
  const categories = [
    'All',
    'Autism',
    'ADHD',
    'Parenting',
    'Early Intervention',
    'Development',
    'Speech',
    'Learning'
  ];

  // Dynamic SEO Setup
  useEffect(() => {
    document.title = 'Parent Resources & Clinical Insights | Neuro Blooms';

    // Meta description update
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore expert articles, parenting tips, child development insights, and guidance on ADHD, autism, speech delay, and milestones from Neuro Blooms.'
      );
    }

    // Add JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Neuro Blooms Parent Resource Hub",
      "url": window.location.href,
      "description": "Expert insights and guides for child developmental delays, autism, speech delay, and ADHD.",
      "publisher": {
        "@type": "MedicalOrganization",
        "name": "Neuro Blooms",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/favicon.svg`
        }
      }
    };

    const scriptId = 'blogs-structured-data';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[65vh]" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} className="my-20" />;
  }

  // Find featured blog
  const featuredBlog = blogs?.find(b => b.isFeatured) || blogs?.[0];

  // Filter latest articles based on Search query & selected category
  const filteredLatest = (blogs || []).filter((blog) => {
    // Search Filter
    const matchesSearch = searchQuery
      ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Category Filter
    const matchesCategory = selectedCategory === 'All'
      ? true
      : blog.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Exclude featured article only when no active filters to avoid duplicates
  const displayedLatest = (!searchQuery && selectedCategory === 'All')
    ? filteredLatest.filter(b => !b.isFeatured)
    : filteredLatest;

  // Most Read Articles (Popular)
  const popularBlogs = (blogs || []).filter(b => b.views && !b.isFeatured).slice(0, 5);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    // Scroll smoothly to top of listing anchor
    const element = document.getElementById('articles-listing-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full select-none">
      
      {/* 1. Hero Section (Includes category pills and search input) */}
      <BlogHeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <div id="articles-listing-anchor" />

      {/* 2. Featured Blog Card */}
      {/* Only show featured blog when not filtering or when category matches "Autism" or "All" */}
      {(!searchQuery && (selectedCategory === 'All' || selectedCategory === 'Autism')) && (
        <FeaturedBlogSection featuredBlog={featuredBlog} />
      )}

      {/* 3. Latest Articles (Dynamic Grid) */}
      <LatestArticlesSection
        blogs={displayedLatest}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onResetFilters={handleResetFilters}
      />

      {/* 4. Explore by Category Section */}
      <CategoriesSection
        onSelectCategory={(catName) => setSelectedCategory(catName)}
      />

      {/* 5. Most Read Articles (Popular Slider Carousel) */}
      <PopularBlogsSection
        popularBlogs={popularBlogs}
        onResetFilters={handleResetFilters}
      />

      {/* 6. Newsletter Subscription Card */}
      <NewsletterSection />

      {/* 7. Bottom Appointment CTA Section */}
      <BlogCTASection />

    </div>
  );
};

export default BlogPage;
