import { useSearchParams } from 'react-router-dom';


interface Props {
    filters: string[];
    resultsCounter?: number;
}


const OurDoctors: React.FC<Props> = ({filters,resultsCounter}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const doctorSpec = searchParams.get('speciality');

    const filterList = filters?.map(filter => <option key={filter} value={filter} selected={doctorSpec === filter} >
        {filter}</option>)
        

    return (
        <>
            <label>Specjalizacje:
                <select onChange={e => setSearchParams(e.target.selectedOptions[0].value !== '---' ? {speciality: e.target.selectedOptions[0].value} : {})}>
                <option key='---' value='---'>---</option>
                    {filterList}
                </select>
            </label>
            <p>Znalezionych wyników: <span>{resultsCounter}</span></p>
        </>
    )
}

export default OurDoctors;