export const serverURL =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
export const imageURL = `${serverURL}/public`;
export const GOOGLE_API_KEY =
  '818522048605-6netuag42gtdeo51nc2v48p66jdl0brg.apps.googleusercontent.com';
export interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
}
