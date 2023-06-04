import axios, { Axios } from "axios";
import { AxiosResponse } from "axios";

export type JsonPlaceholderUserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type JsonPlaceholderAlbumType = {
  userId: number;
  id: number;
  title: string;
};

export class JsonPlaceholderApi {
  private readonly axiosClient: Axios;

  constructor(private readonly baseUrl: string) {
    this.axiosClient = axios;
    this.axiosClient.defaults.baseURL = baseUrl;
  }

  async users(start?: number, limit?: number) {
    
  const result: AxiosResponse<JsonPlaceholderUserType[]> =
      await this.axiosClient.get<JsonPlaceholderUserType[]>("users", {
        params: {
          _start: start,
          _limit: limit,
        },
      });

    return result;
  }

  async getUser(userId: number): Promise<JsonPlaceholderUserType> {
   const result: AxiosResponse<JsonPlaceholderUserType> =
      await this.axiosClient.get<JsonPlaceholderUserType>("users/" + userId);

    return result.data;
  }

  async albums(
    userId?: number,
    start?: number,
    limit?: number
  ): Promise<JsonPlaceholderAlbumType[]> {
    
   const result: AxiosResponse<JsonPlaceholderAlbumType[]> =
      await this.axiosClient.get<JsonPlaceholderAlbumType[]>("albums", {
        params: {
          userId: userId,
          _start: start,
          _limit: limit,
        },
      });

    return result.data;
  }

  async posts(userId?: number, start?: number, limit?: number) {
   
    const  result: AxiosResponse<any[]> = await this.axiosClient.get<any[]>(
      "posts",
      {
        params: {
          userId: userId,
          _start: start,
          _limit: limit,
        },
      }
    );

    return result.data;
  }
}

export default function useJsonPlaceholderApi(): JsonPlaceholderApi {
  

  return new JsonPlaceholderApi(import.meta.env.VITE_API_BASE_URL);
}