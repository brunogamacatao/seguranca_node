import axios from 'axios';
import React, {useState, useEffect} from 'react';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  let token = sessionStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));


const criaFormEmBranco = () => {
  return {
    username: '',
    password: ''
  };
};

function App() {
  const [form, setForm] = useState(criaFormEmBranco());
  const [mensagem, setMensagem] = useState('');
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLogado(true);
    }
  }, []);

  const setValor = (evento, campo) => {
    setForm({...form, [campo]: evento.target.value});
  };

  const submeter = async (evento) => {
    setMensagem('Fazendo login...');

    evento.preventDefault();
    let dadosForm = {...form};
    setForm(criaFormEmBranco());

    try {
      const {data} = await api.post('/session', dadosForm);
      sessionStorage.setItem('token', data.token);
      setMensagem('Login realizado com sucesso!');
      setLogado(true);
    } catch (erro) {
      const {response: {data: {message}}} = erro;
      setMensagem(message);
      setLogado(false);
    }
    
  };

  const requisicaoSegura = async () => {
    const data = await api.delete('/produtos');
    console.log(data);
  };

  const logout = () => {
    setLogado(false);
    sessionStorage.removeItem('token');
  };

  return (
    <>
    <form onSubmit={(e) => submeter(e)}>
      <fieldset>
        <legend>Login</legend>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={form.username} onChange={(e) => setValor(e, 'username')}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={(e) => setValor(e, 'password')}/>
        </div>
        <div>
          <input type="submit" value="Entrar"/>
        </div>
      </fieldset>
    </form>
    <hr/>
    <h3>{mensagem}</h3>
    { logado ? (
      <>
      <button onClick={() => requisicaoSegura()}>Requisição Segura</button><br/>
      <button onClick={() => logout()}>Logout</button><br/>
      </>
      ) : '' }
    </>
  );
}

export default App;
