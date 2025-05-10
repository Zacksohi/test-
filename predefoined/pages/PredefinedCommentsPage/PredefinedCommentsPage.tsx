import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComments } from '../../services/commentsService';
import Toolbar from '../../components/Toolbar/Toolbar';
import CommentList from '../../components/CommentList/CommentList';
import CommentViewer from '../../components/CommentViewer/CommentViewer';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import { PredefinedCommentDetail } from '../../types/commentTypes';
import Breadcrumbs from '../../../../../../components/shared/Breadcrumbs';
import { useDeletePredefinedComment } from '../../../../hooks/deletePredefinedComment';

import './PredefinedCommentsPage.css';

const PredefinedCommentsPage = () => {
  const breadcrumbs = [
    { label: 'My preferences', url: '/userPreferences' },
    { label: 'Comments', url: '/predefinedComments' },
  ];

  const [comments, setComments] = useState<PredefinedCommentDetail[]>([]);
  const [selectedComment, setSelectedComment] = useState<PredefinedCommentDetail | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  const navigate = useNavigate();

  // ✅ استخدام الهوك بشكل صحيح
  const { mutateAsync, isLoading, error, isSuccess } = useDeletePredefinedComment();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    };

    loadComments();
  }, []);

  const getCreatorName = (comment: PredefinedCommentDetail) =>
    comment.FullName || comment.ArabicFullName || 'Unknown';

  const uniqueCreators = Array.from(new Set(comments.map(getCreatorName)));

  const filteredComments = comments.filter((comment) => {
    const creator = getCreatorName(comment);

    const matchesCreator =
      selectedCreators.length === 0 || selectedCreators.includes(creator);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'public' && comment.commenttype?.toLowerCase().includes('public')) ||
      (filter === 'private' && comment.commenttype?.toLowerCase().includes('private'));

    const matchesSearch =
      searchQuery === '' ||
      comment.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCreator && matchesFilter && matchesSearch;
  });

  // ✅ تم تعديل هذا الجزء فقط
  const handleDeleteConfirmed = async () => {
    if (selectedComment) {
      try {
        await mutateAsync({ commentId: selectedComment.commentid.toString() });
        setComments(await getComments());
        setSelectedComment(null);
      } catch (error) {
        console.error('فشل في حذف التعليق:', error);
      }
    }

    setShowDeleteDialog(false);
  };

  return (
    <div className="comments-page">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h3 style={{ paddingLeft: '8px' }}>Comments</h3>

      <div className="toolbar-container">
        <Toolbar
          onCreate={() => navigate('/create-comment')}
          onEdit={() =>
            navigate(`/edit-comment/${selectedComment?.commentid}`, {
              state: { comment: selectedComment } // إرسال التعليق عبر s
            })
          }
                    onDelete={() => setShowDeleteDialog(true)}
          editDisabled={!selectedComment}
          deleteDisabled={!selectedComment}
        />
      </div>

      <div className="content-area">
        <div className="comment-list-container">
          <CommentList
            comments={filteredComments}
            selectedComment={selectedComment}
            onSelect={setSelectedComment}
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            creators={uniqueCreators}
            selectedCreators={selectedCreators}
            onCreatorFilterChange={setSelectedCreators}
          />
        </div>

        <div className="comment-viewer-container">
          {selectedComment ? (
            <CommentViewer
              comment={selectedComment}
              onClose={() => setSelectedComment(null)}
            />
          ) : (
            <div className="empty-viewer">Select a comment to view ...</div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={showDeleteDialog}
        title="Delete Comment"
        message="Are you sure you want to delete this comment?"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
};

export default PredefinedCommentsPage;
