declare module WeGoNiceApi {
  interface RequestResponse {
    status: number | null;
    data: Record<string, any>;
  }
}
