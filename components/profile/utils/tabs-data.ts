export const tabs = (id:string) =>  [
  { text: "Tweets", href: `/profile/${id}` },
  { text: "Replies", href: `/profile/${id}/with-replies` },
  { text: "Media", href: `/profile/${id}/media` },
  { text: "Likes", href: `/profile/${id}/likes` },
];
