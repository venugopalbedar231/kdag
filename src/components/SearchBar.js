import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <div className="search-icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M11.5 11.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search by title or author..."
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
