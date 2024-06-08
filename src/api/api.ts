export const serverURL =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
export const imageURL = serverURL + '/api';

export interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
}

export interface LoginDecodedData {
  accessToken: string;
  refreshToken: string;
}
