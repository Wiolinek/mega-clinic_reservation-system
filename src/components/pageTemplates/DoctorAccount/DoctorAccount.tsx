import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from 'Context';
import GenericSection from 'components/common/GenericSection/GenericSection';
import VisitsContent from './VisitsContent';
import { VisitsType } from 'types/visit';
import useFetch from 'helpers/useFetch';

import './DoctorAccount.scss';


const DoctorAccount: React.FC = () => {
    const { labels } = useContext(MyContext)
    const [doctorId, setDoctorId] = useState<React.SetStateAction<String>>(JSON.parse(window.localStorage.getItem('user') || '{}').id)
    const navigate = useNavigate();

    const visitsData: VisitsType = useFetch(`http://localhost:3030/api/visits`, { doctorId: doctorId, dateFilter: null }, doctorId);
    // const visitsData: VisitsType = useFetch(`https://megaclinic.ultra-violet.codes/api/visits`, { doctorId: doctorId, dateFilter: null }, doctorId);

    const errorAuthenticationMsg: React.ReactNode = <>
        <h2>{labels?.doctorAccount.unauthorized}</h2>
        <p>{labels?.redirects.redirectLoginPage}</p>
    </>

    useEffect(() => {
        !doctorId && 
        setTimeout(() => {
            navigate('../login')
        }, 2000)
    },[doctorId])


    return (
        <main>
            <GenericSection customClass='doctor-account__section'>
                {
                    doctorId ? 
                        <VisitsContent visitsData={visitsData} />
                    :
                        errorAuthenticationMsg
                }
            </GenericSection>
        </main>
    )
}

export default DoctorAccount;