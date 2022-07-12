import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { UserType } from '../src/types/user'

export const myContext = createContext<Partial<UserType>>({})

export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    fetch(`http://localhost:3030/user`, { credentials: 'include' })
    .then(res => res.json())
    .then(res => setUser(res))
    .catch(error => console.log(`error ${error}`))
  }, []);

  console.log(user)

  return (
    <myContext.Provider value={user!}>{props.children}</myContext.Provider>
    )
}