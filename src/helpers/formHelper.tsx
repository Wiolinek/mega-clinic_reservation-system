import { PacientType } from 'types/pacient';

export const emailMessageHandler = (values: PacientType) => {

    if(values.language === 'en') {
        return {title: `MegaClinic - reservation - ${values.date}`,
        message: `<div style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        background-color: #5698be;
        ">
        <h2 style="
        margin-bottom: 40px;
        font-size: 22px;
        font-weight: 700;
        ">You have just made reservation in <span style="color: #e22326">MegaClinic</span></h2>
        <h3 style="
        margin-bottom: 14px;
        font-size: 18px;
        font-weight: 700;
        text-decoration: underline;
        ">Check all details bellow:</h3>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700; 
        ">Pacient's name and surname</h4>
        <p>${values.pacientName}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700;
        ">Pacient's e-mail address</h4>
        <p style="
        color: black;
        ">${values.pacientEmail}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700; 
        ">Pacient's phone number</h4>
        <p>${values.pacientPhone}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700;
        ">Doctor's name and surname</h4>
        <p>${values.doctor}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700;
        ">Visit booked for:</h4>
        <p>${values.date} - ${values.time}</p>
        <p style="
        margin-top: 40px;
        font-size: 20px;
        font-weight: 700;
        ">All the best, MegaClinic</p>
      </div>
      `}
    }

    if(values.language === 'pl') {
        return {title: `MegaClinic - rezerwacja - ${values.date}`,
        message: `<div style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        background-color: #5698be;
        ">
        <h2 style="
        margin-bottom: 40px;
        font-size: 22px;
        font-weight: 700;
        ">Właśnie dokonałeś rezerwacji w <span style="color: #e22326">MegaClinic</span></h2>
        <h3 style="
        margin-bottom: 14px;
        font-size: 18px;
        font-weight: 700;
        text-decoration: underline;
        ">Poniżej przesyłamy szczegóły wizyty:</h3>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700; 
        ">Imię i nazwisko pacjenta</h4>
        <p>${values.pacientName}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700;
        ">Adres e-mail pacjenta</h4>
        <p style="
        color: black;
        ">${values.pacientEmail}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700; 
        ">Numer telefonu pacjenta</h4>
        <p>${values.pacientPhone}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700;
        ">Imię i nazwisko lekarza</h4>
        <p>${values.doctor}</p>
        <h4 style="
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700;
        ">Wizyta została zarezerwowana na:</h4>
        <p>${values.date} - ${values.time}</p>
        <p style="
        margin-top: 40px;
        font-size: 20px;
        font-weight: 700;
        ">Pozdrawiamy, MegaClinic</p>
      </div>`}
    }
}