// components/share-brain-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/UI/button';
import { Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/UI/dialog';
import useAuthStore from '@/store/authStore';
import * as api from '@/lib/api';


export function ShareBrainButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  const toggleShare = async () => {
    setLoading(true);
    try {
      const response = await fetch(`'http://localhost:3069/api/v1/brain/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ share: true }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Share link:', data.link);
      }
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} className="gap-2 bg-transparent border-yellow-600 hover:bg-yellow-600 hover:text-white">
        <Share2 className="w-4 h-4" />
        Share Brain
      </Button>
      <Dialog open={open}  onOpenChange={setOpen}>
        <DialogContent className=' gap-0 bg-black/85 text-white'>
          <DialogHeader >
            <DialogTitle className='font-bold font-gothic'>Share Your Brain</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-200 mb-4 mt-2 font-gothic">
            Share your entire collection of notes, tweets, documents and videos with others. They'll be able to import your content into their own BrainCloud.
          </p>
          <Button onClick={toggleShare} disabled={loading} className="w-full text-white mt-6 bg-yellow-500  hover:text-white border-yellow-500 border hover:bg-yellow-600 text-md">
            {loading ? 'Sharing...' : `🔗Generate Share Link`}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}