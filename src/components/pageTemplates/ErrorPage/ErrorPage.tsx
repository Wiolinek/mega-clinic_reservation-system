import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { MyContext } from 'Context';


const ErrorPage: React.FC = () => {
    const { labels } = useContext(MyContext)
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('../', { replace: true })
        }, 2500)
    },[])

    
    return (
        <main>
            <GenericSection>
                <h2>{labels?.errorPage.header}</h2>
                <p>{labels?.redirects.redirectHomePage}</p>
            </GenericSection>
        </main>
    )
}

export default ErrorPage;