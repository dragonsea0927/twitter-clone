export const highlightHashtags = (text: string): React.ReactNode => {
    const hashtagRegex = /#\w+/gi;
  
    const matches = text.match(hashtagRegex) || [];
    
    const parts = text.split(hashtagRegex);
  
    const result = parts.reduce((acc: React.ReactNode[], part, index) => {
      acc.push(<span key={index}>{part}</span>);
      const hashtag = matches[index];
      if (hashtag) {
        acc.push(
          <span key={`hashtag-${index}`} className="text-sky-500">
            {hashtag}
          </span>
        );
      }
      return acc;
    }, []);
  
    return result
  };