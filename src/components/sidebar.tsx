'use client';

import { Home, Twitter, Youtube, FileText, Link, Hash, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareBrainButton } from './share-brain';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'all-notes', label: 'All Notes', icon: Home },
  { id: 'tweets', label: 'Tweets', icon: Twitter },
  { id: 'videos', label: 'Videos', icon: Youtube },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'links', label: 'Links', icon: Link },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-60  text-white bg-black/85 px-2  py-6 flex flex-col  h-screen mx-1  relative  ">
      <div className="flex items-center gap-3 mb-10">
        <Brain className="w-8 h-8 text-yellow-400" />
        <h1 className="text-2xl font-bold">BrainCloud</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'w-full flex items-center gap-4 px-2 py-2 rounded-md transition-all',
              activeTab === tab.id
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'hover:bg-gray-600 text-gray-300'
            )}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <ShareBrainButton></ShareBrainButton>
    </div>
  );
}