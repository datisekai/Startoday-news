export default interface TinTucItem {
  author?: any;
  slug?: string;
  avatar?: string;
  title: string;
  description: string;
  html: string;
  category: any;
  status: boolean;
  view: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  similars?: any;
}
