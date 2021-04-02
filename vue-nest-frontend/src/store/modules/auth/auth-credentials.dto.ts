export interface SigninCredentialsDto {
  username: string | null;
  email: string | null;
  password: string;
}

export interface SignupCredentialsDto {
  username: string;
  email: string;
  password: string;
}
