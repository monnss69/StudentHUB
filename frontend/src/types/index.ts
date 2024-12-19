export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}