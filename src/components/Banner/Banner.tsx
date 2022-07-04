import { useEffect, useState } from 'react';

import '../Banner/Banner.css';


const Banner: React.FC = () => {
    
    return (
        <article className='banner'>
            <picture>
                <img src='../../images/banner_hp.jpg'></img>
            </picture>
        </article>
    )
}

export default Banner;