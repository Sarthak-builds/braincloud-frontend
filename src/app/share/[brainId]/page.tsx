'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Content } from '@/types/content';
import { ContentCard } from '@/components/content-card';
import { Brain } from 'lucide-react';
export default function SharedBrainPage() {
    const params = useParams();
    const brainId = params.brainId as string;
    const [content, setContent] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublicBrain = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
               
                setContent([
                    {
                        id: '1',
                        type: 'link',
                        title: 'Project Resources',
                        link: 'https://github.com',
                        tags: ['dev', 'public']
                    },
                    {
                        id: '2',
                        type: 'tweet',
                        title: 'Interesting Tweet',
                        link: 'https://twitter.com/spacex/status/123456789',
                        tags: ['space']
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (brainId) {
            fetchPublicBrain();
        }
    }, [brainId]);

    return (
        <div className="min-h-screen bg-black text-white font-gothic selection:bg-yellow-500/30">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <header className="flex items-center gap-4 mb-16 pb-6 border-b border-white/10">
                    <div className="p-3 bg-yellow-500/10 rounded-xl">
                        <Brain className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Shared Brain</h1>
                        <p className="text-white/40 mt-1 font-sans">Viewing public collection • {brainId}</p>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-pulse text-white/30">Loading brain contents...</div>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
                        {content.map(item => (
                            <div key={item.id} className="break-inside-avoid">
                                <ContentCard content={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
