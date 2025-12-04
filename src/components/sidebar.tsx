'use client';

import { Home, Twitter, Youtube, FileText, Link, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareBrainButton } from './share-brain';
import {motion} from 'framer-motion';

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
   <div className="w-64 text-white bg-black/10 backdrop-blur-md border-r border-white/10 px-4 py-6 flex flex-col h-screen fixed left-0 top-0 z-50 font-gothic">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 bg-linear-to-br from-yellow-500 to-orange-600 rounded-lg shadow-lg shadow-orange-900/20">
            <Brain className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-wide">BrainCloud</h1>
      </div>

      <nav className="space-y-5 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative w-full flex items-center gap-5 px-2 py-2 rounded-xl transition-all duration-300 group font-gothic',
              activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 bg-white/8 rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">
                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-yellow-500" : "group-hover:text-yellow-500/70")} />
            </span>
            <span className="relative z-10 font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="pt-6 border-t border-white/10 text-center">
        <ShareBrainButton />
      </div>
    </div>
  );
}