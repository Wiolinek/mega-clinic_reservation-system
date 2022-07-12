import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { myContext } from '../../Context';

import '../Navigation/Navigation.css';

const Navigation: React.FC = () => {
const context = useContext(myContext)
    
    return (
        <header>
            <nav>
                <div className='logo' 
                >
                    <NavLink to='/'><FontAwesomeIcon icon={faStethoscope} />MegaClinic</NavLink>
                    </div>
                <ul className='nav__menu'>
                    <li className='nav__item'>
                        <NavLink to='/about-us'>O nas</NavLink>
                    </li>
                    <li className='nav__item'>
                        <NavLink to='/our-doctors'>Nasi lekarze</NavLink>
                    </li>
                    <li className='nav__item'>
                        <NavLink to='/contact'>Kontakt</NavLink>
                    </li>
                    <li className='nav__item nav__item--reservation'>
                        <NavLink to='/reservation'>Zarezerwuj wizytę</NavLink>
                    </li>
                    {context ?
                    <>
                        <li className='nav__item nav__item--doctor-zone'>
                            <NavLink to='/user'>Moje konto</NavLink>
                        </li>
                        <li className='nav__item nav__item--doctor-zone'>
                            <NavLink to='/logout'>Wyloguj się</NavLink>
                        </li>
                    </>
                    :
                    <li className='nav__item nav__item--doctor-zone'>
                        <NavLink to='/login'>Strefa lekarza</NavLink>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;