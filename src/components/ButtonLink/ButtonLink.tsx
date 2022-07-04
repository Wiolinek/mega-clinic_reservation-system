// import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// import Banner from "../Banner/Banner";

import '../ButtonLink/ButtonLink.css';

interface Props {
    customClass?: string;
    text: string;
    type?: string;
    target?: string;
    onClick?: () => void;
}


const Button: React.FC<Props> = ({customClass, text, type, target, onClick}) => {


    return (
        type === 'button' ? 
            <button className={customClass} onClick={onClick}>{text}</button> : 
            <NavLink to={target || '/'} className='button-link' >{text}</NavLink>
    )
}

export default Button;