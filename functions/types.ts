export type User = {
  first_name: string;
  last_name: string;
  id?: number;
};

export type insertUserResponse = {
  success?: boolean;
  data?: any;
  error?: string;
};
