import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Form from 'components/formComponents/Form/Form';
import { DoctorType } from 'types/doctor';
import { SpecialityType } from 'types/speciality';
import { VisitType } from 'types/visit';
import useFetch from 'helpers/useFetch';

import './Reservation.scss';


interface Specialities {
    data: SpecialityType[] | null;
    loading: boolean;
    error: string | null;
}

interface Doctors {
    data: DoctorType[] | null;
    loading: boolean;
    error: string | null;
}

interface Visits {
    data: VisitType[] | null
    loading: boolean;
    error: string | null;
}

const Reservation: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [chosenDoctor, setChosenDoctor] = useState<React.SetStateAction<DoctorType[] | undefined>>();
    const [timetable, setTimetable] = useState<React.SetStateAction<string[] | undefined>>();
    const [date, setDate] = useState<React.SetStateAction<Date | undefined | any>>();

    const specialitiesData: Specialities = useFetch(`http://localhost:3030/api/specialities`);
    // const specialitiesData: Specialities = useFetch(`https://megaclinic.ultra-violet.codes/api/specialities`);

    const doctorsData: Doctors = useFetch(`http://localhost:3030/api/doctors`, doctorSpec !== '' ? { specialityFilter: doctorSpec } : undefined, doctorSpec);
    // const doctorsData: Doctors = useFetch(`https://megaclinic.ultra-violet.codes/api/doctors`, doctorSpec !== '' ? { specialityFilter: doctorSpec } : undefined, doctorSpec);

    const bookedVisits: Visits = useFetch(`http://localhost:3030/api/visits`, { doctorId: String(Array.isArray(chosenDoctor) && chosenDoctor?.[0]?.doctor_id) || null, dateFilter: date?.toLocaleDateString('sv') }, chosenDoctor!, date);
    // const bookedVisits: Visits = useFetch(`https://megaclinic.ultra-violet.codes/api/visits`, { doctorId: String(chosenDoctor?.[0]?.doctor_id) || null, dateFilter: date?.toLocaleDateString('sv') }, chosenDoctor, date);

    const specialitiesList = Array.from(new Set(specialitiesData?.data?.map((item: SpecialityType) => item.speciality)))?.map((filter: string) => 
        <option key={filter}
            value={filter}
            label={filter}
            selected={filter === doctorSpec}
        >
            {filter}
        </option>
    )

    const doctorsList = doctorsData?.data?.map((item: DoctorType) =>
        <option key={item.doctor_id}
            value={item.doctor_id}
            label={item.name}
            selected={item.name === doctorName}
        >   
            {item.name}
        </option>
    )

    const bookedTimes = bookedVisits?.data?.map((visit: VisitType) => visit.time.substring(0, 5)).map((time: string) => time.startsWith('0') ? time.substring(1, 5) : time);

    const availableTimes = Array.isArray(timetable) && timetable.filter((time: string) => !bookedTimes?.includes(time));

    const timeList = Array.isArray(availableTimes) && availableTimes.map((item: string, id: number) => 
        <option key={id}>{item}</option>);

    useEffect(() => {
        setTimetable([])
        // fetch(`https://megaclinic.ultra-violet.codes/api/timetable`, {
            fetch(`http://localhost:3030/api/timetable`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorFilter: doctorName})
        })
        .then(res => res.json())
        .then(res => setChosenDoctor(res))
        .catch(error => console.log(`error ${error}`))
    }, [doctorName, date]);

    useEffect(() => {
        const times: string[] = []
        
        Array.isArray(chosenDoctor) && chosenDoctor.map((item: DoctorType) => {
            for (let i: number = Number(item.working_hours_start.substring(0, 2)); i < Number(item.working_hours_end.substring(0, 2)); i++) {
                times.push(`${i}:00`).toString()
                times.push(`${i}:30`).toString()
            }
        })
        setTimetable(times)
    }, [chosenDoctor])
    

    return (
        <main>
            <GenericSection customClass='login__section'>
                <Form
                    specialitiesList={specialitiesList}
                    doctorsData={doctorsData.data}
                    doctorsList={doctorsList}
                    setChosenDoctor={setChosenDoctor}
                    timeList={timeList}
                    date={date}
                    setDate={setDate}
                />
            </GenericSection>
        </main>
    )
}

export default Reservation;