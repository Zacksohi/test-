import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentEditor from '../../components/CommentEditor/CommentEditor';
import { useAddPredefinedComment } from '../../../../../workflow/hooks/addPredefinedComment';
import { CommentInput } from '../../types/commentTypes';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import './CreateCommentPage.css';

const CreateCommentPage = () => {
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [hasSubordinates] = useState(true);

  const [commentData, setCommentData] = useState<CommentInput>({
    TypeId: 2,
    CommentType: '',  
    UserId: 1018,
    Name: '',
    Comment: '',
    CreatedByAdmin: false,
  });

  const { mutateAsync, isLoading, isError, error } = useAddPredefinedComment();

  const handleSubmit = async (data: CommentInput) => {
    try {
      if (isLoading) return;
      const response = await mutateAsync({
        TypeId: data.TypeId,
        UserId: data.UserId,
        Name: data.Name,
        Comment: data.Comment,
        CreatedByAdmin: data.CreatedByAdmin,
        CommentType: data.CommentType,
      });

      navigate('/predefinedComments', {
        state: {
          message: 'Create comment done',
          commentId: response?.CommentId,
        },
      });
    } catch (error) {
      console.error('Error creating comment', error);
      alert('An error occurred.');
    }
  };

  const handleClear = () => {
    setCommentData({
      TypeId: 1,
      CommentType: '', 
      UserId: 1015,
      Name: '',
      Comment: '',
      CreatedByAdmin: false,
    });
  };

  return (
    <div className="create-comment-page">
      <h2>Create new comment</h2>
      <div className="tab-header">Details</div>

      <div className="comment-form-container toolbar-btn edit-btn" title="Edit">
        <CommentEditor 
          onSubmit={handleSubmit}
          onCancel={() => setShowCancelDialog(true)}
          onClear={handleClear}
          comment={commentData}
          setCommentData={setCommentData}
          isLoading={isLoading}        />
      </div>

      <ConfirmationDialog
        open={showCancelDialog}
        title="Confirmation"
        message="Are you sure you want to cancel?"
        onConfirm={() => navigate('/predefined-comments')}
        onCancel={() => setShowCancelDialog(false)}
      />
    </div>
  );
};

export default CreateCommentPage;
