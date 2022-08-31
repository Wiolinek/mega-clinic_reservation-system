import React, { createContext, PropsWithChildren, useState } from 'react'
import { UserType } from '../src/types/user'


const MyContext = createContext<Partial<UserType>>({})


const Context = (props: PropsWithChildren<any>) => {
  const [user, setUser] = useState<any>(JSON.parse(window.localStorage.getItem('user') || '{}'))

  const providedValues = {
    user,
    setUser,
  }

  return (
    <MyContext.Provider value={providedValues} >
      {props.children}
    </MyContext.Provider>
  )
}

export default Context
export { MyContext }