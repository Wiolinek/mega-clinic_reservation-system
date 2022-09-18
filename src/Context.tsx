import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { ContextType } from '../src/types/context'
import useFetch from 'helpers/useFetch'


const MyContext = createContext<Partial<ContextType>>({})


const Context = (props: PropsWithChildren<any>) => {
  const [language, setLanguage] = useState<string>('pl')
  // const { data } = useFetch(`https://megaclinic.ultra-violet.codes/api/labels`, { lang: language }, language);
  const { data } = useFetch(`http://localhost:3030/api/labels`, { lang: language }, language);
  const [user, setUser] = useState<any>(JSON.parse(window.localStorage.getItem('user') || '{}'))
  const [labels, setLabels] = useState()

  useEffect(() => {
    data && setLabels(data?.[0])
  }, [data]);

  const providedValues = {
    user,
    setUser,
    labels,
    language,
    setLanguage
  }

  return (
    <MyContext.Provider value={providedValues} >
      {props.children}
    </MyContext.Provider>
  )
}

export default Context
export { MyContext }