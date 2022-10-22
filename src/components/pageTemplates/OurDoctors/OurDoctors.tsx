import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection'
import Doctor from 'components/Doctor/Doctor'
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Filters from 'components/Filters/Filtres';
import { MyContext } from 'Context';
import { DoctorType, DoctorsType } from 'types/doctor'
import { SpecialityType, SpecialitiesType } from 'types/speciality';
import useFetch from 'helpers/useFetch';


const OurDoctors: React.FC = () => {
    const { labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');

    const specialitiesData: SpecialitiesType = useFetch(`http://localhost:3030/api/specialities`);
    // const specialitiesData: SpecialitiesType = useFetch(`https://megaclinic.ultra-violet.codes/api/specialities`);

    const doctorsData: DoctorsType = useFetch(`http://localhost:3030/api/doctors`, doctorSpec !== null ? { specialityFilter: doctorSpec, doctorFilter: '' } : undefined, searchParams);
    // const doctorsData: DoctorsType = useFetch(`https://megaclinic.ultra-violet.codes/api/doctors`, doctorSpec !== null ? { specialityFilter: doctorSpec, doctorFilter: '' } : undefined, searchParams);

    const backToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

    const filterList = Array.from(new Set(specialitiesData?.data?.map((item: SpecialityType) => item.speciality)))


    return (
        <main>
            <GenericSection customClass='filters'>
                <Filters
                    filters={filterList}
                    resultsCounter={doctorsData?.data?.length}
                />
            </GenericSection>
            <GenericSection>
                <ul className='doctors'>
                    {doctorsData?.data?.map((doctor: DoctorType) => 
                        <Doctor key={doctor.doctor_id} {...doctor}/>
                    )}
                </ul>
            </GenericSection>
            <ButtonLink type='button'
                customClass='blue-btn back-to-top'
                text={labels?.buttons.back}
                onClick={backToTop}
            />
        </main>
    )
}

export default OurDoctors;