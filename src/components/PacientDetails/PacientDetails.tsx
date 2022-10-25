import { useContext } from 'react';
import { MyContext } from 'Context';
import ButtonLink from 'components/common/ButtonLink/ButtonLink'

import './PacientDetails.scss'

interface Props {
    pacientId: string | number;
}


const PacientDetails: React.FC<Props> = () => {
    const { labels } = useContext(MyContext)

    return (
        <>
            <div>pacient details</div>
            <ButtonLink
                text={labels?.buttons.back}
                target={`/doctor-account`}
                customClass='blue-btn'
            />
        </>
    )
}

export default PacientDetails;