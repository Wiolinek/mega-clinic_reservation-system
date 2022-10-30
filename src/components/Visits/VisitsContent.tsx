import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import { convertDate, futureVisitsGenerate, pastVisitsGenerate, listVisitsGenerate } from 'helpers/visits.helper';
import { VisitsType } from 'types/visit';

import './VisitsContent.scss';


interface Props {
    visitsData: VisitsType;
}


const VisitsContent: React.FC<Props> = ({ visitsData }) => {
    const { labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const visitsType = searchParams.get('visits');
    const patientQuery = searchParams.get('patient-query');

    const pastVisitsList = pastVisitsGenerate(convertDate(visitsData?.data));
    const futureVisitsList = futureVisitsGenerate(convertDate(visitsData?.data));


    return (
        <>
            <article>
                <div className='doctor-account__filters'>
                    <div className='doctor-account__filters--header'>
                        <h3>{labels?.doctorAccount.yourVisits}</h3>
                        <p>{labels?.doctorAccount.visitsFound}<span>{visitsData?.data?.length}</span></p>
                    </div>
                    <div className='doctor-account__filters--btns'>
                        <ButtonLink
                            type='button'
                            customClass={`white-btn ${visitsType === 'past' ? 'active-filter' : ''}`}
                            text={`${labels?.buttons.past} (${pastVisitsList?.length || 0})`}
                            onClick={() => setSearchParams(patientQuery ? {visits: 'past', 'patient-query': `${patientQuery}`} : {visits: 'past'})}
                        />
                        <ButtonLink
                            type='button'
                            customClass={`white-btn ${visitsType === 'future' ? 'active-filter' : ''}`}
                            text={`${labels?.buttons.future} (${futureVisitsList?.length || 0})`}
                            onClick={() => setSearchParams(patientQuery ? {visits: 'future', 'patient-query': `${patientQuery}`} : {visits: 'future'})}
                        />
                        <ButtonLink
                            type='button'
                            customClass='white-btn'
                            text={labels?.buttons.hideVisits}
                            onClick={() => setSearchParams(patientQuery ? {'patient-query': `${patientQuery}`} : {})}
                        />
                    </div>
                </div>
                {visitsType &&
                    <>
                        <ul className='doctor-account__list'>
                            {visitsType === 'future' && listVisitsGenerate(futureVisitsList)}
                            {visitsType === 'past' && listVisitsGenerate(pastVisitsList)}
                        </ul>
                    </>
                }
            </article>
        </>
    )
}

export default VisitsContent;