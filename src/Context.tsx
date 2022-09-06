import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { ContextType } from '../src/types/context'
import useFetch from 'helpers/useFetch'


const MyContext = createContext<Partial<ContextType>>({})


const Context = (props: PropsWithChildren<any>) => {
  const { data } = useFetch(`http://localhost:3030/api/labels`);
  const [user, setUser] = useState<any>(JSON.parse(window.localStorage.getItem('user') || '{}'))
  const [labels, setLabels] = useState()

  useEffect(() => {
    setLabels(data?.[0])
  }, [data]);

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