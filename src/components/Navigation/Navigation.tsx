import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from 'components/Menu/Menu';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from 'Context';

import './Navigation.scss';


const Navigation: React.FC = () => {
    const { language, setLanguage } = useContext(MyContext)
    const [isOpen, setOpen] = useState(false);

    const toggleMenuHandler = () => setOpen(!isOpen)

    const toggleLanguage = () => setLanguage?.(language === 'pl' ? 'en' : 'pl')

    const closeMenu = () => setOpen(false)

    useEffect(() => {
        const closeMenu = () => setOpen(false);

        window.addEventListener('resize', closeMenu)
        return () => window.removeEventListener('resize', closeMenu)
    })

    return (
        <header>
            <nav>
                <div className='logo'>
                    <NavLink to='/'
                        onClick={closeMenu}>
                            <FontAwesomeIcon icon={faStethoscope}/>MegaClinic
                    </NavLink>
                </div>
                <Menu isOpen={isOpen}
                    setOpen={setOpen}
                    closeMenu={closeMenu}
                />
                <div className='buttons-group'>
                    <ButtonLink type='button'
                        icon={isOpen ? <FontAwesomeIcon icon={faXmark}/> : <FontAwesomeIcon icon={faBars}/>}
                        customClass='menu-btn'
                        onClick={toggleMenuHandler}
                    />
                    <ButtonLink type='button'
                        text={language === 'pl' ? 'ENG' : 'PL'}
                        customClass='lang-btn'
                        onClick={toggleLanguage}
                    />
                </div>
            </nav>
        </header>
    )
}

export default Navigation;