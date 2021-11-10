import React from 'react'
import {useSegurancaContext} from '../contextos/SegurancaContext'

export default function Rodape() {
  const {loggedIn} = useSegurancaContext();

  return (
    <div>
      <h1>Rodapé - Está logado: {loggedIn ? 'true' : 'false'}</h1>
    </div>
  )
}
