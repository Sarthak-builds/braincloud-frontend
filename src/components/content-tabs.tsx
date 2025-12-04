'use client';

import { useEffect, useState } from 'react';
import { ContentCard } from '@/components/content-card';
import useContentStore from '@/store/contentStore';
import { Sidebar } from '@/components/sidebar';
import { AddContentModal } from '@/components/add-content-modal';
import { Content } from '@/types/content';

export function ContentTabs() {
  const { fetchContent, content, isLoading } = useContentStore();
  const [activeTab, setActiveTab] = useState('all-notes');

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);
  const getCardSpan = (item: Content): number => {
  
  if (item.type === 'tweet') return 18;
  if (item.type === 'video') return 10;
  if (item.type === 'document') return 1;
  if(item.type === 'link') return 10;
  if (item.tags.length > 5 || item.title.length > 50) return 18;
  return 20; 
};

  const filteredContent = content?.filter((item) => {
    if (activeTab === 'all-notes') return true;
    if (activeTab === 'tweets') return item.type === 'tweet';
    if (activeTab === 'videos') return item.type === 'video';
    if (activeTab === 'documents') return item.type === 'document';
    if (activeTab === 'links') return item.type === 'link';
    return true;
  }) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-white/60">Loading your brain...</div>
      </div>
    );
  }

  if (!content || content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
        <p className="text-2xl text-white/60">Your brain is empty</p>
        <AddContentModal />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-black via-zinc-900 to-black pl-60"><div className='fixed left-0 top-'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
      

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            {activeTab === 'all-notes' ? 'All Notes' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <AddContentModal />
        </div>

        {filteredContent.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-2xl text-white/40 mb-6">
              No {activeTab === 'all-notes' ? 'content' : activeTab} yet
            </p>
            <AddContentModal />
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-[10px] scale-95  "  >
            {filteredContent.map((item) => (
              <div key={item.id} className="flex" style={{ 
        gridRowEnd: `span ${getCardSpan(item)}` 
      }}>
                <ContentCard content={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}