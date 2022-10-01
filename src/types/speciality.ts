export interface SpecialityType {
    id: number;
    speciality: string;
}

export interface SpecialitiesType {
    data: SpecialityType[] | null;
    loading: boolean;
    error: string | null;
}