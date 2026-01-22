'use client';

import { useEffect, useState } from 'react';
import { ContentCard } from './content-card';
import useContentStore from '../store/contentStore';
import { Sidebar } from './sidebar';
import { AddContentModal } from './add-content-modal';
import { Content } from '../types/content';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';

export function ContentTabs() {
  const { fetchContent, content, isLoading } = useContentStore();
  const [activeTab, setActiveTab] = useState('all-notes');

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getCardSpan = (item: Content): number => {
    // 1 row = 10px + gap.
    // Tighter fitting for Bento look.

    if (item.type === 'tweet') return 20; // ~200px
    if (item.type === 'video') return 24; // ~240px
    if (item.type === 'document') return 16; // ~160px
    if (item.type === 'link') return 16;
    if (item.tags.length > 5 || item.title.length > 50) return 20;
    return 16;
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
      <div className="flex items-center justify-center min-h-screen bg-black font-gothic">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl text-white/60 font-light"
        >
          Loading your brain...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:pl-64 transition-all duration-300 font-gothic bg-black">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto text-white">
          <motion.h1
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.5
            }}
            className="text-3xl font-bold text-white tracking-tight font-gothic"
          >
            {activeTab === 'all-notes' ? 'All Memories' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </motion.h1>
          <AddContentModal />
        </div>

        {(!content || filteredContent.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-2xl text-white/40 mb-6 font-light">
              Your brain is empty here.
            </p>
            <AddContentModal />
          </div>
        ) : (
          <Masonry
            breakpointCols={{
              default: 4,
              1100: 3,
              700: 2,
              500: 1
            }}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            <AnimatePresence mode='popLayout'>
              {filteredContent.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <ContentCard content={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Masonry>
        )}
      </div>
    </div>
  );
}