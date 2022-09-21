import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection'
import Doctor from 'components/Doctor/Doctor'
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import Filters from 'components/Filters/Filtres';
import { MyContext } from 'Context';
import { DoctorType } from 'types/doctor'
import { SpecialityType } from 'types/speciality';
import useFetch from 'helpers/useFetch';

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


const OurDoctors: React.FC = () => {
    const { labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');

    const specialitiesData: Specialities = useFetch(`http://localhost:3030/api/specialities`);
    // const specialitiesData: Specialities = useFetch(`https://megaclinic.ultra-violet.codes/api/specialities`);

    const doctorsData: Doctors = useFetch(`http://localhost:3030/api/doctors`, doctorSpec !== null ? { specialityFilter: doctorSpec, doctorFilter: '' } : undefined, searchParams);
    // const doctorsData: Doctors = useFetch(`https://megaclinic.ultra-violet.codes/api/doctors`, doctorSpec !== null ? { specialityFilter: doctorSpec, doctorFilter: '' } : undefined, searchParams);

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
                customClass='btn back-to-top'
                text={labels?.buttons.back}
                onClick={backToTop}
            />
        </main>
    )
}

export default OurDoctors;