import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CalendarComp from 'components/Calendar/Calendar';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'
import FormFieldControler from '../FormFieldControler';
import { emailMessageHandler } from 'helpers/formHelper';
import { DoctorType } from 'types/doctor';
import { PacientType } from 'types/pacient';
import { MyContext } from 'Context';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './Form.scss';


interface Props {
    specialitiesList: React.ReactNode[] | null;
    doctorsData: DoctorType[] | null;
    doctorsList?: React.ReactNode[];
    setChosenDoctor: React.Dispatch<React.SetStateAction<DoctorType[] | undefined>>;
    timeList?: React.ReactNode[] | boolean;
    date?: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}


const FormComp: React.FC<Props> = ({ specialitiesList, doctorsData, doctorsList, setChosenDoctor, timeList, date, setDate }) => {
    const { labels, language } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [doctorId, setDoctorId] = useState<string | undefined>();
    const defaultValue = '---';
    const navigate = useNavigate();

    const specSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(e.target.selectedOptions[0].label !== defaultValue ? {
            ...searchParams,
            speciality: e.target.selectedOptions[0].label
        } : {...searchParams}
        );
    };

    const docSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDoctorId(e.target.selectedOptions[0].value)
        setSearchParams(e.target.selectedOptions[0].label !== defaultValue ? {
            speciality: `${doctorSpec}`,
            doctor: e.target.selectedOptions[0].label
        } : {...searchParams}
        );
    };

    const formHandler = async(values: PacientType) => {

        const message = emailMessageHandler(values);

        await fetch(`http://localhost:3030/api/send`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({values, message})
        })
        .then((res) => { res.status === 200 &&
        
        // fetch(`https://megaclinic.ultra-violet.codes/api/form`, {
        fetch(`http://localhost:3030/api/form`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({values})
        })
        .then(() => navigate('../success', { replace: true }))
        .catch(error => console.log(`error ${error}`))
        }
        )
    };

    useEffect(() => {
        const doctor = doctorsData?.filter((doctor: DoctorType) => doctor?.name === doctorName && doctor);
        setChosenDoctor(doctor)
        setDoctorId(String(doctor?.[0]?.doctor_id) || '0',)
    }, [doctorName, date]);


    const validationSchema = Yup.object({
        speciality: Yup.string()
            .required(labels?.formErrors.speciality),
        doctor: Yup.string()
            .required(labels?.formErrors.doctor),
        date: Yup.date()
            .required(labels?.formErrors.date),
        time: Yup.string()
            .required(labels?.formErrors.time),
        pacientName: Yup.string()
            .required(labels?.formErrors.pacientName)
            .min(2, labels?.formErrors.pacientNameLength),
        pacientPhone: Yup.number()
            .required(labels?.formErrors.pacientPhone)
            .min(9, labels?.formErrors.pacientPhoneLength),
        pacientEmail: Yup.string()
            .email(labels?.formErrors.pacientEmailValid)
            .required(labels?.formErrors.pacientEmail)
            .min(5, labels?.formErrors.pacientEmailLength)
            .matches(/^[^@]+@[^@]+\.[^@]+$/, labels?.formErrors.pacientEmailMatch)
    });

    const initialValues: PacientType = {
        speciality: doctorSpec || '',
        doctor: doctorName || '',
        doctorId: doctorId!,
        date: date?.toLocaleDateString('sv') || '',
        time: '',
        pacientName: '',
        pacientEmail: '',
        pacientPhone: '',
        language,
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: PacientType): void | Promise<any> => formHandler(values)}
            enableReinitialize
        >
            {(props: any) => (
                
            <Form className='reservation__form' noValidate >
                <h2>{labels?.form.header}</h2>
                <div>
                    <FormFieldControler
                        as='select'
                        name='speciality'
                        label={labels?.form.chooseSpec}
                        example={labels?.placeholders.specialization}
                        options={specialitiesList}
                        eventHandler={e => {
                            specSelectHandler(e);
                            props.handleChange(e)
                        }}
                        required
                    />

                    <FormFieldControler
                        as='select' 
                        name='doctor'
                        label={labels?.form.chooseDoc}
                        example={labels?.placeholders.doctor}
                        options={doctorsList}
                        eventHandler={e => {
                            docSelectHandler(e);
                            props.handleChange(e)
                        }}
                        required
                    />

                    <FormFieldControler
                        as='input'
                        type='text'
                        name='date'
                        customClass='date-input'
                        value={'' || date?.toLocaleDateString('pl-PL')}
                        readOnly={true}
                        label={labels?.form.chooseDate}
                        required
                    />
                    <CalendarComp date={date} setDate={setDate}/>

                    <FormFieldControler
                        as='select'
                        name='time'
                        label={labels?.form.chooseTime}
                        example={labels?.placeholders.time}
                        options={timeList}
                        eventHandler={e => props.handleChange(e)}
                        required
                    />

                    <FormFieldControler
                        as='input'
                        type='text'
                        name='pacientName'
                        pattern='[a-zA-Z]+[ ][a-zA-Z]+'
                        label={labels?.personalData.nameSurname}
                        example={labels?.placeholders.nameSurname}
                        required
                    />

                    <FormFieldControler
                        as='input'
                        type='email'
                        name='pacientEmail'
                        label={labels?.personalData.email}
                        example={labels?.placeholders.email}
                        required
                    />

                    <FormFieldControler
                        as='input'
                        type='tel'
                        name='pacientPhone'
                        pattern='[0-9]{9}'
                        label={labels?.personalData.phone}
                        value={props.pacientPhone}
                        required
                    />
                </div>
                <ButtonLink type='submit'
                    customClass='btn reservation__form-btn'
                    text={labels?.buttons.send}
                    disabled={props.isSubmitting}
                />
            </Form>
            )}

        </Formik>
    )
}

export default FormComp;