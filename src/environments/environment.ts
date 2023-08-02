export const environment = {
  firebase: {
    apiKey: 'AIzaSyDMN909t0BaDpmclWaoJAV4LOFnfauKzgw',
    authDomain: 'pickvoice.firebaseapp.com',
    databaseURL: 'https://pickvoice.firebaseio.com',
    projectId: 'pickvoice',
    storageBucket: 'pickvoice.appspot.com',
    messagingSenderId: '817699994079',
    appId: '1:817699994079:web:ad6058ef3f83d313e86c6a',
  },
  api: {
    baseUrl: 'http://localhost/api/',
    endpoints: {
      product: (productId: number) => `products/${productId}`,
      products: `products`,
    },
  },
};
