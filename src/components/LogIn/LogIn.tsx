import React, { SyntheticEvent, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { MyContext } from 'Context';

import './Login.css'


const LogIn: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(MyContext)
    const [error, setError] = useState(false);
    const [userData, setUsername] = useState({
        username: '',
        password: ''
    });

    const inputHandler = (e: any) => {
        setUsername(dataItem => ({...dataItem, [e.target.name]: e.target.value}))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        
        // await fetch(`https://megaclinic.ultra-violet.codes/api/login`, {
        await fetch(`http://localhost:3030/api/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })
        .then(res => res.json())
        .then(res => {
            context.setUser?.({ 'id': res.id, 'name': res.name })
            window.localStorage.setItem('user', JSON.stringify({ 'id': res.id, 'name': res.name }))
            navigate('../doctor-account', { replace: true })
        })
        .catch(error => {
            setUsername({
                username: '',
                password: ''
            })
            setError(true)
        })
    };

    const loginForm: React.ReactNode = <>
        <h2>Zaloguj się</h2>
        <form className='login__form' onSubmit={onSubmit}>
            <label>Login:
                <input type='text'
                    name='username'
                    value={userData.username}
                    onChange={inputHandler}
                    required>
                </input>
            </label>
            <label>Hasło:
                <input type='password'
                    name='password'
                    value={userData.password}
                    onChange={inputHandler}
                    required>
                </input>
            </label>
            <ButtonLink type='submit'
                customClass='btn'
                text='Zaloguj'
            />
        </form>
    </>

    const errorMsg = <>
        <h2>Co poszło nie tak..</h2>
        <p>Spróbuj ponownie.</p>
        </>

    return (
        <main>
            {
                error &&
                <GenericSection
                    children={errorMsg}
                    customClass='login__section error'
                />
            }
            <GenericSection
                children={loginForm}
                customClass='login__section'
            />
        </main>
    )
}

export default LogIn;