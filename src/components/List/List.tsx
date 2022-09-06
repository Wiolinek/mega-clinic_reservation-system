import { useContext } from 'react';
import { SpecialityType } from 'types/speciality';
import { MyContext } from 'Context';

import './List.scss';

interface Props {
    list: SpecialityType[];
    customClass: string;
}

const List: React.FC<Props> = ({ list, customClass }) => {
    const { labels } = useContext(MyContext)


    return (
        <>
            <h2>{labels?.homePage.specializationsList}</h2>
            <ul className={customClass}>
                {list?.map(item =>
                    <li key={item.id} >
                        <a href={`/our-doctors/?speciality=${item.speciality}`}>
                            {item.speciality}
                        </a>
                    </li>
                )}
            </ul>
        </>
    )
}

export default List;