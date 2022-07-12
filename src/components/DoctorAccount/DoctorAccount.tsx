import { useContext } from "react";
import { myContext } from "../../Context";

import '../DoctorAccount/DoctorAccount.css';



const DoctorAccount: React.FC = () => {
    const context = useContext(myContext)
    console.log(context)
    
    
    return (
        <main>
            <h2>{`Witaj, ${context.username}`}</h2>
            <article>To jest twoje konto, przejrzyj swoje wizyty</article>
        </main>
    )
}

export default DoctorAccount;