import React from 'react';
import { Link } from 'react-router-dom';
import {useSegurancaContext} from '../contextos/SegurancaContext';
import SeAutenticado from './SeAutenticado';
import SeTemPermissao from './SeTemPermissao';


export default function BoasVindas() {
  const {loggedIn, logout} = useSegurancaContext();

  return (
    <div>
      <h3>Boas Vindas ao Sistema</h3>
      <ul>
        <SeAutenticado><li>TESTE</li></SeAutenticado>
        { !loggedIn && (<li><Link to="/login">Login</Link></li>) }
        <li><Link to="/postagens">Postagens</Link></li>
        { loggedIn && (<li><a href="#" onClick={() => logout()}>Logout</a></li>) }
        <SeTemPermissao rolesPermitidos={['admin']}>
          <li>É admin !</li>
        </SeTemPermissao>
        <SeTemPermissao rolesPermitidos={['guest']}>
          <li>É guest !</li>
        </SeTemPermissao>
        <SeTemPermissao rolesPermitidos={['admin', 'user']}>
          <li>É admin e user!</li>
        </SeTemPermissao>
      </ul>
    </div>
  )
}
