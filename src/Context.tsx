import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { UserType } from '../src/types/user'


export const myContext = createContext<Partial<UserType>>({})


export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    fetch(`http://localhost:3030/doctor-account`, { credentials: 'include' })
    .then(res => res.json())
    .then(res => setUser({name: res.name, id: res._id, setUser: setUser}))
    .catch(error => console.log(`error ${error}`))
  }, []);


  return (
    <myContext.Provider value={user} >{props.children}</myContext.Provider>
  )
}