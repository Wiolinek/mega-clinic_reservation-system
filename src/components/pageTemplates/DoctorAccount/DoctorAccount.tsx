import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';
import GenericSection from 'components/common/GenericSection/GenericSection';
import VisitsContent from 'components/Visits/VisitsContent';
import PacientDetails from 'components/PacientDetails/PacientDetails';
import { VisitsType } from 'types/visit';
import useFetch from 'helpers/useFetch';

import './DoctorAccount.scss';


const DoctorAccount: React.FC = () => {
    const { labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const pacient = searchParams.get('pacient');
    const [doctorId, setDoctorId] = useState<React.SetStateAction<String>>(JSON.parse(window.localStorage.getItem('user') || '{}').id)
    const navigate = useNavigate();

    const visitsData: VisitsType = useFetch(`http://localhost:3030/api/visits`, { doctorId: doctorId, dateFilter: null }, doctorId);
    // const visitsData: VisitsType = useFetch(`https://megaclinic.ultra-violet.codes/api/visits`, { doctorId: doctorId, dateFilter: null }, doctorId);

    useEffect(() => {
        !doctorId && 
        setTimeout(() => {
            navigate('../login')
        }, 2000)
    },[doctorId])


    return (
        <main>
            <GenericSection customClass='doctor-account'>
                {
                    (doctorId && !pacient) && 
                        <VisitsContent visitsData={visitsData} />
                }
                {
                    (!doctorId) &&
                        <>
                            <h2>{labels?.doctorAccount.unauthorized}</h2>
                            <p>{labels?.redirects.redirectLoginPage}</p>
                        </>
                }
                {
                    (doctorId && pacient) &&
                        <PacientDetails pacientId={pacient} />
                }
            </GenericSection>
        </main>
    )
}

export default DoctorAccount;