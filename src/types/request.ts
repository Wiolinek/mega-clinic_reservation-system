export interface RequestType {
    method: string,
    credentials?: RequestCredentials | any,
    headers: {
      'Content-Type': string
    },
    body?: BodyInit | null | string,
}