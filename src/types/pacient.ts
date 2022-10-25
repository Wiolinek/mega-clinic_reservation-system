export interface PacientType {
    id?: string | number,
    speciality: string,
    doctor: string,
    doctorId: string,
    date: string,
    time: string,
    pacientName: string,
    pacientEmail: string,
    pacientPhone: string,
    language: string | undefined,
}

export interface PacientsType {
    data: PacientType[] | null
    loading: boolean;
    error: string | null;
}