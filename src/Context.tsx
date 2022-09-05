import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { ContextType } from '../src/types/context'


const MyContext = createContext<Partial<ContextType>>({})


const Context = (props: PropsWithChildren<any>) => {
  const [user, setUser] = useState<any>(JSON.parse(window.localStorage.getItem('user') || '{}'))
  const [labels, setLabels] = useState()

  useEffect(() => {
    // fetch(`https://megaclinic.ultra-violet.codes/api/labels`)
    fetch(`http://localhost:3030/api/labels`)
    .then(res => res.json())
    .then(res => setLabels(res[0]))
    .catch(error => console.log(`error ${error}`))
  }, []);

  const providedValues = {
    user,
    setUser,
    labels
  }

  return (
    <MyContext.Provider value={providedValues} >
      {props.children}
    </MyContext.Provider>
  )
}

export default Context
export { MyContext }