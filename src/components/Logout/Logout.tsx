import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { MyContext } from 'Context';


const Logout: React.FC = () => {
    const { setUser, labels } = useContext(MyContext)
    const navigate = useNavigate();

    const content: React.ReactNode = <>
        <h2>{labels?.logoutPage.header}</h2>
        <p>{labels?.redirects.redirectLoginPage}</p>
    </>

    useEffect(() => {
        // fetch(`https://megaclinic.ultra-violet.codes/api/logout`, {
        fetch(`http://localhost:3030/api/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        .then(res => {
            res.ok &&
            window.localStorage.removeItem('user');
            setUser?.({user: ''})
            setTimeout(() => {
                navigate('../', { replace: true })
            }, 1200)
        })
        .catch(error => console.log(`error ${error}`))
    },[])

    
    return (
        <main>
            <GenericSection
                children={content}
                customClass='login__section'
            />
        </main>
    )
}

export default Logout;