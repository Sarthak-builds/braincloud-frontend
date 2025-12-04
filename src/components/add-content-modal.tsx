'use client';

import { useState } from 'react';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/UI/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Plus } from 'lucide-react';
import useContentStore from '@/store/contentStore';
import { ContentFormData } from '@/types/content';

export function AddContentModal () {
const [ open, setOpen] = useState(false);
const { addContent} = useContentStore();
const [loading, setLoading] = useState(false);

const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: ContentFormData = {
      type: formData.get('type') as 'document' | 'tweet' | 'video' | 'link',
      link: formData.get('link') as string,
      title: formData.get('title') as string,
      tags: (formData.get('tags') as string)?.split(',').map((t) => t.trim()).filter(Boolean) || [],
    };
    setLoading(true);
    addContent(data)
      .then(() => setOpen(false))
      .catch((err) => console.error('Add content error:', err))
      .finally(() => setLoading(false));
};


    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default" className='text-white  border-2 border-yellow-600 hover:text-yellow-500  font-gothic'>
                <Plus className='w-4 h-4'></Plus>Add Content
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl p-6 rounded-2xl font-gothic">
            <DialogHeader>
         <DialogTitle className="text-xl font-bold">Add New Memory</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
         <div className='text-white space-y-4'>
            
            <Select name="type">
              <SelectTrigger className='w-full bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-offset-0 focus:ring-yellow-500/50'>
                <SelectValue placeholder="Select type"  className='bg-white placeholder:text-white'/>
              </SelectTrigger>
              <SelectContent className='bg-zinc-900 border-white/10 text-white rounded-xl '>
                <SelectItem value="document" className=''>Document</SelectItem>
                <SelectItem value="tweet">Tweet</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="link">Article</SelectItem>
              </SelectContent>
            </Select>
          </div>
         <Input 
                placeholder="Title" 
                name="title" 
                required 
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/30 focus-visible:ring-yellow-500/50" 
            />
            
            <Input 
                placeholder="Link URL" name="link" required className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/30 focus-visible:ring-yellow-500/50 focus:outline-none" />
            <Input  placeholder="Tags (comma separated)" name="tags" className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/30 focus-visible:ring-yellow-500/50 outline-none" />
          <Button type="submit" className="w-full h-10 rounded-xl bg-yellow-600 text-white font-gothic hover:bg-gray-200 text-md mt-4" disabled={loading}>
            {loading ? 'Adding...' : 'Create Content'}
          </Button>
        </form>
        </DialogContent>
        </Dialog>
    );
}