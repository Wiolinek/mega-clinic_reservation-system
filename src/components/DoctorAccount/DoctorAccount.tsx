import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from 'Context';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { VisitType } from 'types/visit';
import Loader from 'components/Loader/Loader';

import './DoctorAccount.css';


const DoctorAccount: React.FC = () => {
    const context = useContext(MyContext)
    const [visitsData, setVisitsData] = useState<VisitType[]>()
    const [doctorId, setDoctorId] = useState<String>(JSON.parse(window.localStorage.getItem('user') || '{}').id)
    const navigate = useNavigate();

    useEffect(() => {
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
        <h2>{`Witaj, ${context?.user?.name || JSON.parse(window.localStorage.getItem('user') || '{}').name}`}</h2>
        <div className='doctor-account__filters'>
            <h3>Przejrzyj swoje wizyty</h3>
            <p>Znalezionych wizyt: <span>{visitsList?.length}</span></p>
        </div>
        <article>
            {!visitsData && <Loader message='Trwa ładowanie listy..' />}
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
        !doctorId && 
        setTimeout(() => {
            navigate('../login')
        }, 2000)
    },[doctorId])


    return (
        <main>
            {
                doctorId ?
                    <GenericSection
                        children={content}
                        customClass='doctor-account__section'
                    />
                :
                    <GenericSection
                        children={errorAuthenticationMsg}
                        customClass='doctor-account__section'
                    /> 
            }
        </main>
    )
}

export default DoctorAccount;