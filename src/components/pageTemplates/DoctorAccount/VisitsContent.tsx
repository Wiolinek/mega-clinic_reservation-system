import { useContext } from 'react';
import { MyContext } from 'Context';
import Loader from 'components/Loader/Loader';
import Visit from './Visit';
import { VisitType, VisitsType } from 'types/visit';


interface Props {
    visitsData: VisitsType;
}


const VisitsContent: React.FC<Props> = ({ visitsData }) => {
    const { user, labels } = useContext(MyContext)

    const visitsList = visitsData?.data?.map((visit: VisitType) => {
        const date = new Date(visit.date);
    
        return <Visit visit={visit} date={date} />
    })


    return (
        <>
            <h2>{`${labels?.doctorAccount.greetings} ${user?.name || JSON.parse(window.localStorage.getItem('user') || '{}').name}`}</h2>
            <div className='doctor-account__filters'>
                <h3>{labels?.doctorAccount.yourVisits}</h3>
                <p>{labels?.doctorAccount.visitsFound}<span>{visitsList?.length}</span></p>
            </div>
            <article>
                {(visitsData?.loading && labels) &&
                    <Loader message={labels?.loaders.list} />
                }
                <ol className='doctor-account__visits-list'>
                    {visitsList}
                </ol>
            </article>
        </>
    )
}

export default VisitsContent;