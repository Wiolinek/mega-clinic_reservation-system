import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { MyContext } from 'Context';


const ErrorPage: React.FC = () => {
    const { labels } = useContext(MyContext)
    const navigate = useNavigate();

    const content: React.ReactNode = <>
        <h2>{labels?.errorPage.header}</h2>
        <p>{labels?.redirects.redirectHomePage}</p>
    </>

    useEffect(() => {
        setTimeout(() => {
            navigate('../', { replace: true })
        }, 2500)
    },[])

    
    return (
        <main>
            <GenericSection children={content} />
        </main>
    )
}

export default ErrorPage;