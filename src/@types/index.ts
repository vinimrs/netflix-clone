export interface IMovieData {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface IMovieDataInfo extends IMovieData {
  belong_to_collection?: null | string;
  budget?: number;
  genres?: { id?: number; name?: string }[];
  homepage?: string;
  imdb_id?: string;
  production_companies?: {
    id?: number;
    logo_path?: string;
    name?: string;
    origin_coutry?: string;
  }[];
  production_countries?: { iso_3166_1?: string; name?: string }[];
  revenue?: number;
  runtime?: number;
  last_air_date?: string;
  number_of_seasons?: number;
  spoken_languages?: {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
  }[];
  status?: string;
  tagline?: string;
}

export interface IMovieVideo {
  iso_639_1?: string;
  iso_3166_1?: string;
  name?: string;
  key?: string;
  site?: string;
  size?: number;
  type?: string;
  official?: string;
  published_at?: string;
  id?: string;
}

export interface IMovieHomeList {
  slug: string;
  title: string;
  items: IMovieData[];
}

export interface IUser {
  username?: string;
  email?: string;
}

export interface IImageData {
  _id: string;
  data: ArrayBuffer;
  contentType: string;
}

export interface IProfile {
  name?: string;
  image?: IImageData;
  preference?: string[];
  slug?: string;
}

export interface ISession extends Response {
  user: IUser;
  id: string;
  verifiedEmail: boolean;
  profiles: IProfile[];
}
