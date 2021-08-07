export type Assets = {
  baseUrl: string;
  images:{ key:string, url:string }[];
};
export default {
  baseUrl: './assets/',
  images: [
  
    {
      key: 'coin',
      url: 'img/coin.jpg',
    },
    
    {
      key: 'desyrel',
      url: 'fonts/desyrel.xml',
    },
  ],
};
