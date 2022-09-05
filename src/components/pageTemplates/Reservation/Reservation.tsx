import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Form from 'components/Form/Form';
import { DoctorType } from 'types/doctor';
import { SpecialityType } from 'types/speciality';

import './Reservation.css';


const Reservation: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
    const [doctorsData, setDoctorsData] = useState<DoctorType[]>();
    const [chosenDoctor, setChosenDoctor] = useState<DoctorType[]>();

    const specialitiesList = Array.from(new Set(specialitiesData?.map(item => item.speciality)))?.map(filter => 
        <option key={filter}
            value={filter}
            label={filter}
            selected={doctorSpec === filter}
        >
            {filter}
        </option>
    )

    useEffect(() => {
        // fetch(`https://megaclinic.ultra-violet.codes/api/specialities`)
        fetch(`http://localhost:3030/api/specialities`)
        .then(res => res.json())
        .then(res => setSpecialitiesData(res))
        .catch(error => console.log(`error ${error}`))
    }, []);

    useEffect(() => {
        const requestPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ specialityFilter: doctorSpec })
        };
        // fetch(`https://megaclinic.ultra-violet.codes/api/doctors`, doctorSpec !== '' ? requestPost : undefined)
        fetch(`http://localhost:3030/api/doctors`, doctorSpec !== '' ? requestPost : undefined)
        .then(res => res.json())
        .then(res => setDoctorsData(res))
        .catch(error => console.log(`error ${error}`))
    }, [doctorSpec]);


    return (
        <main>
            <GenericSection customClass='login__section'>
                <Form
                    specialitiesList={specialitiesList}
                    doctorsData={doctorsData}
                    chosenDoctor={chosenDoctor}
                    setChosenDoctor={setChosenDoctor}
                />
            </GenericSection>
        </main>
    )
}

export default Reservation;