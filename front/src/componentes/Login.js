import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useSegurancaContext} from '../contextos/SegurancaContext';

const criaFormEmBranco = () => {
  return {
    email: '',
    senha: ''
  };
};

function Login() {
  const [form, setForm] = useState(criaFormEmBranco());
  const history = useHistory();
  const {login} = useSegurancaContext();

  const setValor = (evento, campo) => {
    setForm({...form, [campo]: evento.target.value});
  };

  const submeter = async (evento) => {
    evento.preventDefault();
    let dadosForm = {...form};
    setForm(criaFormEmBranco());
    await login(dadosForm);
    history.push('/');
  };

  return (
    <form onSubmit={(e) => submeter(e)}>
      <fieldset>
        <legend>Login</legend>
        <div>
          <label>Email:</label>
          <input type="text" name="email" value={form.email} onChange={(e) => setValor(e, 'email')}/>
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" name="senha" value={form.senha} onChange={(e) => setValor(e, 'senha')}/>
        </div>
        <div>
          <input type="submit" value="Entrar"/>
        </div>
      </fieldset>
    </form>
  );
}

export default Login;
