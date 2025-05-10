import React from 'react';
import { PredefinedCommentDetail } from '../../types/commentTypes';
import './CommentViewer.css';
import Button from '../Toolbar/Toolbar'
import { EditIcon } from '../../../../../../assets/icons';


interface CommentViewerProps {
  comment: PredefinedCommentDetail | null;
  onClose?: () => void;
  
}


const CommentViewer: React.FC<CommentViewerProps> = ({ comment, onClose }) => {
  if (!comment) {
    return (
      <div className="comment-viewer empty">
        <p>Select a comment to view</p>
      </div>
    );
  }

  return (
    <div className="comment-viewer">
      <div className="comment-header">
        <div className="header-top">
          <h3>{comment.name}</h3>
          {onClose && (
            <button
              className="close-btn"
              onClick={onClose}
              aria-label="Close comment view"
            >
              ✖
            </button>
          )}
        </div>
        <div className="comment-meta">
          <span>Created by: {comment.FullName}</span>
          <span>Date: {new Date(comment.date).toLocaleDateString()}</span>
          <span
           className={`comment-status ${
                            comment.commenttype?.toLowerCase().includes('public') ? 'public' : 'private'
                          }`}
          >
                {comment.commenttype?.toLowerCase().includes('public') ? 'Public' : 'Private'}
          </span>
        </div>
      </div>

      <div className="comment-content">
        <h4>Details</h4>
      

        <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
      </div>
    </div>
  );
};

export default CommentViewer;
