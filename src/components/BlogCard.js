import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

function BlogCard({ post, index }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="blog-card"
      style={{ animationDelay: `${index * 380}ms` }}
    >
      <div className="card-inner">
        <div className="card-accent-line" style={{ background: "red" }} />
        <div className="card-header">
          <span className="card-date">{post.date}</span>
        </div>
        <img src={post.image} alt={post.title} className="card-image" />
        <h2 className="card-title">{post.title}</h2>
        <p className="card-summary">{post.summary}</p>

        <div className="card-footer">
          <div className="card-author">
            <div className="author-avatar" style={{ background: "#e92f30", borderColor: "#e92f30" }}>
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
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
