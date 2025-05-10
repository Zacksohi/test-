import React, { useState, useEffect } from 'react';
import { PredefinedCommentDetail, CommentFilter } from '../../types/commentTypes';
import './CommentList.css';
import { usePredefinedComments } from '../../../../../workflow/hooks/getPredefinedComment';
import { DropDownCheckBox } from '@/components/shared/DropDownCheckBox';

interface CommentListProps {
  selectedComment: PredefinedCommentDetail | null;
  onSelect: (comment: PredefinedCommentDetail) => void;
  filter: CommentFilter;
  onFilterChange: (filter: CommentFilter) => void;
  searchQuery: string;
  comments: PredefinedCommentDetail[];
  onSearchChange: (query: string) => void;
  creators: string[];
  selectedCreators: string[];
  onCreatorFilterChange: (creators: string[]) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  selectedComment,
  onSelect,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  creators = [],
  selectedCreators = [],
  onCreatorFilterChange,
}) => {
  const [showCreatorDropdown, setShowCreatorDropdown] = useState(false);
  const [tempSelectedCreators, setTempSelectedCreators] = useState<string[]>(selectedCreators);
  const [apiComments, setApiComments] = useState<PredefinedCommentDetail[]>([]);

  const { data: fetchedComments, isLoading, error } = usePredefinedComments({
    UserId: localStorage.getItem('userId') || '',
    CategoryId: localStorage.getItem('categoryId') || '2',
  });

  useEffect(() => {
    if (fetchedComments?.Table) {
      setApiComments(fetchedComments.Table as PredefinedCommentDetail[]);
    }
  }, [fetchedComments]);

  useEffect(() => {
    setTempSelectedCreators(selectedCreators);
  }, [selectedCreators]);

  const getCreatorName = (comment: PredefinedCommentDetail) =>
    comment.FullName || comment.ArabicFullName || 'Unknown';

  const toggleCreator = (creator: string) => {
    setTempSelectedCreators((prev) =>
      prev.includes(creator) ? prev.filter((c) => c !== creator) : [...prev, creator]
    );
  };

  const applyCreatorFilter = () => {
    onCreatorFilterChange(tempSelectedCreators);
    setShowCreatorDropdown(false);
  };

  const resetCreatorFilter = () => {
    setTempSelectedCreators([]);
  };

  const uniqueCreators = Array.from(new Set(apiComments.map(getCreatorName)));

  const displayComments = apiComments.filter((comment) => {
    const creator = getCreatorName(comment);

    const matchesCreator =
      selectedCreators.length === 0 || selectedCreators.includes(creator);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'public' && comment.commenttype?.toLowerCase().includes('public')) ||
      (filter === 'private' && comment.commenttype?.toLowerCase().includes('private'));

    const matchesSearch = comment.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCreator && matchesFilter && matchesSearch;
  });

  return (
    <div className="comment-list-container">
      <div className="comment-list-header">
        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Comments..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
              >
                &times;
              </button>
            )}
          </div>

          <div className="filter-section">
            <div className="filter-buttons">
              <h3 className="comment-list-title">{displayComments.length} Comments</h3>

              {(['all', 'public', 'private'] as CommentFilter[]).map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => onFilterChange(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}

              <div className="creator-filter-wrapper">
                <button
                  className={`creator-filter-btn ${selectedCreators.length > 0 ? 'active' : ''}`}
                  onClick={() => setShowCreatorDropdown(!showCreatorDropdown)}
                >
                  Creators {selectedCreators.length > 0 ? `(${selectedCreators.length})` : ''}
                  <i className={`icon-arrow ${showCreatorDropdown ? 'up' : 'down'}`}></i>
                </button>

                {showCreatorDropdown && (
                  <div className="creator-dropdown-menu">
                    <div className="creator-options-list">
                      {uniqueCreators.map((creator) => (
                        <div
                          key={creator}
                          className="creator-option"
                          onClick={() => toggleCreator(creator)}
                        >
                          <input
                            type="checkbox"
                            checked={tempSelectedCreators.includes(creator)}
                            readOnly
                          />
                          <span>{creator}</span>
                        </div>
                      ))}
                    </div>
                    <div className="creator-actions">
                      <button className="creator-apply-btn" onClick={applyCreatorFilter}>
                        Apply
                      </button>
                      <button className="creator-clear-btn" onClick={resetCreatorFilter}>
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="comments-list">
        {isLoading ? (
          <div>Loading comments...</div>
        ) : error ? (
          <div>Error loading comments</div>
        ) : displayComments.length > 0 ? (
          displayComments.map((comment) => (
            <div
              key={comment.commentid}
              className={`comment-item ${selectedComment?.commentid === comment.commentid ? 'selected' : ''}`}
              onClick={() => onSelect(comment)}
            >
              <div className="comment-main-info">
                <h4 className="comment-title">{comment.name}</h4>
                <div className="comment-meta">
                  <p> created by </p>
                  <span className="comment-creator">{getCreatorName(comment)}</span>
                  <span className="comment-date">–</span>
                </div>
              </div>
              <div
                className={`comment-status ${
                  comment.commenttype?.toLowerCase().includes('public') ? 'public' : 'private'
                }`}
              >
                {comment.commenttype?.toLowerCase().includes('public') ? 'Public' : 'Private'}
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments-message">No comments found</div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
