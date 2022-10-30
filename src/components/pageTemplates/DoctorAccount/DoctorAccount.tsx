import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';
import GenericSection from 'components/common/GenericSection/GenericSection';
import VisitsContent from 'components/Visits/VisitsContent';
import PatientsContent from 'components/Patients/PatientsContent';
import PatientDetails from 'components/PatientDetails/PatientDetails';
import VisitDetails from 'components/VisitDetails/VisitDetails';
import { VisitsType } from 'types/visit';
import useFetch from 'helpers/useFetch';

import './DoctorAccount.scss';


const DoctorAccount: React.FC = () => {
    const { user, labels } = useContext(MyContext)
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const patient = searchParams.get('patient');
    const visit = searchParams.get('visit');
    const visitsType = searchParams.get('visits');
    const patientQuery = searchParams.get('patient-query');
    const [doctorId] = useState<React.SetStateAction<string>>(JSON.parse(window.localStorage.getItem('user') || '{}').id)
    const [searchText, setSearchText] = useState<string>(patientQuery || '');
    
     // const visitsData: VisitsType = useFetch(`https://megaclinic.ultra-violet.codes/api/visits`, 'POST', { doctorId: doctorId, date: null }, doctorId);
    const visitsData: VisitsType = useFetch(`http://localhost:3030/api/visits`, 'POST', { doctorId: doctorId, date: null }, doctorId);


    useEffect(() => {
        setSearchParams(searchText !== '' ?
            {...(visitsType && {visits: `${visitsType}`}), 'patient-query': searchText}
            :
            {...(visitsType && {visits: `${visitsType}`})}
        )
    }, [searchText])

    useEffect(() => {
        !doctorId && 
        setTimeout(() => {
            navigate('../login')
        }, 2000)
    },[doctorId])


    return (
        <main>
            {labels &&
                <GenericSection customClass='doctor-account'>
                    {
                        (doctorId && !patient && !visit) &&
                        <>
                            <h2>{`${labels?.doctorAccount.greetings} ${user?.name || JSON.parse(window.localStorage.getItem('user') || '{}').name}`}</h2>
                            <VisitsContent visitsData={visitsData} />
                            <PatientsContent searchText={searchText} setSearchText={setSearchText} />
                        </>  
                    }
                    {
                        (!doctorId) &&
                            <>
                                <h2>{labels?.doctorAccount.unauthorized}</h2>
                                <p>{labels?.redirects.redirectLoginPage}</p>
                            </>
                    }
                    {
                        (doctorId && patient) &&
                            <PatientDetails patientId={patient} />
                    }
                    {
                        (doctorId && visit) &&
                            <VisitDetails visitId={visit} />
                    }
                </GenericSection>
            }
        </main>
    )
}

export default DoctorAccount;