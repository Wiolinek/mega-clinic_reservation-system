import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CalendarComp from 'components/Calendar/Calendar';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import FormFieldControler from '../FormFieldControler';
import { emailMessageHandler } from 'helpers/form.helper';
import { DoctorType } from 'types/doctor';
import { PatientType } from 'types/patient';
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
    date?: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}


const FormComp: React.FC<Props> = ({ specialitiesList, doctorsData, doctorsList, setChosenDoctor, timeList, date, setDate }) => {
    const { labels, language } = useContext(MyContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');
    const doctorName = searchParams.get('doctor');
    const [doctorId, setDoctorId] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean | undefined>();
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

    const formHandler = async(values: PatientType) => {
        setLoading(true)

        const message = emailMessageHandler(values);

        await fetch(`${process.env.REACT_APP_SITE_HOST}/api/send`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ values, message })
        })
        .then(res => { res.status === 200 && 
            setLoading(false)
        
        fetch(`${process.env.REACT_APP_SITE_HOST}/api/form`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ values })
        })
        .then(() => navigate('../success', { replace: true }))
        .catch(err => console.log(`error ${err}`))
        })
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
        patientName: Yup.string()
            .required(labels?.formErrors.patientName)
            .min(2, labels?.formErrors.patientNameLength)
            .matches(/^[a-zA-Z]{2,}[ ][a-zA-Z]{2,}/, labels?.formErrors.nameMatch),
        patientPhone: Yup.string()
            .required(labels?.formErrors.patientPhone)
            .min(9, labels?.formErrors.patientPhoneLength)
            .matches(/^[0-9]/, labels?.formErrors.Start)
            .typeError(labels?.formErrors.patientPhoneNumber || ''),
        patientEmail: Yup.string()
            .email(labels?.formErrors.patientEmailValid)
            .required(labels?.formErrors.patientEmail)
            .min(5, labels?.formErrors.patientEmailLength)
            .matches(/^[^@]+@[^@]+\.[^@]+$/, labels?.formErrors.patientEmailMatch)
    });

    const initialValues: PatientType = {
        speciality: doctorSpec || '',
        doctor: doctorName || '',
        doctorId: doctorId!,
        date: date?.toLocaleDateString('sv') || '',
        time: '',
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        language,
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: PatientType): void | Promise<any> => formHandler(values)}
            enableReinitialize
        >
            {(props: any) => (
                
            <Form className='reservation__form' noValidate >
                <div className={`loader ${!loading && 'hidden'}`}></div>
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
                        name='patientName'
                        label={labels?.personalData.nameSurname}
                        example={labels?.placeholders.nameSurname}
                        required
                    />

                    <FormFieldControler
                        as='input'
                        type='email'
                        name='patientEmail'
                        label={labels?.personalData.email}
                        example={labels?.placeholders.email}
                        required
                    />

                    <FormFieldControler
                        as='input'
                        type='tel'
                        name='patientPhone'
                        label={labels?.personalData.phone}
                        value={props.patientPhone}
                        required
                    />
                </div>
                <ButtonLink type='submit'
                    customClass='blue-btn reservation__form-btn'
                    text={props.isSubmitting ? labels?.buttons.sending : labels?.buttons.send}
                    disabled={props.isSubmitting}
                />
            </Form>
            )}

        </Formik>
    )
}

export default FormComp;