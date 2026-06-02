import React, { useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import blogData from '../data.json';
import './BlogDetail.css';



function BlogDetail() {
  const { id } = useParams();
  const post = blogData.find(p => p.id === id);
  const colors = post ? ({ accent: '#e8392a', dim: 'rgba(232,57,42,0.1)' }) : {};

  // Related posts
  const related = post
    ? blogData.filter(p => p.id !== post.id && (p.tags.some(t => post.tags.includes(t)))).slice(0, 3)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="detail-not-found">
        <h2>Article not found</h2>
        <Link to="/" className="back-btn">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {/* Top accent */}
      <div className="detail-top-line" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />

      <div className="detail-container">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Articles
          </Link>
        </nav>

        <div className="detail-layout">
          {/* Main article */}
          <article className="detail-article">
            {/* Header */}
            <header className="article-header">
              <div className="article-meta-top">
                <span className="article-date">{post.date}</span>
              </div>

              <h1 className="article-title">{post.title}</h1>

              <p className="article-summary">{post.summary}</p>

              <div className="article-author-row">
                <div className="article-author">
                  <div
                    className="article-author-avatar"
                    style={{ background: colors.dim, borderColor: colors.accent, color: colors.accent }}
                  >
                    {post.author.charAt(0)}
                  </div>
                  <div className="article-author-info">
                    <span className="article-author-name">{post.author}</span>
                    <span className="article-author-label">Author</span>
                  </div>
                </div>
                <div className="article-share">
                  <span className="share-label">Share</span>
                </div>
              </div>

              <div className="article-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
              </div>

              <div className="article-divider" style={{ background: `linear-gradient(90deg, red60, transparent)` }} />
            </header>

            {/* Content */}
            <div className="article-content">
              <img src={post.image} alt={post.title} className="article-image" />
              <div className="article-text">
                {post.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
            
          </article>

          {/* Sidebar */}
          <aside className="detail-sidebar">

            {/* Related */}
            {related.length > 0 && (
              <div className="sidebar-card related-card">
                <h3 className="sidebar-card-title">Related Articles</h3>
                <div className="related-list">
                  {related.map(r => {
                    return (
                      <Link key={r.id} to={`/blog/${r.id}`} className="related-item">
                        <div className="related-item-title">{r.title}</div>
                        <div className="related-item-author">{r.author} · {r.date}</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
