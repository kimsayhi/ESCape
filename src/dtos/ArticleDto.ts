export interface BoardData {
  totalCount: number;
  list: Article[]
}

export interface Article {
  updatedAt: string,
  createdAt: string,
  likeCount: number,
  writer: {
    nickname: string,
    id: number,
  }
  image: string,
  title: string,
  id: number,
}