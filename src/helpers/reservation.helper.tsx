import { SpecialitiesType } from 'types/speciality';
import { DoctorType, DoctorsType } from 'types/doctor';
import { VisitType, VisitsType } from 'types/visit';


export const specialitiesHandler = (specialitiesData: SpecialitiesType, doctorSpec: string | null) => {

    return Array.from(new Set(specialitiesData?.data?.map(item => item.speciality)))?.map(filter =>
        <option key={filter}
            value={filter}
            label={filter}
            selected={filter === doctorSpec}
        >
            {filter}
        </option>
    )
}


export const doctorsHandler = (doctorsData: DoctorsType, doctorName: string | null) => {

    return doctorsData?.data?.map((item: DoctorType) =>
        <option key={item.doctor_id}
            value={item.doctor_id}
            label={item.name}
            selected={item.name === doctorName}
        >   
            {item.name}
        </option>
    )
}


export const bookedTimesHandler = (bookedVisits: VisitsType) => {

    return bookedVisits?.data?.map((visit: VisitType) => 
        visit.time.substring(0, 5)).map((time: string) => time.startsWith('0') ? time.substring(1, 5) : time)
}


export const availableTimesHandler = (timetable: React.SetStateAction<string[] | undefined>, bookedTimes: string[] | undefined) => {
    
    return Array.isArray(timetable) &&
        timetable.filter((time: string) => !bookedTimes?.includes(time))
}


export const timeListHandler = (availableTimes: string[] | boolean) => {

    return Array.isArray(availableTimes) && 
        availableTimes.map((item: string, id: number) => 
            <option key={id}>{item}</option>);
}