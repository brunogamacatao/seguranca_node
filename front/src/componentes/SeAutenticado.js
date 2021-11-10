import React from 'react'
import {useSegurancaContext} from '../contextos/SegurancaContext';

export default function SeAutenticado({children}) {
  const {loggedIn} = useSegurancaContext();

  return (
    <>    
      {loggedIn && children}
    </>
  )
}
