import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CalendarComp from 'components/Calendar/Calendar';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'
import { PacientType } from 'types/pacient';
import { DoctorType } from 'types/doctor';
import { VisitType } from 'types/visit';
import { MyContext } from 'Context';
import useFetch from 'helpers/useFetch';

import './Form.scss';


interface Props {
    specialitiesList: React.ReactNode[] | null;
    doctorsData?: DoctorType[] | null;
    setChosenDoctor: any;
    chosenDoctor: any;
}

interface Visits {
    data: VisitType[] | null
    loading: boolean;
    error: string | null;
}


const Form: React.FC<Props> = ({ specialitiesList, doctorsData, chosenDoctor, setChosenDoctor }) => {
    const { labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [date, setDate] = useState<any>();
    const [timetable, setTimetable] = useState<string[]>();
    const defaultValue = '---';
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

    const requestPost = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId: String(chosenDoctor?.[0]?.doctor_id) || null, dateFilter: formData.date })
    };

    const bookedVisits: Visits = useFetch(`http://localhost:3030/api/visits`, requestPost, chosenDoctor, formData.date);

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

    const inputHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => 
        setFormData(dataItem => ({
            ...dataItem,
            [e.target.name]: e.target.value
        })
    );

    const formHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        // fetch(`https://megaclinic.ultra-violet.codes/api/form`, {
        fetch(`http://localhost:3030/api/form`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({formData})
        })
        .catch(error => console.log(`error ${error}`));
        navigate('../success', { replace: true })
    };

    const bookedTimes = bookedVisits?.data?.map(visit => visit.time.substring(0, 5)).map(time => time.startsWith('0') ? time.substring(1, 5) : time)
    const availableTimes = timetable?.filter(time => !bookedTimes?.includes(time));
    const timeList = availableTimes?.map((item, id) => <option key={id}>{item}</option>);

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

    useEffect(() => {
        setTimetable([])
        // fetch(`https://megaclinic.ultra-violet.codes/api/timetable`, {
            fetch(`http://localhost:3030/api/timetable`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorFilter: doctorName})
        })
        .then(res => res.json())
        .then(res => setChosenDoctor(res))
        .catch(error => console.log(`error ${error}`))
    }, [doctorName, date]);

    useEffect(() => {
        const times: string[] = []
        
        chosenDoctor?.map((item: any) => {
            for (let i: number = Number(item.working_hours_start.substring(0, 2)); i < Number(item.working_hours_end.substring(0, 2)); i++) {
                times.push(`${i}:00`).toString()
                times.push(`${i}:30`).toString()
            }
        })
        setTimetable(times)
    }, [chosenDoctor])


    return (
        <>
            <h2>{labels?.form.header}</h2>
            <form className='reservation__form' onSubmit={formHandler}>
                <div>
                    <label>{labels?.form.chooseSpec}
                        <select name='speciality'
                            onChange={selectHandler}
                            required>
                            <option key={defaultValue} value='' >{defaultValue}</option>
                            {specialitiesList}
                        </select>
                        <span>{labels?.placeholders.specialization}</span>
                    </label>
                    <label>{labels?.form.chooseDoc}
                        <select name='doctor'
                            onChange={selectHandler}
                            required>
                            <option key={defaultValue} value='' label={defaultValue}>{defaultValue}</option>
                            {doctorsList}
                        </select>
                        <span>{labels?.placeholders.doctor}</span>
                    </label>
                    <label>{labels?.form.chooseDate}
                        <input name='date'
                            className='date-input'
                            value={'' || date?.toLocaleDateString('pl-PL')}
                            onChange={e => setFormData(dataItem => ({...dataItem, [e.target.name]: date.toLocaleDateString('sv')}))}
                            readOnly
                            required>
                        </input>
                    <CalendarComp date={date} setDate={setDate}/>
                </label>
                <label>{labels?.form.chooseTime}
                    <select name='time'
                        onChange={inputHandler}
                        required>
                        <option key={defaultValue} value='' selected>{defaultValue}</option>
                        {timeList}
                    </select>
                    <span>{labels?.placeholders.time}</span>
                </label>
                <label>{labels?.personalData.nameSurname}
                    <input type='text'
                        name='pacientName'
                        pattern='[a-zA-Z]+[ ][a-zA-Z]+'
                        onChange={inputHandler}
                        required>
                    </input>
                    <span>{labels?.placeholders.nameSurname}</span>
                </label>
                <label>{labels?.personalData.email}
                    <input type='email'
                        name='pacientEmail'
                        onChange={inputHandler}
                        required>
                    </input>
                    <span>{labels?.placeholders.email}</span>
                </label>
                <label>{labels?.personalData.phone}
                    <input type='tel'
                        name='pacientPhone'
                        pattern='[0-9]{9}'
                        onChange={inputHandler}
                        required>
                    </input>
                    <span>{labels?.placeholders.phone}</span>
                </label>
            </div>
            <ButtonLink type='submit'
                customClass='btn reservation__form-btn'
                text={labels?.buttons.send}
            />
        </form>
    </>
    )
}

export default Form;