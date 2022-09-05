import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { MyContext } from 'Context';


const SuccesForm: React.FC = () => {
    const { labels } = useContext(MyContext)
    const navigate = useNavigate();

    const content: React.ReactNode = <>
        <h2>{labels?.successForm.header}</h2>
        <h3>{labels?.successForm.successMsg}</h3>
        <p>{labels?.redirects.redirectLoginPage}</p>
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