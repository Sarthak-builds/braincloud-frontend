// components/content-tabs.tsx
'use client';

import { useEffect, useState } from 'react';
import { ContentCard } from '@/components/content-card';
import useContentStore from '@/store/contentStore';
import { Content } from '@/types/content';
import { Sidebar } from '@/components/sidebar';
import { AddContentModal } from '@/components/add-content-modal';
import { ShareBrainButton } from '@/components/share-brain';

export function ContentTabs() {
  const { fetchContent, content, isLoading } = useContentStore();
  const [activeTab, setActiveTab] = useState('all-notes');

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading your brain...</div>;
  }

  if (!content || content.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No content yet. Add some!
    <AddContentModal></AddContentModal></div>;
  }

  const filteredContent = activeTab === 'all-notes'
    ? content
    : content.filter((item: Content) => item.type === activeTab);

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-3">
            <AddContentModal />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl: gap-6 scale-98">
          {filteredContent.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      </div>
    </div>
  );
}