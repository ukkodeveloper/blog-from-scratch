// @ts-ignore
import { slug } from 'github-slugger';

const slugger = (text: string) => {
  return slug(text.toLowerCase());
};

export default slugger;
