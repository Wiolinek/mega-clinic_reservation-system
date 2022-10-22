import { useContext } from 'react';
import { MyContext } from 'Context';
import { VisitType } from 'types/visit';


interface Props {
    visit: VisitType;
}


const Visit: React.FC<Props> = ({ visit }) => {
    const { labels } = useContext(MyContext)
    

    return (
        <li key={visit.id} className='doctor-account__visits-list--item'>
            <div className='doctor-account__visits-list--header'>
                <p>{labels?.doctorAccount.date}</p>
                <p>{labels?.doctorAccount.hour}</p>
                <p>{labels?.doctorAccount.pacient}</p>
                <p>{labels?.personalData.email}</p>
                <p>{labels?.personalData.phone}</p>
            </div>
            <div className='doctor-account__visits-list--pacient-data'>
                <p>{visit.date.toLocaleString('sv').substring(0, 10)}</p>
                <p>{visit.time.substring(0, 5)}</p>
                <p>{visit.pacientName}</p>
                <p>{visit.pacientEmail}</p>
                <p>{visit.pacientPhone}</p>
            </div>
        </li>
    )
}

export default Visit;