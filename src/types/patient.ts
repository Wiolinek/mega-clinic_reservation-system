export interface PatientType {
    id?: string | number,
    speciality: string,
    doctor: string,
    doctorId: string,
    date: string,
    time: string,
    patientName: string,
    patientEmail: string,
    patientPhone: string,
    language: string | undefined,
}

export interface PatientsType {
    data: PatientType[] | null
    loading: boolean;
    error: string | null;
}