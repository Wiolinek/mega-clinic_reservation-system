import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MyContext } from 'Context';

import './Menu.css';


interface Props {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    closeMenu: React.MouseEventHandler<HTMLAnchorElement>;
}


const Menu: React.FC<Props> = ({ isOpen, setOpen, closeMenu }) => {
    const { user, labels } = useContext(MyContext)

    


    return (
        <ul className={`nav__menu ${isOpen ? 'mobile-menu' : ''}`}> 
            <li className='nav__item'>
                <NavLink to='/our-doctors'
                    onClick={closeMenu}
                >
                    {labels?.menu.ourDoctors}
                </NavLink>
            </li>
            <li className='nav__item nav__item--reservation'>
                <NavLink to='/reservation'
                    onClick={closeMenu}
                >
                    {labels?.menu.bookVisit}
                </NavLink>
            </li>
            {
                user?.id ?
                <>
                    <li className='nav__item nav__item--doctor-zone'>
                        <NavLink to='/doctor-account'
                            onClick={closeMenu}
                        >
                            {labels?.menu.myAccount}
                        </NavLink>
                    </li>
                    <li className='nav__item nav__item--doctor-zone'>
                        <NavLink to='/logout'>
                            {labels?.menu.logout}
                        </NavLink>
                    </li>
                </>
            :
                <li className='nav__item nav__item--doctor-zone'>
                    <NavLink to='/login'
                        onClick={closeMenu}
                    >
                        {labels?.menu.doctorAccount}
                    </NavLink>
                </li>
            }
        </ul>
    )
}

export default Menu;