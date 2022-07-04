// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';

// import { useSelector } from 'react-redux';
// import { selectItemsQuantity } from '../redux/cartSlice';

// import Menu from './Menu';

import '../GenericSection/GenericSection.css';

interface Props {
    children: React.ReactNode;
    customClass?: string;
}


const GenericSection: React.FC<Props> = ({children, customClass}) => {
    
    
    return (
        <section className={customClass}>
            {children}
        </section>
    )
}

export default GenericSection;