import api from './BackendService';

const USER_KEY = 'user';

const login = async (dados) => {
  const {data} = await api.post('/session', dados);

  if (data.token) {
    console.log(JSON.stringify(data));
    sessionStorage.setItem(USER_KEY, JSON.stringify(data));
    return true;
  } else {
    logout();
    return false;
  }
};

const getToken = () => {
  let user = JSON.parse(sessionStorage.getItem(USER_KEY));
  return user.token;
};

const getRoles = () => {
  if (isLoggedIn()) {
    let user = JSON.parse(sessionStorage.getItem(USER_KEY));
    return user.roles;
  } else {
    return [];
  }
};

const logout = () => {
  sessionStorage.removeItem(USER_KEY);
};

const isLoggedIn = () => {
  if (sessionStorage.getItem(USER_KEY)) {
    return true;
  } else {
    return false;
  }
};

export default {
  login,
  logout,
  isLoggedIn,
  getToken,
  getRoles
};