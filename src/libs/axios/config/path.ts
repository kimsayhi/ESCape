export const API_PATH = {
  user: {
    me: '/user/me',
    ranking: '/user/ranking',
    user(userId: string | number) {
      return `/user/${userId}`
    },
    createdProducts(userId: string | number) {
      return `/user/${userId}/created-products`
    },
    reviewedProducts(userId: string | number) {
      return `/user/${userId}/reviewed-products`
    },
    favoriteProducts(userId: string | number) {
      return `/user/${userId}/favorite-products`
    },
    followees(userId: string | number) {
      return `/user/${userId}/followees`
    },
    followers(userId: string | number) {
      return `/user/${userId}/followers`
    },
  },
  review: {
    default: '/reviews',
    like(reviewId: string | number) {
      return `/reviews/${reviewId}/like`
    },
    detail(reviewId: string | number) {
      return `/reviews/${reviewId}`
    },
  },
  product: {
    default: '/products',
    detail(productId: string | number) {
      return `/products/${productId}`
    },
    reviews(productId: string | number) {
      return `/products/${productId}/reviews`
    },
    favorite(productId: string | number) {
      return `/products/${productId}/favorite`
    },
  },
  oauth: {
    default: '/oauthApps',
  },
  image: {
    default: '/images/upload',
  },
  follow: {
    default: '/follow ',
  },
  category: {
    default: '/categories',
  },
  auth: {
    signUp: '/auth/signUp',
    signIn: '/auth/signIn',
    easySignUp(provider: string) {
      return `/auth/signUp/${provider}`
    },
    easySignIn(provider: string) {
      return `/auth/signIn/${provider}`
    },
  },
}
