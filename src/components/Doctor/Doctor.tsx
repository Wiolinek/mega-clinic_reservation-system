import ButtonLink from 'components/common/ButtonLink/ButtonLink';

import './Doctor.css'

import { DoctorType } from 'types/doctor'


const Doctor = (props: DoctorType) => {

    return (
        <li className='doctor__item'>
            <div className='doctor__item--picture'>
                <img src={props.photo}></img>
            </div>
            <div className='doctor__item--details'>
                <div className='doctor__item--description'>
                    
                    <h2>{props.name}</h2>
                    <p>{props.description}</p>
                    <div>
                        <h3>Specjalizacja</h3>
                        <p>{props.speciality}</p>
                    </div>
                    <div>
                        <h3>Godziny przyjęć</h3>
                        <p>{props.working_hours_start?.substring(0, 5)} - {props.working_hours_end?.substring(0, 5)}</p>
                    </div>
                </div>
                <ButtonLink text='Zarezerwuj wizytę' target={`/reservation/?speciality=${props.speciality}&doctor=${props.name}`}/>
            </div>
        </li>
    )
}

export default Doctor;