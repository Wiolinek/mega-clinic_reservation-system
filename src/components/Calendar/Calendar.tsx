import React, { useState } from 'react';
import Calendar from 'react-calendar';

import '../Calendar/Calendar.css';

interface Props {
  date: any;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}


const CalendarComp: React.FC<Props> = ({ date, setDate }) => {

    return (
      <Calendar defaultActiveStartDate={new Date()}
        minDate={new Date()}
        maxDetail='month'
        onChange={setDate} value={date}
        defaultValue={date}
      />
    )
}

export default CalendarComp;