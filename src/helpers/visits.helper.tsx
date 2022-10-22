import Visit from 'components/Visits/Visit';
import { VisitType } from 'types/visit';


export const convertDate = (data: VisitType[] | null) => {

    return data?.map((visit: VisitType) => visit && {...visit, date: new Date(visit.date)})
}


export const listVisitsGenerate = (visitsList: VisitType[] | undefined) => {
    
    return visitsList?.map((visit: VisitType) => visit &&
        <Visit key={visit.id} visit={visit}/>)
}


export const pastVisitsGenerate = (visitsList: VisitType[] | undefined) => {
    
    return visitsList?.filter((visit: VisitType) => visit?.date &&
        visit?.date?.getTime() < new Date().getTime());
}


export const futureVisitsGenerate = (visitsList: VisitType[] | undefined) => {
    
    return visitsList?.filter((visit: VisitType) => visit?.date &&
        visit.date.getTime() > new Date().getTime())
}