import { useContext } from 'react';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { MyContext } from 'Context';
import { DoctorType } from 'types/doctor'

import './Doctor.scss'


const Doctor = (props: DoctorType) => {
    const { labels } = useContext(MyContext)

    return (
        <li className='doctor__item'>
            <div className='doctor__item--picture'>
                <img src={props.photo} alt={`portrait of ${props?.name}`}></img>
            </div>
            <div className='doctor__item--details'>
                <div className='doctor__item--description'>
                    
                    <h2>{props.name}</h2>
                    <p>{props.description}</p>
                    <div>
                        <h3>{labels?.doctor.specialization}</h3>
                        <p>{props.speciality}</p>
                    </div>
                    <div>
                        <h3>{labels?.doctor.hours}</h3>
                        <p>{props.working_hours_start?.substring(0, 5)} - {props.working_hours_end?.substring(0, 5)}</p>
                    </div>
                </div>
                <ButtonLink
                    text={labels?.buttons.bookVisit}
                    target={`/reservation/?speciality=${props.speciality}&doctor=${props.name}`}
                />
            </div>
        </li>
    )
}

export default Doctor;