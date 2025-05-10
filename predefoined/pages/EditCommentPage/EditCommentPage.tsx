import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CommentEditor from '../../components/CommentEditor/CommentEditor';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import { useEditPredefinedCommment } from '../../../../hooks/editPredefinedComment';
import './EditCommentPage.css';

const EditCommentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // الحصول على التعليق من حالة الموقع
  const initialComment = location.state?.comment;

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [hasSubordinates] = useState(true);
  const [comment, setComment] = useState<any>(initialComment); // تعيين قيمة افتراضية للتعليق المحمل

  const { mutateAsync: editComment, isLoading: isSubmitting } = useEditPredefinedCommment();

  // تحميل التعليق عند تغيير الـ id
  useEffect(() => {
    if (id) {
      // هنا يجب أن تضع الكود لتحميل التعليق من API بناءً على الـ id
      // أو إذا كان لديك بيانات في `location.state` يمكنك استخدامها مباشرة كما هو في الكود أعلاه.
    }
  }, [id]);

  const handleSubmit = async (updatedComment: any) => {
    if (!id) return;

    try {
      await editComment({
        CommentId: id,
        CategoryId: updatedComment.CategoryId,
        CommentType: updatedComment.CommentType,
        UserId: updatedComment.UserId,
        Name: updatedComment.Name,
        Comment: updatedComment.Comment,
        CreatedByAdmin: false
      });

      navigate('/predefinedComments', {
        state: { message: 'تم تحديث التعليق بنجاح' },
      });
    } catch (error) {
      console.error('فشل في تحديث التعليق:', error);
    }
  };

  if (!comment) return <div>التعليق غير موجود.</div>;

  return (
    <div className="edit-comment-page">
      <h2>تعديل التعليق</h2>

      <CommentEditor
        comment={comment}  // تم تمرير التعليق المحمل هنا
        onSubmit={handleSubmit}
        onCancel={() => setShowCancelDialog(true)}
        hasSubordinates={hasSubordinates}
        setCommentData={setComment}  // تمرير setComment لتحديث البيانات
        isLoading={isSubmitting}  // تمرير isLoading لمراقبة حالة التحميل
      />

      <ConfirmationDialog
        open={showCancelDialog}
        title="إلغاء التعديل"
        message="هل أنت متأكد أنك تريد إلغاء التعديل؟ سيتم فقدان التعديلات غير المحفوظة."
        onConfirm={() => navigate('/predefinedComments')}
        onCancel={() => setShowCancelDialog(false)}
      />
    </div>
  );
};

export default EditCommentPage;
