export type Assets = {
  baseUrl: string;
  images:{ key:string, url:string }[];
};
export default {
  baseUrl: './assets/image',
  images: [
    {
      key: 'black',
      url: 'black.jpg',
    },
    {
      key: 'grass',
      url: 'grass.jpg',
    },
    {
        key: 'red',
        url: 'red.jpg',
      },
    
      {
        key: 'green',
        url: 'green.jpg',
      },
      {
        key: 'over',
        url: 'over.png',
      },
  ],
};