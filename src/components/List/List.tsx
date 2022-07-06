import { SpecialityType } from '../../types/speciality';
import '../List/List.css';

interface Props {
    list: SpecialityType[];
    customClass: string;
}

const List: React.FC<Props> = ({ list, customClass }) => {


    return (
        <>
            <h2>Nasze specjalizacje</h2>
            <ul className={customClass}>
                {list?.map(item => <li key={item.id} ><a href={`/our-doctors/?speciality=${item.speciality}`}>{item.speciality}</a></li>)}
            </ul>
        </>
    )
}

export default List;