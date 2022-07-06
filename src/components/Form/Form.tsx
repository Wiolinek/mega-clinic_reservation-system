import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PacientType } from '../../types/pacient'

import '../Form/Form.css';

interface Props {
    specialitiesList: React.ReactNode[];
    doctorsList?: React.ReactNode[];
    timeList?: React.ReactNode[];
}


const Form: React.FC<Props> = ({ specialitiesList, doctorsList, timeList }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const defaultValue = '---';
    const [formData, setFormData] = useState<PacientType>({
        speciality: '',
        doctor: '',
        date: '',
        time: '',
        pacientName: '',
        pacientEmail: '',
        pacientPhone: 0,
    });

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(dataItem => ({...dataItem, [e.target.name]: e.target.value}));
        setSearchParams(e.target.selectedOptions[0].value !== defaultValue ? {speciality: `${doctorSpec}`, [e.currentTarget.name]: e.target.selectedOptions[0].value} : {})
    };

    const timeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(dataItem => ({...dataItem, [e.target.name]: e.target.value}));
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(dataItem => ({...dataItem, [e.target.name]: e.target.value}));
    };

    const formHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(formData)
        fetch(`http://localhost:3030/form`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({formData})
        })
        .catch(error => console.log(`error ${error}`))
    };
    
    useEffect(() => {
        doctorName && doctorSpec && setFormData({...formData,  speciality: doctorSpec, doctor: doctorName});
    }, []);
    

    return (
        <><h2>Zarezerwuj wizytę</h2>
        <form className='login__form' onSubmit={e => formHandler(e)}>
            <div>
                <div>
                    <label>Wybierz specjalizację:
                        <select name='speciality' required onChange={selectHandler}>
                            <option key={defaultValue} value={defaultValue} >{defaultValue}</option>
                            {specialitiesList}
                        </select>
                        <span>np. pediatra</span>
                    </label>
                    <label>Wybierz lekarza:
                        <select name='doctor' required onChange={selectHandler}>
                            <option key={defaultValue} value={defaultValue}>{defaultValue}</option>
                            {doctorsList}
                        </select>
                        <span>np. Adam Kowalski</span>
                    </label>
                    <label>Wybierz godzinę:
                        <select name='time' required onChange={timeSelectHandler}>
                            <option key={defaultValue} value={defaultValue}>{defaultValue}</option>
                            {timeList}
                        </select>
                        <span>np. 7:30</span>
                    </label>
                </div>
                <div>
                    <label>Imię i nazwisko:
                        <input type='text' name='pacientName' pattern="[a-zA-Z]+[ ][a-zA-Z]+" required onChange={inputHandler}></input>
                        <span>np. Anna Nowak</span>
                    </label>
                    <label>Adres email:
                        <input type='email' name='pacientEmail' required onChange={inputHandler}></input>
                        <span>np. anna.nowak@email.pl</span>
                    </label>
                    <label>Numer telefonu:
                        <input type='tel' name='pacientPhone' pattern="[0-9]{9}" required onChange={inputHandler}></input>
                        <span>np. 123456789</span>
                    </label>
                </div>
            </div>
            <button className="login__btn" type="submit">Wyślij</button>
        </form>
    </>
    )
}

export default Form;