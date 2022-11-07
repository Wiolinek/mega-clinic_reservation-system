import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import PatientItem from 'components/Patients/PatientItem';
import useFetch from 'helpers/useFetch';
import { PatientsType } from 'types/patient';


interface Props {
    searchText: string;
    setSearchText: (value: string) => void;
}


const PatientsContent: React.FC<Props> = ({ searchText, setSearchText }) => {
    const { labels } = useContext(MyContext);
    const [searchParams] = useSearchParams();
    const patientQuery = searchParams.get('patient-query');

    const patientsData: PatientsType = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/patients`, 'POST', { patientName: patientQuery }, patientQuery);
    

    return (
        <>
            <article>
                <div className='doctor-account__filters'>
                    <div className='doctor-account__filters--header'>
                        <h3>{labels?.doctorAccount.patients}</h3>
                        <p>{labels?.doctorAccount.patientsFound}
                            <span> {(patientQuery && patientQuery.length > 0  && patientQuery !== ' ') ? patientsData?.data?.length : 0}
                            </span>
                        </p>
                    </div>
                    <div className='doctor-account__filters--input'>
                        <label>{labels?.doctorAccount.inputLabel}<br/>
                            <input type='text' name='search' onChange={e => setSearchText(e.target.value)} value={searchText}></input>
                        </label>
                        {patientQuery && <ButtonLink
                            type='button'
                            text={labels?.buttons.clear}
                            customClass='blue-btn'
                            onClick={() => setSearchText('')}
                        />}
                    </div>
                </div>
                {(Array.isArray(patientsData.data) && patientsData.data.length > 0 && patientQuery && patientQuery.length > 0 && patientQuery !== ' ') &&
                    <ul className='doctor-account__list'>
                        {patientsData?.data?.map(patient => 
                            <PatientItem patient={patient}/>
                        )}
                    </ul>
                }
            </article>
        </>
    )
}

export default PatientsContent;