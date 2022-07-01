export interface DataInterface {
  status: string;
  totalResults: number;
  articles: Array<DataArticles>;
  sources: Array<DataSources>;
}

export interface DataSources {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

export interface DataArticles {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string, name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export const enum ResponseStatus {
  unauthorized = 401,
  notFound = 404
}

export const enum Status {
  ok = 'ok',
  error = 'error'
}

export const enum Endpoint {
  everything = 'everything',
  sources = 'sources'
}


export type Callback<T> = (data: T) => void;

