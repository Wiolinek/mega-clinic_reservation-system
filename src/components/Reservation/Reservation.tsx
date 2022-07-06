import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GenericSection from "../GenericSection/GenericSection";
import Form from "../Form/Form";

import { DoctorType } from '../../types/doctor'
import { SpecialityType } from '../../types/speciality';

import '../Reservation/Reservation.css';


const Reservation: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
    const [doctorsData, setDoctorsData] = useState<DoctorType[]>();
    const [chosenDoctor, setChosenDoctor] = useState<DoctorType[]>();
    const [timetable, setTimetable] = useState<String[]>()

    useEffect(() => {
        fetch(`http://localhost:3030/specialities`)
        .then(response => response.json())
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
        .then(response => response.json())
        .then(result => setDoctorsData(result))
        .catch(error => console.log(`error ${error}`))
    }, [doctorSpec]);

    useEffect(() => {
        fetch(`http://localhost:3030/timetable`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorFilter: doctorName })
        })
        .then(response => response.json())
        .then(result => setChosenDoctor(result))
        .catch(error => console.log(`error ${error}`))
    }, [doctorName]);

    useEffect(() => {
        setTimetable([])
        const times: String[] = []
        
        chosenDoctor?.map(item => {
            for (let i: number = Number(item.working_hours_start.substring(0, 2)); i < Number(item.working_hours_end.substring(0, 2)); i++) {
                times.push(`${i}:00`)
                times.push(`${i}:30`)
            }
        })
        setTimetable(times)
        
    }, [chosenDoctor])

    const specialitiesList = Array.from(new Set(specialitiesData?.map(item => item.speciality)))?.map(filter => <option key={filter} value={filter} selected={doctorSpec === filter} >{filter}</option>)

    const doctorsList = doctorsData?.map(item => <option key={item.name} value={item.name} selected={item.name === doctorName} >{item.name}</option>)

    const timeList = timetable && timetable.map((item, id) => <option key={id}>{item}</option>)


    return (
        <main>
            <GenericSection children={<Form specialitiesList={specialitiesList} doctorsList={doctorsList} timeList={timeList } />} customClass='login__section' />
        </main>
    )
}

export default Reservation;