'use client';

import { Home, Twitter, Youtube, FileText, Link, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareBrainButton } from './share-brain';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'all-notes', label: 'All ', icon: Home },
  { id: 'tweets', label: 'Tweets', icon: Twitter },
  { id: 'videos', label: 'Videos', icon: Youtube },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'links', label: 'Links', icon: Link },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="hidden md:flex w-64 bg-black/50 border-r border-white/10 flex-col h-screen fixed left-0 top-0 z-50 font-gothic backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-4 mb-2 hover:bg-white/5 cursor-pointer transition-colors duration-200">
        <div className="p-1 bg-yellow-600/20 rounded-sm">
          <Brain className="w-5 h-5 text-yellow-500" />
        </div>
        <h1 className="text-sm font-semibold tracking-wide text-white/90">BrainCloud</h1>
      </div>

      <nav className="space-y-0.5 flex-1 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative w-full flex items-center gap-3 px-3 py-1.5 rounded-md transition-all duration-200 group text-sm',
              activeTab === tab.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
          >
            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-yellow-500" : "text-gray-500 group-hover:text-yellow-500/80")} />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <ShareBrainButton />
      </div>
    </div>
  );
}