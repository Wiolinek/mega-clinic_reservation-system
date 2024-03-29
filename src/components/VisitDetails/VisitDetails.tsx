import { useContext, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from 'Context';
import ButtonLink from 'components/common/ButtonLink/ButtonLink';
import PatientDetails from 'components/PatientDetails/PatientDetails';
import useFetch from 'helpers/useFetch';

import './VisitDetails.scss';


interface Props {
    visitId: string | object | null | undefined;
}


const VisitDetails: React.FC<Props> = ({ visitId }) => {
    const { labels } = useContext(MyContext);
    const navigate = useNavigate();
    
    const [notes, setNotes] = useState<string>();
    const [newNotes, setNewNotes] = useState<string>();
    
    const { data } = useFetch(`${process.env.REACT_APP_SITE_HOST}/api/visits`, 'POST', { visitId }, visitId);

    const [editMode, setEditMode] = useState<boolean>(Boolean(data?.[0]['notes'] || newNotes));

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_SITE_HOST}/api/single-visit`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes, visitId }),
        })
        .then(res => { res.status === 200 && 
        fetch(`${process.env.REACT_APP_SITE_HOST}/api/single-visit`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitId }),
        })
        .then(res => res.json())
        .then(res => setNewNotes(res[0]['notes']))
        .then(() => setEditMode(false))
        .catch(err => console.log(`error ${err}`))
        })
    };

    
    return (
        <>
            <ButtonLink
                type='button'
                text={labels?.buttons.back}
                onClick={() => navigate(-1)}
                customClass='blue-btn'
            />
            <article className='doctor-account__visit-details'>
                <div className='doctor-account__visit-details--personal-data'>
                    <div className='doctor-account__visit-details--name'>
                        <div>
                            <p>{labels?.visitDetails.patient}</p>
                            <p className='name'>{data?.[0]['patientName']}</p>
                        </div>
                        <div>
                            <p>{labels?.visitDetails.phoneNumber}</p>
                            <p>{data?.[0]['patientPhone']}</p>
                        </div>
                        <div>
                            <p>{labels?.visitDetails.emailAddress}</p>
                            <p>{data?.[0]['patientEmail']}</p>
                        </div> 
                    </div>
                    <div className='doctor-account__visit-details--date-time'>
                        <div>
                            <p>{labels?.visitDetails.date}</p>
                            <p>{String(data?.[0]['date']).substring(0, 10)}</p>
                        </div>
                        <div>
                            <p>{labels?.visitDetails.time}</p>
                            <p>{String(data?.[0]['time']).substring(0, 5)}</p>
                        </div> 
                    </div>
                </div>
                <div className='doctor-account__visit-details--notes'>
                {!editMode &&
                    <>
                        <div className='doctor-account__visit-details--notes-area'>
                            <p>{labels?.visitDetails.notes}</p>
                            <p>{(newNotes && newNotes.length >= 0) ? newNotes : data?.[0]['notes']}</p>
                        </div>
                        <div className='doctor-account__visit-details--notes-btns'>
                        <ButtonLink
                            type='button'
                            text={((data?.[0]['notes']) || newNotes) ? labels?.buttons.editNote : labels?.buttons.addNote}
                            customClass='blue-btn'
                            onClick={() => setEditMode(true)}
                        />
                        </div>
                    </>
                }
                {editMode &&
                    <form onSubmit={onSubmit}>
                        <label>{labels?.visitDetails.notes}<br/>
                            <textarea
                                rows={6}
                                cols={40}
                                onChange={e => setNotes(e.target.value)}>
                                {newNotes || data?.[0]['notes']}
                            </textarea>
                        </label>
                        <div className='doctor-account__visit-details--notes-btns'>
                            {editMode && <ButtonLink
                                type='button'
                                text={labels?.buttons.cancel}
                                customClass='red-btn'
                                onClick={() => setEditMode(false)}
                            />}
                            <ButtonLink
                                type='submit'
                                text={editMode ? labels?.buttons.save : labels?.buttons.addNote}
                                customClass='blue-btn'
                                disabled={!notes ? true : false}
                            />
                        </div>
                    </form>  
                }
                </div> 
            </article>
            <PatientDetails patientData={data?.[0]} />
        </>
    )
}

export default VisitDetails;