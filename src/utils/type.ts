export interface Album {
  title: string;
  max_allowed_pictures: number;
  selected_pictures: string[];
  album_status?: "draft" | "progress" | "completed";
  created_at: string;
}

interface AlbumData {
  [key: string]: Album;
}

export interface AlbumResponse {
  statusCode: number;
  body: {
    preview: string[];
    final: {
      normal: string[];
      high: string[];
      max: string[];
    };
    albumProps: AlbumData;
  };
}

export interface Image {
  url: string;
  title: string;
}

export interface ImageUrlResponse {
  statusCode: number;
  body: {
    urls: {
      url: string;
      title: string;
    }[];
  };
}

export interface LocalImages {
  path: {
    src: string;
    width: number;
  };
  title: string;
}
