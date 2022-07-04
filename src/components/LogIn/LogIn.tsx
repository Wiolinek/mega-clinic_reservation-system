// import { useEffect, useState } from 'react';

import GenericSection from "../GenericSection/GenericSection";


const LogIn: React.FC = () => {

    const form: React.ReactNode = <><h2>Zaloguj się</h2>
        <form className="login__form">
            <label>Login:<input type="text" name="login" required></input></label>
            <label>Hasło:<input type="password" name="password" required></input></label>
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