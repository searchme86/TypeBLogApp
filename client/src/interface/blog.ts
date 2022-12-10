import IUser from './user';
import { ReactNode } from 'react';

export default interface IBlog {
  _id: string;
  title: string;
  author: string | IUser;
  content: string;
  headline: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
  // 추가
  children: ReactNode;
}
