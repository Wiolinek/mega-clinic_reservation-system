// import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// import { useSelector } from 'react-redux';
// import { selectItemsQuantity } from '../redux/cartSlice';

// import Menu from './Menu';

import '../Footer/Footer.css';


const Footer: React.FC = () => {

    const year: number = new Date().getFullYear()
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
        <footer>
            <div>
                <p>{`Copyright \u00A9 ${year} Wiola Polok www.u-v.codes. All Rights Reserved`}</p>
            </div>
        </footer>
    )
}

export default Footer;