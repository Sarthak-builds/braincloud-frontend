export interface ContentFormData {
    type: 'document' | 'tweet' | 'video' | 'link' | 'bookmark'| 'note' | 'article';
    link:string;
    title:string;
    tags:string[];
}

export interface Content {
    id:string;
    type: 'document' | 'tweet' | 'video' | 'link' | 'bookmark'| 'note' | 'article';
   link: string;
    title: string;
   tags: string[];
}
export interface ContentResponse {
  success: boolean;
  content: Content;
}

export interface ContentListResponse {
  success: boolean;
  content: Content[];
}