import { Clock, ExternalLink, Trash2, Twitter, Youtube, FileText, Link, Globe } from 'lucide-react';
import { Badge } from './UI/badge';
import { Content } from '../types/content';
import useContentStore from '../store/contentStore';
import { motion } from 'framer-motion';
import { Tweet } from 'react-tweet';

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
      className="group w-full h-full min-h-[140px] flex flex-col bg-black/40 hover:bg-neutral-900/60 border border-white/5 hover:border-white/10 transition-colors duration-200 rounded-xl overflow-hidden relative font-gothic backdrop-blur-sm"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full group-hover:bg-yellow-500/10 transition-colors pointer-events-none" />

      <div className="px-4 py-4 flex flex-col gap-3 relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 text-white/40 mb-1">
            <div className="p-1 rounded-full bg-white/5">
              {type === 'tweet' && <Twitter className="w-3 h-3 text-blue-400" />}
              {type === 'video' && <Youtube className="w-3 h-3 text-red-500" />}
              {type === 'document' && <FileText className="w-3 h-3 text-orange-400" />}
              {(type === 'link' || type === 'article') && <Globe className="w-3 h-3 text-emerald-400" />}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">{type}</span>
          </div>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/10 p-1.5 rounded-md -mr-1 -mt-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400/50 hover:text-red-400" />
          </button>
        </div>

        <h3 className="text-sm font-semibold text-white/90 leading-snug break-words line-clamp-3">
          {content.title}
        </h3>

        {/* Content Body */}
        <div className="pt-2">
          {isTweet && tweetId && (
            <div className="w-full scale-[0.9] origin-top-left -ml-1 -mt-2 h-[200px] overflow-hidden mask-linear-fade">
              <Tweet id={tweetId} />
            </div>
          )}

          {isYoutube && youtubeEmbedUrl && (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/50 border border-white/5">
              <iframe
                src={youtubeEmbedUrl}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                title={title}
              />
            </div>
          )}

          {!isTweet && !isYoutube && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all group/link"
            >
              <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
                {/* Google Favicon Service for logo */}
                <img
                  src={`https://www.google.com/s2/favicons?domain=${new URL(link).hostname}&sz=64`}
                  alt="icon"
                  className="w-5 h-5 opacity-70 group-hover/link:opacity-100 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${new URL(link).hostname}&sz=32`;
                  }}
                />
                <ExternalLink className="w-3 h-3 text-white/40 hidden" />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-white/80 text-xs font-medium truncate">{new URL(link).hostname}</p>
                <p className="text-white/30 text-[10px] truncate">{link}</p>
              </div>
            </a>
          )}
        </div>

        {/* Tags */}
        {content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 mt-3">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-white/50 border border-white/5 capitalize font-medium whitespace-nowrap"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}