import { Types } from 'mongoose';

export interface PublishUserInterface {
  state: string;
  id: number;
  title: string;
  content: string;
  publishDate: Date;
  category: Types.Array<string>;
  autor: {
    name: string;
  };
}
