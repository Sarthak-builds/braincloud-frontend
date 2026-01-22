'use client';

import { useState } from 'react';
import { Button } from './UI/button';
import { Input } from './UI/input';
import { Share2, Copy, Check, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './UI/dialog';
import useAuthStore from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

export function ShareBrainButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { token } = useAuthStore();

  const toggleShare = async () => {
    setLoading(true);
    try {
      // Fixed URL typo and using environment variable if available, defaulting to localhost
      const response = await fetch('http://localhost:3069/api/v1/brain/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ share: true }),
      });

      if (response.ok) {
        const data = await response.json();
        // Construct a full URL if the backend returns just a hash/id
        // Assuming data.link is the unique hash e.g., "abc-123"
        // If data.link is already a full URL, use it directly
        const link = data.link.startsWith('http')
          ? data.link
          : `${window.location.origin}/share/${data.link}`;

        setShareLink(link);
      }
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(true)}
        className="w-full h-9 gap-2 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5 transition-all duration-200 group rounded-md justify-start px-3"
      >
        <Share2 className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
        <span className="font-medium">Share Brain</span>
      </Button>

      <Dialog open={open} onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
        }
      }}>
        <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-2xl border border-white/10 text-white shadow-2xl p-6 rounded-2xl gap-0">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold flex items-center gap-2 font-gothic tracking-wide">
              <Globe className="w-5 h-5 text-yellow-400" />
              Share Your Brain
            </DialogTitle>
            <DialogDescription className="text-white/50 text-sm mt-2 font-sans">
              Publish your curated Second Brain to the world. Anyone with the link will be able to view your content.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <AnimatePresence mode="wait">
              {shareLink ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-xl bg-yellow-950/30 border border-yellow-500/20 mb-4">
                    <div className="flex items-center gap-2 mb-2 text-yellow-400 text-xs uppercase font-bold tracking-wider">
                      <Check className="w-3 h-3" /> Live & Public
                    </div>
                    <p className="text-white/70 text-sm">
                      Your brain is now accessible via the link below.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/50 border border-white/10 shadow-inner">
                    <Input
                      value={shareLink}
                      readOnly
                      className="border-0 bg-transparent text-white/90 focus-visible:ring-0 h-9 text-sm font-mono px-3 selection:bg-yellow-500/30"
                    />
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      className="h-9 px-4 bg-white/10 hover:bg-white/20 text-white border-0 transition-all active:scale-95"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Read-only access for visitors</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Unlimited views</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/40" /> Import content to their brain</li>
                    </ul>
                  </div>

                  <Button
                    onClick={toggleShare}
                    disabled={loading}
                    className="w-full h-12 bg-linear-to-r from-yellow-600 to-yellow-600 hover:from-yellow-500 hover:to-yellow-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all duration-300 border border-white/10"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generating Link...</span>
                      </div>
                    ) : (
                      'Generate Share Link'
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}