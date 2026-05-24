import React, { useState, useMemo } from 'react';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import blogData from '../data.json';
import './BlogListing.css';

function BlogListing() {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique domains and tags
  const domains = useMemo(() =>
    [...new Set(blogData.map(p => p.domain))].sort(), []);

  const tags = useMemo(() => {
    const all = blogData.flatMap(p => p.tags);
    const counts = {};
    all.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t);
  }, []);

  // Filter posts
  const filtered = useMemo(() => {
    return blogData.filter(post => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      const matchDomain = !selectedDomain || post.domain === selectedDomain;
      const matchTags = selectedTags.length === 0 ||
        selectedTags.every(t => post.tags.includes(t));
      return matchSearch && matchDomain && matchTags;
    });
  }, [search, selectedDomain, selectedTags]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedDomain(null);
    setSelectedTags([]);
    setSearch('');
  };

  const hasActiveFilters = selectedDomain || selectedTags.length > 0 || search;

  return (
    <div className="listing-page">
      {/* Hero */}
      <section className="hero">

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-main">BLOG</span>
          </h1>
          <p className="hero-subtitle">
            As we dive deeper into the world of Machine Learning every day, it becomes
            imperative to stay up-to-date with the different machine learning algorithms
            that not only help us build our data models but also provide an in-depth
            understanding of data science. Plunge right in and happy learning!
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{blogData.length}</span>
              <span className="hero-stat-label">Articles</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">{tags.length}</span>
              <span className="hero-stat-label">Topics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="listing-container">
        {/* Search bar */}
        <div className="search-row">
          <SearchBar value={search} onChange={setSearch} />
          <div className="results-count">
            {hasActiveFilters && (
              <span className="results-text">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <div className="listing-layout">
          {/* Sidebar filters */}
          <aside className="listing-sidebar">
            <FilterBar
              domains={domains}
              tags={tags}
              selectedDomain={selectedDomain}
              selectedTags={selectedTags}
              onDomainChange={setSelectedDomain}
              onTagChange={handleTagToggle}
              onClear={clearFilters}
            />
          </aside>

          {/* Blog grid */}
          <div className="listing-main">
            {filtered.length > 0 ? (
              <div className="blog-grid">
                {filtered.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3 className="no-results-title">No articles found</h3>
                <p className="no-results-text">
                  Try adjusting your search or filters
                </p>
                <button className="no-results-clear" onClick={clearFilters}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogListing;
