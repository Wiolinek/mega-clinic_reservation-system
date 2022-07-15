import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GenericSection from '../common/GenericSection/GenericSection';
import Form from '../Form/Form';

import { DoctorType } from '../../types/doctor';
import { SpecialityType } from '../../types/speciality';
import { VisitType } from '../../types/visit';

import '../Reservation/Reservation.css';


const Reservation: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
    const [doctorsData, setDoctorsData] = useState<DoctorType[]>();
    const [chosenDoctor, setChosenDoctor] = useState<DoctorType[]>();
    const [timetable, setTimetable] = useState<string[]>();
    const [bookedVisits, setBookedVisits] = useState<VisitType[] | null>();

    const specialitiesList = Array.from(new Set(specialitiesData?.map(item => item.speciality)))?.map(filter => 
        <option key={filter}
            value={filter}
            label={filter}
            selected={doctorSpec === filter} >
                {filter}
        </option>
    )

    const bookedTimes = bookedVisits?.map(visit => visit.time.substring(0, 5)).map(time => time.startsWith('0') ? time.substring(1, 5) : time)
    const availableTimes = timetable?.filter(time => !bookedTimes?.includes(time));
    const timeList = availableTimes?.map((item, id) => <option key={id}>{item}</option>);

    useEffect(() => {
        fetch(`http://localhost:3030/specialities`)
        .then(res => res.json())
        .then(result => setSpecialitiesData(result))
        .catch(error => console.log(`error ${error}`))
    }, []);

    useEffect(() => {
        const requestPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ specialityFilter: doctorSpec })
        };
        fetch(`http://localhost:3030/filter`, doctorSpec !== '' ? requestPost : undefined)
        .then(res => res.json())
        .then(result => setDoctorsData(result))
        .catch(error => console.log(`error ${error}`))
    }, [doctorSpec]);

    useEffect(() => {
        setTimetable([])
        fetch(`http://localhost:3030/timetable`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorFilter: doctorName })
        })
        .then(res => res.json())
        .then(result => setChosenDoctor(result))
        .catch(error => console.log(`error ${error}`))
    }, [doctorName]);

    useEffect(() => {
        const requestPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId: String(chosenDoctor?.[0]?.doctor_id) || null})
        };
        fetch(`http://localhost:3030/visits`, requestPost)
        .then(res => res.json())
        .then(result => setBookedVisits(result!))
        .catch(error => console.log(`error ${error}`))
    }, [chosenDoctor]);

    useEffect(() => {
        const times: string[] = []
        
        chosenDoctor?.map(item => {
            for (let i: number = Number(item.working_hours_start.substring(0, 2)); i < Number(item.working_hours_end.substring(0, 2)); i++) {
                times.push(`${i}:00`).toString()
                times.push(`${i}:30`).toString()
            }
        })
        setTimetable(times)
        
    }, [chosenDoctor])


    return (
        <main>
            <GenericSection children={<Form specialitiesList={specialitiesList} doctorsData={doctorsData} 
            timeList={timeList} 
            />} customClass='login__section' />
        </main>
    )
}

export default Reservation;