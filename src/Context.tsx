import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { ContextType, LabelsType, UserType } from 'types/context'
import useFetch from 'helpers/useFetch'


const MyContext = createContext<Partial<ContextType>>({})


const Context = (props: PropsWithChildren<any>) => {
  const [language, setLanguage] = useState<string>('pl')
  // const { data } = useFetch(`https://megaclinic.ultra-violet.codes/api/labels`, 'POST', { lang: language }, language);
  const { data } = useFetch(`http://localhost:3030/api/labels`, 'POST', { lang: language }, language);
  const [user, setUser] = useState<React.SetStateAction<UserType | undefined | any>>(JSON.parse(window.localStorage.getItem('user') || '{}'))
  const [labels, setLabels] = useState<React.SetStateAction<LabelsType | undefined | any>>()

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