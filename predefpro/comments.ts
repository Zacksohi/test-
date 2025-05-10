
export interface Comment {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

export type CommentVisibility = 'all' | 'public' | 'private';
export type SortDirection = 'asc' | 'desc';
export type CreatorFilter = string[];

export interface CommentsState {
  comments: Comment[];
  selectedComment: Comment | null;
  filter: {
    visibility: CommentVisibility;
    search: string;
    creators: CreatorFilter;
    sortDirection: SortDirection;
  };
  ui: {
    isCreating: boolean;
    isEditing: boolean;
    isDeleting: boolean;
    isFullView: boolean;
    isCancelConfirmOpen: boolean;
    hasError: boolean;
    errorMessage: string;
  };
}

export interface Creator {
  id: string;
  name: string;
}
