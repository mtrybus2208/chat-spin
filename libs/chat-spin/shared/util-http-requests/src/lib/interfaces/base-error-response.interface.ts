export interface BaseErrorResponse {
  errors: Record<string, string[]>;
  type: string;
  title: string;
  status: number;
}
