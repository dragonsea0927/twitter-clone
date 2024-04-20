export const retrieveHastagsFromTweet = (text:string):string[] | null=> {
    const hashtags = text.match(/#\w+/gi);
    return hashtags ? hashtags.map((hashtag)=> hashtag.slice(1)) : null;
}