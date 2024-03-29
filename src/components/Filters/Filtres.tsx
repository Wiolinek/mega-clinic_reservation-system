import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyContext } from 'Context';


interface Props {
    filters: string[];
    resultsCounter?: number;
}


const Filters: React.FC<Props> = ({ filters, resultsCounter }) => {
    const { labels } = useContext(MyContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');

    const filterList = filters?.map((filter: string) => 
        <option key={filter}
            value={filter}
            selected={doctorSpec === filter}
        >
            {filter}
        </option>)

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(e.target.selectedOptions[0].value !== '---' ?
            {speciality: e.target.selectedOptions[0].value}
            :
            {}
        )
    }
        

    return (
        <>
            <label>{labels?.filters.specializations}
                <select onChange={e => selectHandler(e)}>
                <option key='---' value='---'>---</option>
                    {filterList}
                </select>
            </label>
            <p>{labels?.filters.resultsFound}<span>{resultsCounter}</span></p>
        </>
    )
}

export default Filters;