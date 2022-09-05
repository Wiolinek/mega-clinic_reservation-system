import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericSection from 'components/common/GenericSection/GenericSection';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { MyContext } from 'Context';

import './Login.scss'


const LogIn: React.FC = () => {
    const { setUser, labels } = useContext(MyContext)
    const navigate = useNavigate();
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
            setUser?.({ 'id': res.id, 'name': res.name })
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
        <h2>{labels?.loginPage.header}</h2>
        <form className='login__form' onSubmit={onSubmit}>
            <label>{labels?.loginPage.login}
                <input type='text'
                    name='username'
                    value={userData.username}
                    onChange={inputHandler}
                    required>
                </input>
            </label>
            <label>{labels?.loginPage.password}
                <input type='password'
                    name='password'
                    value={userData.password}
                    onChange={inputHandler}
                    required>
                </input>
            </label>
            <ButtonLink type='submit'
                customClass='btn'
                text={labels?.buttons.login}
            />
        </form>
    </>

    const errorMsg = <>
        <h2>{labels?.loginPage.errorHeader}</h2>
        <p>{labels?.loginPage.errorMsg}</p>
    </>

    return (
        <main>
            {
                error &&
                <GenericSection customClass='login__section error'>
                    {errorMsg}
                </GenericSection>
            }
            <GenericSection customClass='login__section'>
                {loginForm}
            </GenericSection>
        </main>
    )
}

export default LogIn;