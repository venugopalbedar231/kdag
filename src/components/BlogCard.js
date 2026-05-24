import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const domainColors = {
  'Computer Vision': { accent: '#00d4ff', dim: 'rgba(0,212,255,0.1)' },
  'Natural Language Processing': { accent: '#a855f7', dim: 'rgba(168,85,247,0.1)' },
  'Machine Learning': { accent: '#22c55e', dim: 'rgba(34,197,94,0.1)' },
  'Deep Learning': { accent: '#f97316', dim: 'rgba(249,115,22,0.1)' },
  'Generative AI': { accent: '#ec4899', dim: 'rgba(236,72,153,0.1)' },
};

function BlogCard({ post, index }) {
  const colors = domainColors[post.domain] || { accent: '#e8392a', dim: 'rgba(232,57,42,0.1)' };

  return (
    <Link
      to={`/blog/${post.id}`}
      className="blog-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="card-inner">
        {/* Top accent line */}
        <div className="card-accent-line" style={{ background: "red" }} />

        {/* Header */}
        <div className="card-header">
          <span className="card-date">{post.date}</span>
        </div>
        <img src={post.image} alt={post.title} className="card-image" />
        {/* Title */}
        <h2 className="card-title">{post.title}</h2>

        {/* Summary */}
        <p className="card-summary">{post.summary}</p>

        {/* Footer */}
        <div className="card-footer">
          <div className="card-author">
            <div className="author-avatar" style={{ background: colors.dim, borderColor: colors.accent }}>
              {post.author.charAt(0)}
            </div>
            <span className="author-name">{post.author}</span>
          </div>
          <div className="card-tags">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="card-tag">{tag}</span>
            ))}
            {post.tags.length > 2 && (
              <span className="card-tag card-tag-more">+{post.tags.length - 2}</span>
            )}
          </div>
        </div>

        {/* Read more */}
        <div className="card-read-more">
          <span>Read Article</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
