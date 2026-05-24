import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar({ domains, tags, selectedDomain, selectedTags, onDomainChange, onTagChange, onClear }) {
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const visibleTags = tagsExpanded ? tags : tags.slice(0, 10);
  const hasFilters = selectedDomain || selectedTags.length > 0;

  return (
    <div className="filter-bar">

      {/* Tag filter */}
      <div className="filter-section" id="tags">
        <div className="filter-section-header">
          <span className="filter-label">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1h5l7 7-5 5L1 6V1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="4" cy="4" r="1" fill="currentColor"/>
            </svg>
            Tags
          </span>
          {selectedTags.length > 0 && (
            <span className="filter-count">{selectedTags.length} selected</span>
          )}
        </div>
        <div className="filter-pills">
          {visibleTags.map(tag => (
            <button
              key={tag}
              className={`filter-pill filter-pill-tag ${selectedTags.includes(tag) ? 'active active-tag' : ''}`}
              onClick={() => onTagChange(tag)}
            >
              {tag}
            </button>
          ))}
          {tags.length > 10 && (
            <button
              className="filter-pill filter-pill-more"
              onClick={() => setTagsExpanded(!tagsExpanded)}
            >
              {tagsExpanded ? 'Show less' : `+${tags.length - 10} more`}
            </button>
          )}
        </div>
      </div>

      {/* Clear all */}
      {hasFilters && (
        <button className="filter-clear-all" onClick={onClear}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
