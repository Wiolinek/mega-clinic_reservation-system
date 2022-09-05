import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection'
import Doctor from 'components/Doctor/Doctor'
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Filters from 'components/Filters/Filtres';
import { MyContext } from 'Context';
import { DoctorType } from 'types/doctor'
import { SpecialityType } from 'types/speciality';


const OurDoctors: React.FC = () => {
    const { labels } = useContext(MyContext)
    const [doctorsData, setDoctorsData] = useState<DoctorType[]>();
    const [specialitiesData, setSpecialitiesData] = useState<SpecialityType[]>();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const doctorSpec = searchParams.get('speciality');
    const backToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

    useEffect(() => {
    //   fetch(`https://megaclinic.ultra-violet.codes/api/specialities`)
      fetch(`http://localhost:3030/api/specialities`)
      .then(res => res.json())
      .then(res => setSpecialitiesData(res))
      .catch(error => console.log(`error ${error}`))
    }, []);

    useEffect(() => {
        const requestPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ specialityFilter: doctorSpec, doctorFilter: '' })
        };
        // fetch(`https://megaclinic.ultra-violet.codes/api/doctors`, doctorSpec !== null ? requestPost : undefined)
        fetch(`http://localhost:3030/api/doctors`, doctorSpec !== null ? requestPost : undefined)
        .then(res => res.json())
        .then(res => setDoctorsData(res))
        .catch(error => console.log(`error ${error}`))
    }, [searchParams]);
    
    const doctorsList: React.ReactNode = <ul className='doctors'>
        {doctorsData?.map(doctor => <Doctor key={doctor.doctor_id} {...doctor}/>)}
    </ul>

    const filterList = Array.from(new Set(specialitiesData?.map(item => item.speciality)))


    return (
        <main>
            <GenericSection children={<Filters filters={filterList} resultsCounter={doctorsData?.length} />} customClass='filters' />
            <GenericSection children={doctorsList}/>
            <ButtonLink type='button'
                customClass='btn back-to-top'
                text={labels?.buttons.back}
                onClick={backToTop}
            />
        </main>
    )
}

export default OurDoctors;