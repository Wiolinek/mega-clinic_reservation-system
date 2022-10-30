import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from 'Context';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import useFetch from 'helpers/useFetch';
import { PatientType } from 'types/patient';

import './PatientDetails.scss';


interface Props {
    patientId?: string | number;
    patientData?: PatientType;
}


const PatientDetails: React.FC<Props> = ({ patientId, patientData }) => {
    const { labels } = useContext(MyContext);
    const navigate = useNavigate();
    // const { data } = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/patient`, 'POST', { id: patientId });


    return (
        <>
        {
            patientId &&
            <ButtonLink
                type='button'
                text={labels?.buttons.back}
                onClick={() => navigate(-1)}
                customClass='blue-btn'
            />
        }
            
            <article className='doctor-account__patient-details'>
                <h3>{labels?.patientCard.title}</h3>
                <div className='doctor-account__patient-details--personal-data'>
                    <div className='doctor-account__patient-details--name'>
                        <div>
                            <p>{labels?.patientCard.patient}</p>
                            <p className='name'>{patientData?.['patientName']}</p>
                        </div>
                        <div>
                            <p>{labels?.patientCard.phoneNumber}</p>
                            <p>{patientData?.['patientPhone']}</p>
                        </div>
                        <div>
                            <p>{labels?.patientCard.emailAddress}</p>
                            <p>{patientData?.['patientEmail']}</p>
                        </div> 
                        
                    </div>
                    <div className='doctor-account__patient-details--date-time'>
                        <div>
                            <p>{labels?.patientCard.birthDate}</p>
                            <p></p>
                        </div>
                        <div>
                            <p>{labels?.patientCard.sex}</p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className='doctor-account__patient-details--medicine'>
                    <p>{labels?.patientCard.medications}</p>
                    <p></p>
                </div>
                <div className='doctor-account__patient-details--visits'>
                    <p>{labels?.patientCard.visitsHistory}</p>
                </div>
                <div className='doctor-account__patient-details--btns'>
                    {/* <ButtonLink
                        text={labels?.buttons.edit}
                        customClass='blue-btn'
                    /> */}
                </div>
            </article>
        </>
    )
}

export default PatientDetails;