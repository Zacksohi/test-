
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Comment, CommentsState, CommentVisibility, SortDirection, CreatorFilter, Creator } from '../types/comments';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Mock creators data (will be replaced with API call)
const creators: Creator[] = [
  { id: '1', name: 'Ghofran' },
  { id: '2', name: 'Hiba' },
  { id: '3', name: 'Ruba' },
  { id: '4', name: 'Marah' }
];

// Mock initial comments data (will be replaced with API call)
const initialComments: Comment[] = [
  {
    id: '1',
    title: 'Comment Name',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.\n\nMaecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellen-tesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.',
    isPublic: false,
    createdBy: 'Ghofran',
    createdAt: '2024-01-06T12:30:00'
  },
  {
    id: '2',
    title: 'Comment Name',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.\n\nMaecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellen-tesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.',
    isPublic: true,
    createdBy: 'Ghofran',
    createdAt: '2024-01-06T12:30:00'
  },
  {
    id: '3',
    title: 'Comment Name',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.\n\nMaecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellen-tesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.',
    isPublic: true,
    createdBy: 'Ghofran',
    createdAt: '2024-01-06T12:30:00'
  },
  {
    id: '4',
    title: 'Comment Name',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.\n\nMaecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellen-tesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.',
    isPublic: true,
    createdBy: 'Ghofran',
    createdAt: '2024-01-06T12:30:00'
  },
  {
    id: '5',
    title: 'Comment Name',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.\n\nMaecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellen-tesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.',
    isPublic: false,
    createdBy: 'Ghofran',
    createdAt: '2024-01-06T12:30:00'
  },
  {
    id: '6',
    title: 'Comment Name',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.\n\nMaecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellen-tesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.',
    isPublic: false,
    createdBy: 'Ghofran',
    createdAt: '2024-01-06T12:30:00'
  },
  {
    id: '7',
    title: 'Comment Name',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.\n\nMaecenas quis ante ante. Nunc adipiscing rhoncus rutrum. Pellentesque adipiscing urna mi, ut tempus lacus ultrices ac. Pellentesque sodales, libero et mollis interdum, dui odio vestibulum dolor, eu pellen-tesque nisl nibh quis nunc. Sed porttitor leo adipiscing venenatis vehicula. Aenean quis viverra enim. Praesent porttitor ut ipsum id ornare.',
    isPublic: false,
    createdBy: 'Ghofran',
    createdAt: '2024-01-06T12:30:00'
  }
];

const initialState: CommentsState = {
  comments: initialComments,
  selectedComment: null,
  filter: {
    visibility: 'all',
    search: '',
    creators: [],
    sortDirection: 'desc'
  },
  ui: {
    isCreating: false,
    isEditing: false,
    isDeleting: false,
    isFullView: false,
    isCancelConfirmOpen: false,
    hasError: false,
    errorMessage: ''
  }
};

type CommentsAction =
  | { type: 'SELECT_COMMENT'; payload: Comment | null }
  | { type: 'SET_VISIBILITY_FILTER'; payload: CommentVisibility }
  | { type: 'SET_SEARCH_FILTER'; payload: string }
  | { type: 'SET_CREATOR_FILTER'; payload: CreatorFilter }
  | { type: 'SET_SORT_DIRECTION'; payload: SortDirection }
  | { type: 'TOGGLE_CREATE_MODE'; payload?: boolean }
  | { type: 'TOGGLE_EDIT_MODE'; payload?: boolean }
  | { type: 'TOGGLE_DELETE_MODE'; payload?: boolean }
  | { type: 'TOGGLE_FULL_VIEW'; payload?: boolean }
  | { type: 'TOGGLE_CANCEL_CONFIRM'; payload?: boolean }
  | { type: 'CREATE_COMMENT'; payload: Omit<Comment, 'id' | 'createdAt'> }
  | { type: 'UPDATE_COMMENT'; payload: Comment }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'SET_ERROR'; payload: { hasError: boolean; errorMessage: string } }
  | { type: 'CLEAR_ERROR' };

const commentsReducer = (state: CommentsState, action: CommentsAction): CommentsState => {
  switch (action.type) {
    case 'SELECT_COMMENT':
      return {
        ...state,
        selectedComment: action.payload
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          visibility: action.payload
        }
      };
    case 'SET_SEARCH_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          search: action.payload
        }
      };
    case 'SET_CREATOR_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          creators: action.payload
        }
      };
    case 'SET_SORT_DIRECTION':
      return {
        ...state,
        filter: {
          ...state.filter,
          sortDirection: action.payload
        }
      };
    case 'TOGGLE_CREATE_MODE':
      return {
        ...state,
        ui: {
          ...state.ui,
          isCreating: action.payload !== undefined ? action.payload : !state.ui.isCreating,
          isEditing: false,
          isDeleting: false,
          isFullView: false
        }
      };
    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        ui: {
          ...state.ui,
          isEditing: action.payload !== undefined ? action.payload : !state.ui.isEditing,
          isCreating: false,
          isDeleting: false,
          isFullView: false
        }
      };
    case 'TOGGLE_DELETE_MODE':
      return {
        ...state,
        ui: {
          ...state.ui,
          isDeleting: action.payload !== undefined ? action.payload : !state.ui.isDeleting
        }
      };
    case 'TOGGLE_FULL_VIEW':
      return {
        ...state,
        ui: {
          ...state.ui,
          isFullView: action.payload !== undefined ? action.payload : !state.ui.isFullView
        }
      };
    case 'TOGGLE_CANCEL_CONFIRM':
      return {
        ...state,
        ui: {
          ...state.ui,
          isCancelConfirmOpen: action.payload !== undefined ? action.payload : !state.ui.isCancelConfirmOpen
        }
      };
    case 'CREATE_COMMENT':
      const newComment: Comment = {
        id: (state.comments.length + 1).toString(),
        ...action.payload,
        createdAt: new Date().toISOString()
      };
      return {
        ...state,
        comments: [newComment, ...state.comments],
        selectedComment: newComment,
        ui: {
          ...state.ui,
          isCreating: false
        }
      };
    case 'UPDATE_COMMENT':
      const updatedComments = state.comments.map(comment => 
        comment.id === action.payload.id ? action.payload : comment
      );
      return {
        ...state,
        comments: updatedComments,
        selectedComment: action.payload,
        ui: {
          ...state.ui,
          isEditing: false
        }
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload),
        selectedComment: null,
        ui: {
          ...state.ui,
          isDeleting: false
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          hasError: action.payload.hasError,
          errorMessage: action.payload.errorMessage
        }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          hasError: false,
          errorMessage: ''
        }
      };
    default:
      return state;
  }
};

export type CommentsContextType = {
  state: CommentsState;
  creators: Creator[];
  selectComment: (comment: Comment | null) => void;
  setVisibilityFilter: (visibility: CommentVisibility) => void;
  setSearchFilter: (search: string) => void;
  setCreatorFilter: (creators: CreatorFilter) => void;
  setSortDirection: (direction: SortDirection) => void;
  toggleCreateMode: (isCreating?: boolean) => void;
  toggleEditMode: (isEditing?: boolean) => void;
  toggleDeleteMode: (isDeleting?: boolean) => void;
  toggleFullView: (isFullView?: boolean) => void;
  toggleCancelConfirm: (isOpen?: boolean) => void;
  createComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  updateComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
  setError: (hasError: boolean, errorMessage: string) => void;
  clearError: () => void;
  filteredComments: Comment[];
  
};

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export const CommentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  const selectComment = (comment: Comment | null) => {
    dispatch({ type: 'SELECT_COMMENT', payload: comment });
  };

  const setVisibilityFilter = (visibility: CommentVisibility) => {
    dispatch({ type: 'SET_VISIBILITY_FILTER', payload: visibility });
  };

  const setSearchFilter = (search: string) => {
    dispatch({ type: 'SET_SEARCH_FILTER', payload: search });
  };

  const setCreatorFilter = (creators: CreatorFilter) => {
    dispatch({ type: 'SET_CREATOR_FILTER', payload: creators });
  };

  const setSortDirection = (direction: SortDirection) => {
    dispatch({ type: 'SET_SORT_DIRECTION', payload: direction });
  };

  const toggleCreateMode = (isCreating?: boolean) => {
    dispatch({ type: 'TOGGLE_CREATE_MODE', payload: isCreating });
  };

  const toggleEditMode = (isEditing?: boolean) => {
    dispatch({ type: 'TOGGLE_EDIT_MODE', payload: isEditing });
  };

  const toggleDeleteMode = (isDeleting?: boolean) => {
    dispatch({ type: 'TOGGLE_DELETE_MODE', payload: isDeleting });
  };

  const toggleFullView = (isFullView?: boolean) => {
    dispatch({ type: 'TOGGLE_FULL_VIEW', payload: isFullView });
  };

  const toggleCancelConfirm = (isOpen?: boolean) => {
    dispatch({ type: 'TOGGLE_CANCEL_CONFIRM', payload: isOpen });
  };

  const createComment = (comment: Omit<Comment, 'id' | 'createdAt'>) => {
    // In a real application, this would be an API call
    dispatch({ type: 'CREATE_COMMENT', payload: comment });
    toast.success('A Predefined Comment added successfully');
  };

  const updateComment = (comment: Comment) => {
    // In a real application, this would be an API call
    dispatch({ type: 'UPDATE_COMMENT', payload: comment });
    toast.success('Comment updated successfully');
  };

  const deleteComment = (id: string) => {
    // In a real application, this would be an API call
    dispatch({ type: 'DELETE_COMMENT', payload: id });
    toast.success('A Predefined Comment Deleted Successfully');
  };

  const setError = (hasError: boolean, errorMessage: string) => {
    dispatch({ type: 'SET_ERROR', payload: { hasError, errorMessage } });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Filter comments based on current filters
  const filteredComments = React.useMemo(() => {
    let filtered = [...state.comments];

    // Apply visibility filter
    if (state.filter.visibility === 'public') {
      filtered = filtered.filter(comment => comment.isPublic);
    } else if (state.filter.visibility === 'private') {
      filtered = filtered.filter(comment => !comment.isPublic);
    }

    // Apply creator filter
    if (state.filter.creators.length > 0) {
      filtered = filtered.filter(comment => state.filter.creators.includes(comment.createdBy));
    }

    // Apply search filter
    if (state.filter.search) {
      const searchLower = state.filter.search.toLowerCase();
      filtered = filtered.filter(comment => 
        comment.title.toLowerCase().includes(searchLower) || 
        new Date(comment.createdAt).toLocaleDateString().includes(state.filter.search)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return state.filter.sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [state.comments, state.filter]);

  const value = {
    state,
    creators,
    selectComment,
    setVisibilityFilter,
    setSearchFilter,
    setCreatorFilter,
    setSortDirection,
    toggleCreateMode,
    toggleEditMode,
    toggleDeleteMode,
    toggleFullView,
    toggleCancelConfirm,
    createComment,
    updateComment,
    deleteComment,
    setError,
    clearError,
    filteredComments
  };

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};
