import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { ContentFormData, ContentListResponse, Content, ContentResponse } from '@/types/content';
import { addContentApi, deleteContent, getContentApi } from '@/lib/api';

interface ContentState {
    content: ContentListResponse['content'] | null;
    isLoading: boolean ;
    error:string | null;
    fetchContent: () => Promise<void>;
    addContent: (data:ContentFormData) => Promise<void>;
    deleteContent: (id:string) => Promise<void>;
}

 const useContentStore = create<ContentState>() (
    persist((set, get) => ({
        content:null,
        isLoading:false,
        error:null,

        fetchContent: async() => {
            set({isLoading:true, error:null});
            try {
                const response = await getContentApi();
                set({content:response.content, isLoading:false});
            } catch (err:any) {
                set({error: err.message || "failed to fetch content", isLoading: false});
            }
        },
        addContent: async (data: ContentFormData) => {
        set({ isLoading: true, error: null });
        try {
          await addContentApi(data);
          await get().fetchContent();
        } catch (err: any) {
          set({ error: err.message || 'Failed to add content', isLoading: false });
        }
      },
      deleteContent: async (id: string) => {
        set((state) => ({
          content: state.content?.filter((item) => item.id !== id) || null,
        }));

        try {
          await deleteContent(id); 
        } catch (err: any) {
          await get().fetchContent();
        }
    },
    }),
{
    name: 'content=storage',
    partialize: (state) => ({
        content:state.content, error: state.error
    }),
})
);

export default useContentStore;