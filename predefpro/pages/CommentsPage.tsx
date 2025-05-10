
import React from 'react';
import { CommentsProvider, useComments } from '../contexts/CommentsContext';
import CommentsHeader from '../components/comments/CommentsHeader';
import CommentsToolbar from '../components/comments/CommentsToolbar';
import CommentsList from '../components/comments/CommentsList';
import CommentDetail from '../components/comments/CommentDetail';
import CommentEditor from '../components/comments/CommentEditor';
import CancelConfirmDialog from '../components/comments/CancelConfirmDialog';
import DeleteConfirmDialog from '../components/comments/DeleteConfirmDialog';
// import AppHeader from '../components/common/AppHeader';
// import Sidebar from '../components/common/Sidebar';

const CommentsPage = () => {
  return (
    <CommentsProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-1">
          <div className="flex-1">
            <CommentsHeader />
            <div className="p-6">
              <CommentsToolbar />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommentsListSection />
                <CommentDetailSection />
              </div>
            </div>
          </div>
        </div>
        <CancelConfirmDialog />
        <DeleteConfirmDialog />
      </div>
    </CommentsProvider>
  );
};

// Separate component for the comments list section
const CommentsListSection = () => {
  return (
    <div>
      <CommentsList />
    </div>
  );
};

// Separate component for the comment detail section
const CommentDetailSection = () => {
  const { state } = useComments();
  
  if (state.ui.isCreating || state.ui.isEditing) {
    return <CommentEditor isEditing={state.ui.isEditing} />;
  }
  
  return <CommentDetail />;
};

export default CommentsPage;
