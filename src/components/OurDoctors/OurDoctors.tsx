import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// import Banner from "../Banner/Banner";
import GenericSection from "../GenericSection/GenericSection"
import Doctor from '../Doctor/Doctor'
import ButtonLink from '../ButtonLink/ButtonLink';
import Filters from '../Filters/Filtres';
import { DoctorType } from '../../types/doctor'
import { SpecialityType } from '../../types/speciality';

import '../OurDoctors/OurDoctors.css';


const OurDoctors: React.FC = () => {

    const [doctorsData, setDoctorsData] = useState<DoctorType[]>();
    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
    const [searchParams, setSearchParams] = useSearchParams();

    const doctorSpec = searchParams.get('speciality');

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
        fetch(`http://localhost:3030/filter`, doctorSpec !== null ? requestPost : undefined)
        .then(response => response.json())
        .then(result => setDoctorsData(result))
        .catch(error => console.log(`error ${error}`))
    }, [searchParams]);
    
    const doctorsList: React.ReactNode = <ul className='doctors'>
        {doctorsData?.map(doctor => <Doctor key={doctor.id} {...doctor}/>)}
    </ul>

    const filterList = Array.from(new Set(specialitiesData?.map(item => item.speciality)))

    const backToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }


    return (
        <main>
            {/* <Banner /> */}
            <GenericSection children={<Filters filters={filterList} resultsCounter={doctorsData?.length} />} customClass='filters' />
            <GenericSection children={doctorsList}/>
            <ButtonLink customClass='back-to-top' text='powrót' type='button' onClick={backToTop}/>
        </main>
    )
}

export default OurDoctors;