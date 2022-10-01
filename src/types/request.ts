export interface RequestType {
    method: string,
    credentials?: RequestCredentials | undefined,
    headers: {
      'Content-Type': string
    },
    body?: BodyInit | null | undefined,
}