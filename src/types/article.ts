export interface ArticleType {
    data: [
        {
            id: number,
            page: string,
            title: string,
            language: string,
            content: string
        }
    ] | null;
    loading: boolean;
    error: string | null;
}