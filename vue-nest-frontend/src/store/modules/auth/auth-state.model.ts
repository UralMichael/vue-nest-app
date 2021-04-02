export interface AuthState {
  token: string;
  id: number;
  expiresIn: number;
  tokenTimer: number;
}
