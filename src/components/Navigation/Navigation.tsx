// import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'

import '../Navigation/Navigation.css';

const Navigation: React.FC = () => {


    // const [menuState, setMenuState] = useState(false);
    // const itemsQuantity = useSelector(selectItemsQuantity);
    
    // const showHideMenuHandler = () => {
    //     setMenuState(!menuState);
    // }

    // const hideMenuHandler = () => {
    //     if(window.innerWidth > 1180 && menuState === true) {
    //         setMenuState(false);   
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener("resize", hideMenuHandler);
    // });
    
    
    return (
        <nav>
            <div className='logo' 
            // onClick={(menuState) ? (() => setMenuState(false)) : null}
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
                <li className='nav__item nav__item--doctor-zone'>
                    <NavLink to='/login'>Strefa lekarza</NavLink>
                </li>
            </ul>
            {/* <Menu menuState={menuState} setMenuState={setMenuState}/> */}
        </nav>
    )
}

export default Navigation;