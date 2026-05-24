import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import blogData from '../data.json';
import './BlogDetail.css';

const domainColors = {
  'Computer Vision': { accent: '#00d4ff', dim: 'rgba(0,212,255,0.1)' },
  'Natural Language Processing': { accent: '#a855f7', dim: 'rgba(168,85,247,0.1)' },
  'Machine Learning': { accent: '#22c55e', dim: 'rgba(34,197,94,0.1)' },
  'Deep Learning': { accent: '#f97316', dim: 'rgba(249,115,22,0.1)' },
  'Generative AI': { accent: '#ec4899', dim: 'rgba(236,72,153,0.1)' },
};

// Simple markdown renderer
function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  let tableBuffer = [];
  let inTable = false;

  const flushTable = () => {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer.map(r =>
      r.split('|').filter(c => c.trim() !== '').map(c => c.trim())
    );
    const header = rows[0];
    const body = rows.slice(2);
    elements.push(
      <div key={`table-${i}`} className="md-table-wrapper">
        <table className="md-table">
          <thead>
            <tr>{header.map((h, j) => <th key={j}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {body.map((r, j) => (
              <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
    inTable = false;
  };

  while (i < lines.length) {
    const line = lines[i];
    // Paragraph
    elements.push(<p key={`p-${i}`} className="md-p">{renderInline(line)}</p>);
    i++;
  }

  if (inTable) flushTable();

  return elements;
}

function renderInline(text) {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
  // Italic
  text = text.replace(/\*(.+?)\*/g, (_, t) => `<em>${t}</em>`);
  // Inline code
  text = text.replace(/`(.+?)`/g, (_, t) => `<code class="md-inline-code">${t}</code>`);

  if (text !== text.replace(/<[^>]+>/g, '')) {
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return text;
}

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogData.find(p => p.id === id);
  const colors = post ? (domainColors[post.domain] || { accent: '#e8392a', dim: 'rgba(232,57,42,0.1)' }) : {};

  // Related posts
  const related = post
    ? blogData.filter(p => p.id !== post.id && (p.domain === post.domain || p.tags.some(t => post.tags.includes(t)))).slice(0, 3)
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

      {/* Background glow */}
      <div className="detail-bg-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${colors.dim.replace('0.1', '0.08')} 0%, transparent 60%)` }} />

      <div className="detail-container">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Articles
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{post.domain}</span>
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
                  <button className="share-btn" title="Copy link" onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 2h4v4M14 2L9 7M7 4H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
              {renderMarkdown(post.content)}
            </div>

            {/* Footer */}
            <footer className="article-footer">
              {/* <div className="article-footer-author">
                <div
                  className="article-author-avatar large"
                  style={{ background: colors.dim, borderColor: colors.accent, color: colors.accent }}
                >
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="footer-author-label">Written by</p>
                  <p className="footer-author-name">{post.author}</p>
                </div>
              </div>
              <Link to="/" className="back-to-blog">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Blog
              </Link> */}
            </footer>
          </article>

          {/* Sidebar */}
          <aside className="detail-sidebar">
            {/* Table of contents (simple)
            <div className="sidebar-card toc-card">
              <h3 className="sidebar-card-title">In This Article</h3>
              <nav className="toc-list">
                {post.content.split('\n')
                  .filter(l => l.startsWith('## '))
                  .map((l, i) => (
                    <span key={i} className="toc-item">{l.slice(3)}</span>
                  ))}
              </nav>
            </div> */}

            {/* Related */}
            {related.length > 0 && (
              <div className="sidebar-card related-card">
                <h3 className="sidebar-card-title">Related Articles</h3>
                <div className="related-list">
                  {related.map(r => {
                    const rc = domainColors[r.domain] || { accent: '#e8392a' };
                    return (
                      <Link key={r.id} to={`/blog/${r.id}`} className="related-item">
                        <div className="related-item-domain" style={{ color: rc.accent }}>{r.domain}</div>
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
