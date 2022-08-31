import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import { MyContext } from 'Context';


const Logout: React.FC = () => {
    const context = useContext(MyContext)
    const navigate = useNavigate();

    const content: React.ReactNode = <>
        <h2>Trwa wylogowywanie.</h2>
        <p>Za chwilę zostaniesz przekierowany na stronę główną.</p>
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
            context.setUser?.({user: ''})
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