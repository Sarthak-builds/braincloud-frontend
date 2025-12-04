import { Clock, ExternalLink, Trash2, Twitter } from 'lucide-react';
import { Badge } from './UI/badge';
import { Content } from '../types/content';
import useContentStore from '../store/contentStore';
import { motion } from 'framer-motion';
import { Tweet} from 'react-tweet';

interface ContentCardProps {
    content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
  const { link, title, tags, type } = content;

  const getTweetId = (url: string): string | null => {
    try {
      const u = new URL(url);
      if (!u.hostname.includes('twitter.com') && !u.hostname.includes('x.com')) return null;
      const match = u.pathname.match(/status\/(\d+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };
  const tweetId = getTweetId(link);

  const getYoutubeEmbedUrl = (url: string): string | undefined => {
    try {
      const u = new URL(url);
      if (!u.hostname.includes('youtube.com') && !u.hostname.includes('youtu.be')) return undefined;

      const videoId = u.hostname.includes('youtu.be')
        ? u.pathname.slice(1).split('?')[0]
        : u.searchParams.get('v');

      return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    } catch {
      return undefined;
    }
  };
  const youtubeEmbedUrl = getYoutubeEmbedUrl(link);
  const isYoutube = !!youtubeEmbedUrl;
  const isTweet = !!tweetId;

  const deleteContent = useContentStore((state) => state.deleteContent);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this item?')) {
      deleteContent(content.id);
    }
  };

  return (
    <motion.div 
      className="group w-full h-full hover:bg-white/15 border border-white/5 hover:border-white/10 transition-all duration-300 rounded-lg overflow-hidden shadow-2xl hover:shadow-xl hover:-translate-y-1 relative flex flex-col font-gothic bg-white/5 backdrop-blur-3xl max-h-[500px]"
    >
      <div className="relative z-10 px-5 pt-5 pb-2">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-base font-semibold text-white/90 line-clamp-2 leading-snug uppercase tracking-wide">
            {content.title}
          </h3>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500/20 p-1.5 rounded-full"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
        {content.tags.length>0?<div className="flex flex-wrap gap-1.5 ">
          {content.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className=" px-2 py-1 text-yellow-200 bg-yellow-500/10 border-yellow-500/20 capitalize font-light font-gothic"
            >
              # {tag}
            </Badge>
          ))}
        </div>:null}
      </div>
      <div className="space-y-3 p-0 flex-1 overflow-y-auto no-scrollbar flex flex-col">
          {isTweet && tweetId && (
          <div className="mx-auto max-w-[270px] scale-95">
            <Tweet  id={tweetId} />
          </div>
        )}

        {isYoutube && youtubeEmbedUrl && (
          <div className="w-full aspect-video px-2">
            <iframe
              src={youtubeEmbedUrl}
              className="w-full h-full rounded-2xl"
              allowFullScreen
              loading="lazy"
              title={title}
            />
          </div>
        )}
        {!isTweet && !isYoutube && (
          <div className="px-5 pb-4 pt-2 flex-1">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full h-32 rounded-xl bg-black/20 border border-yellow-500/20 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all group/link"
            >
                <ExternalLink className="w-6 h-6 text-white/40 group-hover/link:text-yellow-400 mb-2 transition-colors" />
                <p className="text-white/30 text-xs truncate max-w-[80%]">{new URL(link).hostname}</p>
            </a>
          </div>
        )}
      </div>
      <div className="px-5 py-1.5 border-t border-white/5 flex items-center justify-between text-[12px] text-white/30 bg-black/20 mt-auto">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <span className="uppercase tracking-wider font-semibold opacity-70 text-[12px]">{type}</span>
      </div>
    </motion.div>
  );
}