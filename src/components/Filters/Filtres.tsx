import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';


interface Props {
    filters: string[];
    resultsCounter?: number;
}


const OurDoctors: React.FC<Props> = ({ filters, resultsCounter }) => {
    const { labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');

    const filterList = filters?.map((filter: string) => <option key={filter} value={filter} selected={doctorSpec === filter} >
        {filter}</option>)
        

    return (
        <>
            <label>{labels?.filters.specializations}
                <select onChange={e => setSearchParams(e.target.selectedOptions[0].value !== '---' ? {speciality: e.target.selectedOptions[0].value} : {})}>
                <option key='---' value='---'>---</option>
                    {filterList}
                </select>
            </label>
            <p>{labels?.filters.resultsFound}<span>{resultsCounter}</span></p>
        </>
    )
}

export default OurDoctors;