import React from 'react';
import { useSegurancaContext } from '../contextos/SegurancaContext';

export default function SeTemPermissao({children, rolesPermitidos}) {
  const {loggedIn, roles} = useSegurancaContext();

  const contemRoles = () => {
    return rolesPermitidos.every(elem => roles.indexOf(elem) > -1);
  };

  return (
    <>
      {loggedIn && contemRoles() && children}
    </>
  )
}
