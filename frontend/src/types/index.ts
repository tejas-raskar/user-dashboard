export interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  attachment?: {
    fileName: string;
    fileType: string;
    fileSize: number;
  };
  createdAt: string;
  updatedAt: string;
}
