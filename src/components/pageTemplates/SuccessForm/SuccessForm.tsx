import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { MyContext } from 'Context';

import './SuccessForm.scss'

const SuccesForm: React.FC = () => {
    const { labels } = useContext(MyContext)
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('../', { replace: true })
        }, 4500)
    },[])

    
    return (
        <main>
            <GenericSection>
                <h2>{labels?.successForm.header}</h2>
                <h3>{labels?.successForm.successMsg}</h3>
                <p>{labels?.redirects.redirectHomePage}</p>
            </GenericSection>
        </main>
    )
}

export default SuccesForm;