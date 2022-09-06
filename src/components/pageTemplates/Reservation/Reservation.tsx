import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Form from 'components/Form/Form';
import { DoctorType } from 'types/doctor';
import { SpecialityType } from 'types/speciality';
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


const Reservation: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const [chosenDoctor, setChosenDoctor] = useState<DoctorType[]>();

    const specialitiesData: Specialities = useFetch(`http://localhost:3030/api/specialities`);

    const requestPost = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ specialityFilter: doctorSpec })
    };

    const doctorsData: Doctors = useFetch(`http://localhost:3030/api/doctors`, doctorSpec !== '' ? requestPost : undefined, doctorSpec);

    const specialitiesList = Array.from(new Set(specialitiesData?.data?.map((item: any) => item.speciality)))?.map((filter: any) => 
        <option key={filter}
            value={filter}
            label={filter}
            selected={doctorSpec === filter}
        >
            {filter}
        </option>
    )

    return (
        <main>
            <GenericSection customClass='login__section'>
                <Form
                    specialitiesList={specialitiesList}
                    doctorsData={doctorsData.data}
                    chosenDoctor={chosenDoctor}
                    setChosenDoctor={setChosenDoctor}
                />
            </GenericSection>
        </main>
    )
}

export default Reservation;