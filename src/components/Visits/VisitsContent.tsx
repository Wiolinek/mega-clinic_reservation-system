import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';
import Loader from 'components/Loader/Loader';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';

import { convertDate, futureVisitsGenerate, pastVisitsGenerate, listVisitsGenerate } from 'helpers/visits.helper';
import { VisitsType } from 'types/visit';


interface Props {
    visitsData: VisitsType;
}


const VisitsContent: React.FC<Props> = ({ visitsData }) => {
    const { user, labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const visitsType = searchParams.get('visits');

    const pastVisitsList = pastVisitsGenerate(convertDate(visitsData?.data));
        
    const futureVisitsList = futureVisitsGenerate(convertDate(visitsData?.data));


    return (
        <>
            <h2>{`${labels?.doctorAccount.greetings} ${user?.name || JSON.parse(window.localStorage.getItem('user') || '{}').name}`}</h2>
            <div className='doctor-account__filters'>
                <div className='doctor-account__filters--header'>
                    <h3>{labels?.doctorAccount.yourVisits}</h3>
                    <p>{labels?.doctorAccount.visitsFound}<span>{visitsData?.data?.length}</span></p>
                </div>
                <div className='doctor-account__filters--btns'>
                    <ButtonLink
                        customClass={`white-btn ${visitsType === 'past' ? 'active-filter' : ''}`}
                        text={`${labels?.buttons.past} (${pastVisitsList?.length})`}
                        target='/doctor-account/?visits=past'
                    />
                    <ButtonLink
                        customClass={`white-btn ${visitsType === 'future' ? 'active-filter' : ''}`}
                        text={`${labels?.buttons.future} (${futureVisitsList?.length})`}
                        target='/doctor-account/?visits=future'
                    />
                    <ButtonLink
                        customClass='white-btn'
                        text={labels?.buttons.hideVisits}
                        target='/doctor-account'
                    />
                </div>
            </div>
            <article>
                {(visitsData?.loading && labels) &&
                    <Loader message={labels?.loaders.list} />
                }
                {visitsType &&
                    <>
                        <ul className='doctor-account__visits-list'>
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