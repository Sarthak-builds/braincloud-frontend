
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/UI/badge';
import { Content } from '@/types/content';
import { Tweet} from 'react-tweet';
import { Button } from './UI/button';
import useContentStore from '@/store/contentStore';


interface ContentCardProps {
    content: Content;
}
export  function ContentCard({content}: ContentCardProps) {
  
 const {link, title, tags, type} = content;
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
 
return (<Card className="w-full min-w-80 hover:shadow-md flex flex-col transition-shadow duration-200 border-border/50 bg-white/3 text-white border-none scrollbar-hidden  relative">
      <CardHeader className="">
          <CardTitle className="text-base  font-bold text-white/60 line-clamp-2  font-gothic uppercase">{content.title}</CardTitle>
           <button
  onClick={handleDelete}
  className=" absolute right-5 z-10 scale-120"
><i className="ri-delete-bin-2-line text-red-500"></i>
</button>
         <div className="flex flex-wrap gap-1">
          {content.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs text-yellow-600 bg-white/10 border-none font-gothic">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3 overflow-y-auto no-scrollbar">
        {isTweet && tweetId && (
          <div className="mx-auto max-w-2xl">
            <Tweet id={tweetId} />
          </div>
        )}
        {isYoutube && youtubeEmbedUrl && (
          <div className="relative rounded-2xl  border border-white/20 shadow-2xl w-full aspect-video">
            <iframe
              src={youtubeEmbedUrl}
              className="w-full  border-0 rounded-2xl h-full"
              allowFullScreen
              loading="lazy"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; web-share; picture-in-picture; clipboard-write;"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
              title={title}
            />
          </div>
        )}
        {!isTweet && !isYoutube && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group"
          >
            <span className="text-2xl font-bold"><i className="ri-external-link-line hover:text-yellow-500"></i></span>
            <p className="text-white/50 text-sm mt-2 truncate max-w-lg mx-auto">{link}</p>
          </a>
        )}
        <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span> {new Date().toLocaleDateString()}</span>
          <Badge variant="secondary" className="text-xs bg-white/10 text-white/40">
            {content.tags.length} Tags
          </Badge>
        </div>
      </CardContent>
    </Card>)
}