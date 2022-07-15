import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from '../common/GenericSection/GenericSection';


const SuccesForm: React.FC = () => {
    const navigate = useNavigate();

    const content: React.ReactNode = <>
        <h2>Otrzymaliśmy Twoją rezerwację.</h2>
        <h3>Dziękujemy za skorzystanie z naszych usług i zapraszamy na wizytę w zarezerwowanym terminie.</h3>
        <p>Za chwilę zostaniesz przekierowany na stronę główną.</p>
    </>

    useEffect(() => {
        setTimeout(() => {
            navigate('../', { replace: true })
        }, 4000)
    },[])

    
    return (
        <main>
            <GenericSection children={content} customClass='login__section' />
        </main>
    )
}

export default SuccesForm;