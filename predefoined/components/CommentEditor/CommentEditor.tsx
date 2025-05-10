import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CommentInput } from '../../types/commentTypes';
import './CommentEditor.css';
import TextEditor from '@/components/shared/TextEditor';

interface CommentEditorProps {
  onSubmit: (data: CommentInput) => void;
  onCancel: () => void;
  onClear: () => void;
  comment: CommentInput;
  setCommentData: React.Dispatch<React.SetStateAction<CommentInput>>;
  isLoading: boolean;
}

const CommentEditor = ({
  onSubmit,
  onCancel,
  onClear,
  comment,
  setCommentData,
  isLoading
}: CommentEditorProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommentInput>({
    defaultValues: comment,  // تعيين البيانات الافتراضية هنا
  });

  const Comment = watch('Comment');

  const handleContentChange = (value: string) => {
    setValue('Comment', value, { shouldValidate: true });
    setCommentData((prevData) => ({ ...prevData, Comment: value }));  // تحديث البيانات
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setValue('Name', newName);
    setCommentData((prevData) => ({ ...prevData, Name: newName }));  // تحديث البيانات
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="comment-editor-form">
      <div className="form-group">
        <label>الاسم *</label>
        <input
          {...register('Name', { required: 'الاسم مطلوب' })}
          className={errors.Name ? 'error' : ''}
          value={comment.Name}
          onChange={handleNameChange}  // تحديث البيانات هنا
        />
        {errors.Name && <span className="error-message">{errors.Name.message}</span>}
      </div>

      <div className="form-group">
        <label>النوع</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              onChange={() => {
                setValue('CommentType', 'private');
                setCommentData((prevData) => ({
                  ...prevData,
                  CommentType: 'private',
                }));
              }}
            />
            خاص
          </label>
          <label>
            <input
              type="radio"
              disabled
              onChange={() => {
                setValue('CommentType', 'public');
                setCommentData((prevData) => ({
                  ...prevData,
                  CommentType: 'public',
                }));
              }}
            />
            عام
          </label>
        </div>
      </div>


      <div className="form-group">
        <label>التعليق *</label>
        <TextEditor
          content={Comment}
          onChange={handleContentChange}
        />
        {errors.Comment && <span className="error-message">التعليق مطلوب</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          إلغاء
        </button>
        <button type="button" className="clear-btn" onClick={onClear}>
          مسح
        </button>
        <button type="submit" className="submit-btn">
          {isLoading ? 'جاري التحميل ...' : 'تحديث'}
        </button>
      </div>
    </form>
  );
};

export default CommentEditor;
