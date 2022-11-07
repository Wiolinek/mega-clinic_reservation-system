import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Form from 'components/formComponents/Form/Form';
import { DoctorType, DoctorsType } from 'types/doctor';
import { SpecialitiesType } from 'types/speciality';
import { VisitsType } from 'types/visit';
import useFetch from 'helpers/useFetch';
import { specialitiesHandler, doctorsHandler, bookedTimesHandler, availableTimesHandler, timeListHandler } from 'helpers/reservation.helper';

import './Reservation.scss';


const Reservation: React.FC = () => {
    const [searchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [chosenDoctor, setChosenDoctor] = useState<React.SetStateAction<DoctorType[] | undefined>>();
    const [timetable, setTimetable] = useState<React.SetStateAction<string[] | undefined>>();
    const [date, setDate] = useState<React.SetStateAction<Date | undefined | any>>();

    const specialitiesData: SpecialitiesType = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/specialities`, 'GET');

    const doctorsData: DoctorsType = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/doctors`, 'POST', doctorSpec !== '' ? { specialityFilter: doctorSpec } : undefined, doctorSpec);

    const bookedVisits: VisitsType = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/visits`, 'POST', { doctorId: String(Array.isArray(chosenDoctor) && chosenDoctor?.[0]?.doctor_id) || null, date: date?.toLocaleDateString('sv') }, chosenDoctor, date);

    const availableTimes = availableTimesHandler(timetable, bookedTimesHandler(bookedVisits));

    useEffect(() => {
        setTimetable([])
            fetch(`${process.env.REACT_APP_SITE_HOST}/api/timetable`, {
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
            <GenericSection>
                <Form
                    specialitiesList={specialitiesHandler(specialitiesData, doctorSpec)}
                    doctorsData={doctorsData.data}
                    doctorsList={doctorsHandler(doctorsData, doctorName)}
                    setChosenDoctor={setChosenDoctor}
                    timeList={timeListHandler(availableTimes)}
                    date={date}
                    setDate={setDate}
                />
            </GenericSection>
        </main>
    )
}

export default Reservation;