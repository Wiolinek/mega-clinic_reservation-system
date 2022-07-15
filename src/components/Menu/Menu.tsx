import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { myContext } from '../../Context';

import '../Menu/Menu.css';


interface Props {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const Menu: React.FC<Props> = ({ isOpen, setOpen }) => {
    const context = useContext(myContext)

    const logout = () => {
        fetch(`http://localhost:3030/logout`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        .catch(error => console.log(`error ${error}`));
        setOpen(false)
    }
    

    return (
        <ul className={`nav__menu ${isOpen ? 'mobile-menu' : ''}`}>
            <li className='nav__item'>
                <NavLink to='/our-doctors' onClick={() => setOpen(false)}>Nasi lekarze</NavLink>
            </li>
            <li className='nav__item nav__item--reservation'>
                <NavLink to='/reservation' onClick={() => setOpen(false)}>Zarezerwuj wizytę</NavLink>
            </li>
            {context ?
            <>
                <li className='nav__item nav__item--doctor-zone'>
                    <NavLink to='/doctor-account' onClick={() => setOpen(false)}>Moje konto</NavLink>
                </li>
                <li className='nav__item nav__item--doctor-zone'>
                    <NavLink to='/logout' onClick={logout}>Wyloguj się</NavLink>
                </li>
            </>
            :
            <li className='nav__item nav__item--doctor-zone'>
                <NavLink to='/login' onClick={() => setOpen(false)}>Strefa lekarza</NavLink>
            </li>}
        </ul>
    )
}

export default Menu;