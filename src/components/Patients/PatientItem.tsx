import { useContext } from 'react';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'
import { MyContext } from 'Context';
import { PatientType } from 'types/patient';


interface Props {
    patient: PatientType | undefined;
}


const PatientItem: React.FC<Props> = ({ patient }) => {
    const { labels } = useContext(MyContext)
    

    return (
        <li className='doctor-account__list--item'>
            <p className='doctor-account__list--item-name'>{patient?.patientName}</p>
            <p>{patient?.patientEmail}</p>
            <p>{patient?.patientPhone}</p>
            <ButtonLink
                text={labels?.buttons.patientCard}
                target={`/doctor-account?patient=${patient?.id}`}
                customClass='blue-btn'
            />
        </li>
    )
}

export default PatientItem;