import React, {useState, useEffect, useContext} from 'react';
import SessionService from '../services/SessionService';

const SegurancaContext = React.createContext();

export const SegurancaProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setLoggedIn(SessionService.isLoggedIn());
    setRoles(SessionService.getRoles());
  }, []);

  const login = async (dadosForm) => {
    setLoggedIn(await SessionService.login(dadosForm));
    setRoles(SessionService.getRoles());
  };

  const logout = () => {
    SessionService.logout();
    setLoggedIn(false);
    setRoles([]);
  };

  return (
    <SegurancaContext.Provider value={{loggedIn, login, logout, roles}}>
      {children}
    </SegurancaContext.Provider>
  );  

};

export const useSegurancaContext = () => useContext(SegurancaContext);

export default SegurancaContext;
