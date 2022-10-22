export interface VisitType {
    date: Date;
    doctor: string;
    id: string;
    doctor_id: string;
    pacientEmail: string;
    pacientName: string;
    pacientPhone: string;
    speciality: string;
    time: string;
}

export interface VisitsType {
    data: VisitType[] | null
    loading: boolean;
    error: string | null;
}