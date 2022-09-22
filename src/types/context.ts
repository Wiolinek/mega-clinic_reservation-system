export interface LabelsType {
    [key: string]: {
        [key: string]: string
    };
}

export interface UserType {
    id: string;
    name: string;
}

export interface ContextType {
    user: UserType,
    setUser: React.Dispatch<React.SetStateAction<Object>>,
    labels: LabelsType | undefined,
    language: string,
    setLanguage: React.Dispatch<React.SetStateAction<string>>,
}