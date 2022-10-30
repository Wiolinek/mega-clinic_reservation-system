export interface VisitType {
    date: Date;
    doctor: string;
    id: string;
    doctor_id: string;
    patientEmail: string;
    patientName: string;
    patientPhone: string;
    speciality: string;
    time: string;
    notes: string;
}

export interface VisitsType {
    data: VisitType[] | null
    loading: boolean;
    error: string | null;
}