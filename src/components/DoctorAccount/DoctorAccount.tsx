import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../Context';
import GenericSection from '../common/GenericSection/GenericSection';
import { VisitType } from '../../types/visit';

import '../DoctorAccount/DoctorAccount.css';


const DoctorAccount: React.FC = () => {
    const context = useContext(myContext)
    const [visitsData, setVisitsData] = useState<VisitType[]>()
    const [doctorId, setDoctorId] = useState<String>()
    const navigate = useNavigate();

    useEffect(() => {
        const requestPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId: doctorId})
        };
        fetch(`http://localhost:3030/visits`, requestPost)
        .then(res => res.json())
        .then(result => setVisitsData(result))
        .catch(error => console.log(`error ${error}`))
    }, [doctorId, context]);

    const visitsList = visitsData?.map(visit => <li key={visit.id} className='doctor-account__visits-list--item'>
            <div className='doctor-account__visits-list--header'>
                <p>Data</p>
                <p>Godzina</p>
                <p>Pacjent</p>
                <p>Adres email</p>
                <p>Nr telefonu</p>
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
        <h2>{`Witaj, ${context?.name}`}</h2>
        <div className='doctor-account__filters'>
            <h3>Przejrzyj swoje wizyty</h3>
            <p>Znalezionych wizyt: <span>{visitsList?.length}</span></p>
        </div>
        
        <article>
            {/* <div className='doctor-account__visits-list--item'>
                <p>Data</p>
                <p>Godzina</p>
                <p>Pacjent</p>
                <p>Adres email</p>
                <p>Nr telefonu</p>
            </div> */}
            <ol className='doctor-account__visits-list'>
                {visitsList}
            </ol>
        </article>
    </>

    const errorAuthenticationMsg: React.ReactNode = <>
        <h2>Nie jesteś uprawniony do przeglądania tych zasobów</h2>
        <p>Za chwilę zostaniesz przekierowany do strony logowania</p>
    </>

    useEffect(() => {
        context && setDoctorId(context?.id);
    }, [])

    useEffect(() => {
        !context && 
        setTimeout(() => {
            navigate('../', { replace: true })
        }, 2000)
    },[context])


    return (
        <main>
            {<GenericSection children={context ? content : errorAuthenticationMsg} customClass='doctor-account__section' /> }
        </main>
    )
}

export default DoctorAccount;