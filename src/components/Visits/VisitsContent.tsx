import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';
import Loader from 'components/Loader/Loader';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import useFetch from 'helpers/useFetch'
import { convertDate, futureVisitsGenerate, pastVisitsGenerate, listVisitsGenerate } from 'helpers/visits.helper';
import { VisitsType } from 'types/visit';
import { PacientsType } from 'types/pacient';


interface Props {
    visitsData: VisitsType;
}


const VisitsContent: React.FC<Props> = ({ visitsData }) => {
    const { user, labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const visitsType = searchParams.get('visits');
    const [searchText, setSearchText] = useState("");

    const pastVisitsList = pastVisitsGenerate(convertDate(visitsData?.data));
    const futureVisitsList = futureVisitsGenerate(convertDate(visitsData?.data));

    const pacientsData: PacientsType = useFetch(`http://localhost:3030/api/pacients`, { pacientName: searchText }, searchText);


    return (
        <>
            <h2>{`${labels?.doctorAccount.greetings} ${user?.name || JSON.parse(window.localStorage.getItem('user') || '{}').name}`}</h2>
            
            <article>
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
                {(visitsData?.loading && labels) &&
                    <Loader message={labels?.loaders.list} />
                }
                {visitsType &&
                    <>
                        <ul className='doctor-account__list'>
                            {visitsType === 'future' && listVisitsGenerate(futureVisitsList)}
                            {visitsType === 'past' && listVisitsGenerate(pastVisitsList)}
                        </ul>
                    </>
                }
            </article>
            <article>
                <div className='doctor-account__filters'>
                    <div className='doctor-account__filters--header'>
                        <h3>{labels?.doctorAccount.pacients}</h3>
                        <p>{labels?.doctorAccount.pacientsFound}
                            <span> {(searchText.length > 0  && searchText !== ' ') ? pacientsData?.data?.length : 0}
                            </span>
                        </p>
                    </div>
                    <div className='doctor-account__filters--input'>
                        <label>{labels?.doctorAccount.inputLabel}<br/>
                            <input type='text' name='search' onChange={e => setSearchText(e.target.value)} value={searchText}></input>
                        </label>
                    </div>
                </div>
                {(Array.isArray(pacientsData.data) && pacientsData.data.length > 0 && searchText.length > 0 && searchText !== ' ') &&
                    <ul className='doctor-account__list pacients'>
                        {pacientsData?.data?.map(pacient => 
                            <div className='doctor-account__list--pacient-data'>
                                <p>{pacient.pacientName}</p>
                                <p>{pacient.pacientEmail}</p>
                                <p>{pacient.pacientPhone}</p>
                                <ButtonLink
                                    text={labels?.buttons.details}
                                    target={`/doctor-account?pacient=${pacient.id}`}
                                    customClass='blue-btn'
                                />
                            </div>
                        )}
                    </ul>
                }
            </article>
        </>
    )
}

export default VisitsContent;