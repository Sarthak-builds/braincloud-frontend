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
            <Button variant="default" className='text-white bg-black/85 hover:text-yellow-500 hover:bg-black/85 font-gothic'>
                <Plus className='w-4 h-4'></Plus>Add Content
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md font-gothic bg-white/30 text-white">
            <DialogHeader>
          {/* <DialogTitle className=' text-white w-fit px-3 py-1 rounded border-none '>Add New Content</DialogTitle> */}
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 '>
         <div className='text-white'>
            
            <Select name="type">
              <SelectTrigger className='bg-black/70 border-none text-white'>
                <SelectValue placeholder="Select type"  className='bg-white placeholder:text-white'/>
              </SelectTrigger>
              <SelectContent className='bg-black/70 text-white '>
                <SelectItem value="document" className=''>Document</SelectItem>
                <SelectItem value="tweet">Tweet</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="link">Article</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input placeholder="Link URL" name="link" required className="bg-black/70 border-none text-white input-theme font0gothic" />
          <Input placeholder="Title" name="title" required className="input-theme bg-black/70 border-none text-white font-gothic" />
          <Input placeholder="Tags (comma-separated)" name="tags" className="input-theme bg-black/70 border-none text-white font-gothic" />
          <Button type="submit" className="w-full bg-black/85 hover:bg-black/85 hover:text-yellow-500" disabled={loading}>
            {loading ? 'Adding...' : 'Add Content'}
          </Button>
        </form>
        </DialogContent>
        </Dialog>
    );
}