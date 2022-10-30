import { useContext } from 'react';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'
import { MyContext } from 'Context';
import { VisitType } from 'types/visit';

import './VisitItem.scss';


interface Props {
    visit: VisitType;
}


const Visit: React.FC<Props> = ({ visit }) => {
    const { labels } = useContext(MyContext)
    

    return (
        <li key={visit.id} className='doctor-account__list--item'>
            <p>{visit.date.toLocaleString('sv').substring(0, 10)}</p>
            <p>{visit.time.substring(0, 5)}</p>
            <p className='doctor-account__list--item-name'>{visit.patientName}</p>
            <ButtonLink
                text={labels?.buttons.visitDetails}
                target={`/doctor-account?visit=${visit.id}`}
                customClass='blue-btn'
            />
        </li>
    )
}

export default Visit;