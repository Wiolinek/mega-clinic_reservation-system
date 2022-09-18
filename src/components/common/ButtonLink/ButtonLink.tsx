import { NavLink } from 'react-router-dom';

import './ButtonLink.scss';

interface Props {
    customClass?: string;
    text?: string;
    type?: string;
    target?: string;
    icon?: React.ReactNode;
    aria?: string;
    onClick?: () => void;
    disabled?: boolean;
}


const Button: React.FC<Props> = ({customClass, text, type, target, icon, aria, onClick, disabled}) => {


    return (
        type === 'button' || type === 'submit' ? 
            <button type={type}
                className={customClass}
                onClick={onClick}
                disabled={disabled}
                aria-label={aria}
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