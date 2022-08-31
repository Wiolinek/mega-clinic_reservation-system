export interface UserType {
    user: {
        id: string;
        name: string;
    }
    setUser: React.Dispatch<React.SetStateAction<Object>>
}