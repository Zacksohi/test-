import { Comment } from '../types/commentTypes';

const STORAGE_KEY = 'predefined_comments';

// نوع للبيانات الأساسية للتعليق (بدون حقول النظام)
type CommentInput = Omit<Comment, 'id' | 'createdAt'>;

const getCommentsFromStorage = (): Comment[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading comments from storage:', error);
    return [];
  }
};
import { CommentInput as ImportedCommentInput } from '../types/commentTypes';

const API_URL = import.meta.env.VITE_EXTERNAL_API_URL || 'http://localhost/DocuTrakApi';
export const createComment = async (commentData: ImportedCommentInput): Promise<{CommentId: number}> => {
  const response = await fetch(`${API_URL}/api/PredefinedComments/AddPredefinedComments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(commentData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create comment');
  }

  return await response.json();
};


// دالة مساعدة لضمان سلامة بيانات التعليق
const sanitizeComment = (comment: any): Comment => ({
  id: String(comment?.idd || Date.now()),
  title: String(comment?.title || 'Untitled Comment'),
  creator: String(comment?.creator || 'Unknown'),
  isPublic: Boolean(comment?.isPublic),
  content: String(comment?.content || ''),
  createdAt: comment?.createdAt || new Date().toISOString()
});

export const getComments = async (): Promise<Comment[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const comments = getCommentsFromStorage();
      // تطبيق sanitize على كل تعليق لضمان عدم وجود undefined
      resolve(comments.map(sanitizeComment));
    }, 300);
  });
};



export const updateComment = async (id: string, updates: Partial<CommentInput>): Promise<Comment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = getCommentsFromStorage();
      const index = comments.findIndex(c => c.id === id );

      if (index >= 0) {
        const updatedComment = sanitizeComment({
          ...comments[index],
          ...updates,
          id // الحفاظ على نفس الـ ID
        });
        comments[index] = updatedComment;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
        resolve(updatedComment);
      } else {
        reject(new Error('Comment not found'));
      }
    }, 300);
  });
};


export const getCommentById = async (id: string): Promise<Comment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = getCommentsFromStorage();
      const comment = comments.find(c => c.id === id);

      if (comment) {
        resolve(sanitizeComment(comment));
      } else {
        reject(new Error('Comment not found'));
      }
    }, 300);
  });
};