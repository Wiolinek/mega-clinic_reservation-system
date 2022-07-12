import React, { useEffect, useState } from 'react';

import GenericSection from "../GenericSection/GenericSection";


const LogIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetch(`http://localhost:3030/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'karolina.smith', password: 'smith!23' }),
            credentials: 'include',
        })
        .then(res => res.text())
        // .then(res => console.log(res))
        .then(() => console.log('udało się'))
        .catch(error => console.log(`error ${error}`))
    };

    console.log(username)
    console.log(password)

    // const getUser = () => {
    //     fetch(`http://localhost:3030/user`, { credentials: 'include' })
    //     .then(response => response.json())
    //     // .then(result => setSpecialitiesData(result))
    //     .catch(error => console.log(`error ${error}`))
    // }

    const form: React.ReactNode = <><h2>Zaloguj się</h2>
        <form className="login__form" onSubmit={e => onSubmit(e)}>
            <label>Login:<input type="text" name="login" required value={username} onChange={e => setUsername(e.target.value)}></input></label>
            <label>Hasło:<input type="password" name="password" required value={password} onChange={e => setPassword(e.target.value)}></input></label>
            <button className="login__btn" type="submit">Zaloguj</button>
        </form>
    </>

    return (
        <main>
            <GenericSection children={form} customClass='login__section' />
        </main>
    )
}

export default LogIn;