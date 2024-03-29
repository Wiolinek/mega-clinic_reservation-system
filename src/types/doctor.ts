export interface DoctorType {
    doctor_id: string;
    name: string;
    photo: string;
    description: string;
    speciality: string;
    working_hours_start: string;
    working_hours_end: string;
}

export interface DoctorsType {
    data: DoctorType[] | null;
    loading: boolean;
    error: string | null;
}