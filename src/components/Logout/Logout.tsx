import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from '../common/GenericSection/GenericSection';
import { myContext } from '../../Context';


const Logout: React.FC = () => {
    const context = useContext(myContext)
    const navigate = useNavigate();

    const content: React.ReactNode = <>
        <h2>Trwa wylogowywanie.</h2>
        <p>Za chwilę zostaniesz przekierowany na stronę główną.</p>
    </>

    useEffect(() => {
        fetch(`http://localhost:3030/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        .catch(error => console.log(`error ${error}`))
    },[])

    useEffect(() => {
        context?.setUser?.(false)
        setTimeout(() => {
            navigate('../', { replace: true })
        }, 2000)
    },[])


    return (
        <main>
            <GenericSection children={content} customClass='login__section' />
        </main>
    )
}

export default Logout;