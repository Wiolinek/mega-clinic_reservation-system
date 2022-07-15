import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import GenericSection from '../common/GenericSection/GenericSection';
import ButtonLink from '../common/ButtonLink/ButtonLink'
import { myContext } from '../../Context';


const LogIn: React.FC = () => {
    const context = useContext(myContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        fetch(`http://localhost:3030/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password}),
            credentials: 'include',
        })
        .then(res => res.text())
        .then(() => console.log('udało się'))
        .catch(error => console.log(`error ${error}`))
    };

    const loginForm: React.ReactNode = <>
        <h2>Zaloguj się</h2>
        <form className='login__form' onSubmit={onSubmit}>
            <label>Login:<input type='text' name='login' required value={username} onChange={e => setUsername(e.target.value)}></input></label>
            <label>Hasło:<input type='password' name='password' required value={password} onChange={e => setPassword(e.target.value)}></input></label>
            <ButtonLink type='submit' customClass='btn' text='Zaloguj'/>
        </form>
    </>


    return (
        <main>
            <GenericSection children={context ? <Navigate to='/doctor-account' /> : loginForm} customClass='login__section' />
        </main>
    )
}

export default LogIn;