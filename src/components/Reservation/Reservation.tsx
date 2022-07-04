import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// import Banner from "../Banner/Banner";
import GenericSection from "../GenericSection/GenericSection";

import { DoctorType } from '../../types/doctor'
import { SpecialityType } from '../../types/speciality';

import '../Reservation/Reservation.css';


const Reservation: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');

    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
    const [specFilter, setSpecFilter] = useState<String>(doctorSpec || '')
    const [doctorFilter, setDoctorFilter] = useState<String>(doctorName ||'')
    const [doctorsData, setDoctorsData] = useState<DoctorType[]>();

    console.log(specFilter)
    console.log(doctorFilter)

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
            body: JSON.stringify({ specialityFilter: specFilter})
        };
        fetch(`http://localhost:3030/filter`, doctorFilter !== '' ? requestPost : undefined)
        .then(response => response.json())
        .then(result => setDoctorsData(result))
        .catch(error => console.log(`error ${error}`))
    }, [specFilter]);

    const specFilterHandler = (e: React.SyntheticEvent, filter: string) => {
        // e.preventDefault()
        setSpecFilter(filter)
    }

    const doctorFilterHandler = (e: React.SyntheticEvent, filter: string) => {
        // e.preventDefault()
        // setDoctorFilter(filter)
    }

    const specialitiesList = Array.from(new Set(specialitiesData?.map(item => item.speciality)))?.map(filter => <option key={filter} value={filter} selected={doctorSpec === filter} onClick={e => specFilterHandler(e, filter)} >{filter}</option>)

    const doctorsList = doctorsData?.map(item => <option key={item.name} value={item.name} selected={item.name === doctorFilter} onClick={e => doctorFilterHandler(e, item.name)} >{item.name}</option>)

    console.log(doctorsData)
    console.log(specialitiesData)

    const timetable = (doctorsData: DoctorType[]) => {
        const times: String[] = []
        
        doctorsData?.map(item => {
            
            console.log(Number(item.working_hours_start.substring(0, 2)))

            for (let i: number = Number(item.working_hours_start.substring(0, 2)); i < Number(item.working_hours_end.substring(0, 2)); i++) {
                times.push(`${i}:00`)
                times.push(`${i}:30`)
            }
        })
        return times
    }

    const timeList = doctorsData && timetable(doctorsData).map(item => <option>{item}</option>)


    const form: React.ReactNode = <><h2>Zarezerwuj wizytę</h2>
        <form className="login__form">
            <div>
                <div>
                    <label>Wybierz specjalizację:
                        <select required onChange={e => setSearchParams(e.target.selectedOptions[0].value !== '---' ? {speciality: e.target.selectedOptions[0].value, doctor: `${doctorName}`} : {})}>
                            <option key='---' value='---'>---</option>
                            {specialitiesList}
                        </select>
                    </label>
                    <label>Wybierz lekarza:
                        <select required onChange={e => setSearchParams(e.target.selectedOptions[0].value !== '---' ? {speciality: `${doctorSpec}`, doctor: e.target.selectedOptions[0].value} : {})}>
                            <option key='---' value='---'>---</option>
                            {doctorsList}
                        </select>
                    </label>
                    <label>Wybierz godzinę:
                        <select required>
                            <option key='---' value='---'>---</option>
                            {timeList}
                        </select>
                    </label>
                </div>
                <div>
                    <label>Imię i nazwisko:<input type="text" name="name" required></input></label>
                    <label>Adres email:<input type="email" name="mail" required></input></label>
                    <label>Numer telefonu:<input type="email" name="mail" required></input></label>
                </div>
            </div>
            <button className="login__btn" type="submit">Wyślij</button>
        </form>
    </>

    return (
        <main>
            <GenericSection children={form} customClass='login__section' />
        </main>
    )
}

export default Reservation;