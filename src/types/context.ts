export interface ContextType {
    user: {
        id: string;
        name: string;
    },
    setUser: React.Dispatch<React.SetStateAction<Object>>,
    labels: {
        [key: string]: {
            [key: string]: string
        };
    },
    language: string,
    setLanguage: React.Dispatch<React.SetStateAction<string>>,
}