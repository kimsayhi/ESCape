export interface BoardData {
  page: number
  totalCount: number
  articleList: Article[]
}

export interface Article {
  id: number
  title: string
  writer: {
    id: number
    nickname: string
    image: string | null
  }
  likeCount: number
  commentCount: number
  isLiked: boolean
  imageIdList: number[]
  createdAt: string
  updatedAt: string
}

export interface ArticleFormData {
  id: string
  image: string
  content: string
  title: string
  userId: number
}

export interface ArticleDetail extends Article {
  commentCount: number
  isLiked: boolean
  content: string
}

export interface CommentData {
  totalCount: number
  articleComments: ArticleComment[]
}

export interface ArticleComment {
  writer: {
    image: string
    nickname: string
    id: number
  }
  updatedAt: string
  createdAt: string
  content: string
  id: number
}

export interface CommentFormData {
  userId: number
  content: string
}

export interface UserData {
  id: number
  nickname: string
  description: string
  image: string
}
