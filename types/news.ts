export interface News {
  Data?: NewsEntity[] | null;
  Err: Err;
}
export interface NewsEntity {
  TYPE: string;
  ID: number;
  GUID: string;
  PUBLISHED_ON: number;
  IMAGE_URL: string;
  TITLE: string;
  URL: string;
  SOURCE_ID: number;
  BODY: string;
  KEYWORDS: string;
  LANG: string;
  UPVOTES: number;
  DOWNVOTES: number;
  SCORE: number;
  SENTIMENT: string;
  STATUS: string;
  CREATED_ON: number;
  UPDATED_ON?: null;
  SOURCE_DATA: SOURCEDATA;
  CATEGORY_DATA?: CATEGORYDATAEntity[] | null;
}
export interface SOURCEDATA {
  TYPE: string;
  ID: number;
  SOURCE_KEY: string;
  NAME: string;
  IMAGE_URL: string;
  URL: string;
  LANG: string;
  SOURCE_TYPE: string;
  LAUNCH_DATE: number;
  SORT_ORDER: number;
  BENCHMARK_SCORE: number;
  STATUS: string;
  LAST_UPDATED_TS: number;
  CREATED_ON: number;
  UPDATED_ON: number;
}
export interface CATEGORYDATAEntity {
  TYPE: string;
  ID: number;
  NAME: string;
  CATEGORY: string;
}
export interface Err {}
