import React from 'react'
import {useSegurancaContext} from '../contextos/SegurancaContext'

export default function Cabecalho() {
  const {loggedIn} = useSegurancaContext();

  return (
    <div>
      <h1>Cabeçalho - Está logado: {loggedIn ? 'true' : 'false'}</h1>
    </div>
  )
}
