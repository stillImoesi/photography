export interface AlbumResponse {
  statusCode: number;
  body: {
    preview: string[];
    final: {
      normal: string[];
      high: string[];
      max: string[];
    };
    albumProps: {
      [key: string]: {
        title: string;
        max_allowed_pictures: number;
        selected_pictures: string[];
        album_status?: "draft" | "progress" | "completed";
        created_at: string;
      };
    };
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
