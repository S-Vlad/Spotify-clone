export type Comment = {
  _id: string;
  username?: string;
  text?: string;
};

export type Track = {
  _id: string;
  title: string;
  artist: string;
  lyrics: string;
  listens: number;
  picture: string;
  audio: string;
  comments: Comment[];
};
