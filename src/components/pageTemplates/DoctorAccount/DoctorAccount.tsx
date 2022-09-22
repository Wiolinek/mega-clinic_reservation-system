import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from 'Context';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Loader from 'components/Loader/Loader';
import { VisitType } from 'types/visit';
import useFetch from 'helpers/useFetch';

import './DoctorAccount.scss';


interface Visits {
    data: VisitType[] | null;
    loading: boolean;
    error: string | null;
}


const DoctorAccount: React.FC = () => {
    const { user, labels } = useContext(MyContext)
    const [doctorId, setDoctorId] = useState<React.SetStateAction<String>>(JSON.parse(window.localStorage.getItem('user') || '{}').id)
    const navigate = useNavigate();

    const visitsData: Visits = useFetch(`http://localhost:3030/api/visits`, { doctorId: doctorId, dateFilter: null }, doctorId);
    // const visitsData: Visits = useFetch(`https://megaclinic.ultra-violet.codes/api/visits`, { doctorId: doctorId, dateFilter: null }, doctorId);

    const visitsList = visitsData?.data?.map((visit: VisitType) => {
        const date = new Date(visit.date);
    
        return <li key={visit.id} className='doctor-account__visits-list--item'>
            <div className='doctor-account__visits-list--header'>
                <p>{labels?.doctorAccount.date}</p>
                <p>{labels?.doctorAccount.hour}</p>
                <p>{labels?.doctorAccount.pacient}</p>
                <p>{labels?.personalData.email}</p>
                <p>{labels?.personalData.phone}</p>
            </div>
            <div className='doctor-account__visits-list--pacient-data'>
                <p>{date.toLocaleDateString('sv')}</p>
                <p>{visit.time.substring(0, 5)}</p>
                <p>{visit.pacientName}</p>
                <p>{visit.pacientEmail}</p>
                <p>{visit.pacientPhone}</p>
            </div>
        </li>
    })

    const content: React.ReactNode = <>
        <h2>{`${labels?.doctorAccount.greetings} ${user?.name || JSON.parse(window.localStorage.getItem('user') || '{}').name}`}</h2>
        <div className='doctor-account__filters'>
            <h3>{labels?.doctorAccount.yourVisits}</h3>
            <p>{labels?.doctorAccount.visitsFound}<span>{visitsList?.length}</span></p>
        </div>
        <article>
            {(visitsData?.loading && labels) &&
                <Loader message={labels?.loaders.list} />
            }
            <ol className='doctor-account__visits-list'>
                {visitsList}
            </ol>
        </article>
    </>

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
                {doctorId ? content : errorAuthenticationMsg}
            </GenericSection>
        </main>
    )
}

export default DoctorAccount;