import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from '../common/GenericSection/GenericSection';

import '../ErrorPage/ErrorPage.css';


const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const content: React.ReactNode = <>
        <h2>Ooooops... Wygląda na to że nie mamy takiej strony w naszych zasobach.</h2>
        <p>Za chwilę zostaniesz przekierowany na stronę główną.</p>
    </>

    useEffect(() => {
        setTimeout(() => {
            navigate('../', { replace: true })
        }, 4000)
    },[])

    
    return (
        <main>
            <GenericSection children={content} />
        </main>
    )
}

export default ErrorPage;