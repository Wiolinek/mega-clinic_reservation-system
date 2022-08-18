import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from 'components/Menu/Menu';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import './Navigation.css';


const Navigation: React.FC = () => {
    const [isOpen, setOpen] = useState(false);

    const toggleMenuHandler = () => {
        setOpen(!isOpen)
    };

    useEffect(() => {
        const closeMenu = () => setOpen(false);

        window.addEventListener('resize', closeMenu)
        return () => window.removeEventListener('resize', closeMenu)
    })

    return (
        <header>
            <nav>
                <div className='logo'>
                    <NavLink to='/' onClick={() => setOpen(false)}><FontAwesomeIcon icon={faStethoscope}/>MegaClinic</NavLink>
                </div>
                <Menu isOpen={isOpen} setOpen={setOpen} />
                <ButtonLink type='button' icon={isOpen ? <FontAwesomeIcon icon={faXmark}/> : <FontAwesomeIcon icon={faBars}/>} customClass='menu-btn' onClick={toggleMenuHandler}/>
            </nav>
        </header>
    )
}

export default Navigation;