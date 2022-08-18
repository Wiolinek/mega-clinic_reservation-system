import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CalendarComp from 'components/Calendar/Calendar';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'
import { PacientType } from 'types/pacient';
import { DoctorType } from 'types/doctor';

import './Form.css';

interface Props {
    specialitiesList: React.ReactNode[];
    doctorsData?: DoctorType[];
    timeList?: React.ReactNode[];
}


const Form: React.FC<Props> = ({ specialitiesList, doctorsData, timeList }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const defaultValue = '---';
    const [date, setDate] = useState<any>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<PacientType>({
        speciality: '',
        doctor: '',
        doctorId: '',
        date: date?.toLocaleDateString('sv') || '',
        time: '',
        pacientName: '',
        pacientEmail: '',
        pacientPhone: 0,
    });

    const doctorsList = doctorsData?.map(item => 
        <option key={item.doctor_id}
            value={item.doctor_id}
            label={item.name}
            selected={item.name === doctorName}
        >
            {item.name}
        </option>)

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(dataItem => ({
            ...dataItem,
            [e.target.name]: e.target.value,
            doctorId: e.target.selectedOptions[0].value,
            time: defaultValue}));
        setSearchParams(e.target.selectedOptions[0].label !== defaultValue ? {
            speciality: `${doctorSpec}`,
            [e.currentTarget.name]: e.target.selectedOptions[0].label
        } : {}
        );
    };

    const timeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => 
        setFormData(dataItem => ({
            ...dataItem,
            [e.target.name]: e.target.value
        })
    );

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => 
        setFormData(dataItem => ({
            ...dataItem,
            [e.target.name]: e.target.value
        })
    );

    const formHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        fetch(`http://localhost:3030/form`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({formData})
        })
        .catch(error => console.log(`error ${error}`));
        navigate('../success', { replace: true })
    };

    useEffect(() => {
        const doctor = doctorsData?.filter(doctor => doctor?.name === doctorName && doctor);
        doctorName && doctorSpec && setFormData({
            ...formData,
            speciality: doctorSpec,
            doctor: doctorName,
            doctorId: String(doctor?.[0].doctor_id) || '0',
            date: date?.toLocaleDateString('sv') || ''
        });
    }, [date, doctorName, doctorSpec]);
    

    return (
        <><h2>Zarezerwuj wizytę</h2>
        <form className='reservation__form' onSubmit={formHandler}>
            <div>
                <label>Wybierz specjalizację:
                    <select name='speciality'
                        onChange={selectHandler}
                        required>
                        <option key={defaultValue} value='' >{defaultValue}</option>
                        {specialitiesList}
                    </select>
                    <span>np. pediatra</span>
                </label>
                <label>Wybierz lekarza:
                    <select name='doctor'
                        onChange={selectHandler}
                        required>
                        <option key={defaultValue} value='' label={defaultValue}>{defaultValue}</option>
                        {doctorsList}
                    </select>
                    <span>np. Adam Kowalski</span>
                </label>
                <label>Wybierz datę z kalendarza:
                    <input name='date'
                        className='date-input'
                        value={'' || date?.toLocaleDateString('pl-PL')}
                        onChange={e => setFormData(dataItem => ({...dataItem, [e.target.name]: date.toLocaleDateString('sv')}))}
                        required>
                    </input>
                    <CalendarComp date={date} setDate={setDate}/>
                </label>
                <label>Wybierz godzinę:
                    <select name='time'
                        onChange={timeSelectHandler}
                        required>
                        <option key={defaultValue} value='' selected>{defaultValue}</option>
                        {timeList}
                    </select>
                    <span>np. 7:30</span>
                </label>
                <label>Imię i nazwisko:
                    <input type='text' name='pacientName'
                        pattern='[a-zA-Z]+[ ][a-zA-Z]+'
                        onChange={inputHandler}
                        readOnly
                        required>
                    </input>
                    <span>np. Anna Nowak</span>
                </label>
                <label>Adres email:
                    <input type='email' name='pacientEmail'
                        onChange={inputHandler}
                        required>
                    </input>
                    <span>np. anna.nowak@email.pl</span>
                </label>
                <label>Numer telefonu:
                    <input type='tel' name='pacientPhone'
                        pattern='[0-9]{9}'
                        onChange={inputHandler}
                        required>
                    </input>
                    <span>np. 123456789</span>
                </label>
            </div>
            <ButtonLink type='submit' customClass='btn reservation__form-btn' text='Wyślij'/>
        </form>
    </>
    )
}

export default Form;