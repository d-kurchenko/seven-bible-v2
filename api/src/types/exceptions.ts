export interface HttpExceptionResponse  {
  message: string;
  error?: Error | unknown;
  silent?: boolean;
}
