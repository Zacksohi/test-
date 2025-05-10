export interface PredefinedCommentDetail {
  FullName: string;
  ArabicFullName: string;
  commentid: number;
  CategoryId: number;
  commenttype: string;
  userid: number;
  name: string;
  comment: string;
  CreatedByAdmin: boolean;

}

export interface CommentInput {
  TypeId: number;
  CommentType: string;
  CategoryId?:string;
  UserId: number;
  Name: string;
  Comment: string;
  CreatedByAdmin: boolean;
}



export type CommentFilter = 'all' | 'public' | 'private';
