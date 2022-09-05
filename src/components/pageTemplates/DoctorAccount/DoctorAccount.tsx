import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from 'Context';
import GenericSection from 'components/common/GenericSection/GenericSection';
import Loader from 'components/Loader/Loader';
import { VisitType } from 'types/visit';

import './DoctorAccount.scss';


const DoctorAccount: React.FC = () => {
    const { user, labels } = useContext(MyContext)
    const [visitsData, setVisitsData] = useState<VisitType[]>()
    const [doctorId, setDoctorId] = useState<String>(JSON.parse(window.localStorage.getItem('user') || '{}').id)
    const navigate = useNavigate();

    useEffect(() => {
        !doctorId &&
        // fetch(`https://megaclinic.ultra-violet.codes/api/user-account`, { credentials: 'include' }, headers: { 'Content-Type': 'application/json' })
        fetch(`http://localhost:3030/api/user-account`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .catch(error => console.log(`error ${error}`))
    }, []);

    useEffect(() => {
        const requestPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId: doctorId, dateFilter: null })
        };
        // fetch(`https://megaclinic.ultra-violet.codes/api/visits`, requestPost)
        fetch(`http://localhost:3030/api/visits`, requestPost)
        .then(res => res.json())
        .then(res => setVisitsData(res))
        .catch(error => console.log(`error ${error}`))
    }, [doctorId]);

    const visitsList = visitsData?.map(visit =>
        <li key={visit.id} className='doctor-account__visits-list--item'>
            <div className='doctor-account__visits-list--header'>
                <p>{labels?.doctorAccount.date}</p>
                <p>{labels?.doctorAccount.hour}</p>
                <p>{labels?.doctorAccount.pacient}</p>
                <p>{labels?.personalData.email}</p>
                <p>{labels?.personalData.phone}</p>
            </div>
            <div className='doctor-account__visits-list--pacient-data'>
                <p>{visit.date.substring(0, 10)}</p>
                <p>{visit.time.substring(0, 5)}</p>
                <p>{visit.pacientName}</p>
                <p>{visit.pacientEmail}</p>
                <p>{visit.pacientPhone}</p>
            </div>
        </li>
    )

    const content: React.ReactNode = <>
        <h2>{`Witaj, ${user?.name || JSON.parse(window.localStorage.getItem('user') || '{}').name}`}</h2>
        <div className='doctor-account__filters'>
            <h3>{labels?.doctorAccount.yourVisits}</h3>
            <p>{labels?.doctorAccount.visitsFound}<span>{visitsList?.length}</span></p>
        </div>
        <article>
            {(!visitsData && labels) &&
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