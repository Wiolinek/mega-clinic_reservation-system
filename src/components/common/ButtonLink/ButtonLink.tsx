import { NavLink } from 'react-router-dom';

import './ButtonLink.css';

interface Props {
    customClass?: string;
    text?: string;
    type?: string;
    target?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}


const Button: React.FC<Props> = ({customClass, text, type, target, icon, onClick}) => {


    return (
        type === 'button' || type === 'submit' ? 
            <button type={type}
                className={customClass}
                onClick={onClick}
            >
                {text}{icon}
            </button>
            : 
            <NavLink to={target || '/'}
                className='btn'
            >
                {text}
            </NavLink>
    )
}

export default Button;