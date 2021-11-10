import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import RotaPrivada from './componentes/RotaPrivada';
import Postagens from './componentes/Postagens';
import Login from './componentes/Login';
import NaoEncontrada from './componentes/NaoEncontrada';
import BoasVindas from './componentes/BoasVindas';
import Cabecalho from './componentes/Cabecalho';
import Rodape from './componentes/Rodape';
import {SegurancaProvider} from './contextos/SegurancaContext';

function App() {
  return (
    <SegurancaProvider>
      <Router>
        <Cabecalho/>
        <Switch>
          <Route path="/" exact={true}><BoasVindas/></Route>
          <RotaPrivada path="/postagens" component={Postagens}/>
          <Route path="/login"><Login/></Route>
          <Route path="*"><NaoEncontrada/></Route>
        </Switch>
        <Rodape/>
      </Router>
    </SegurancaProvider>
  );
}

export default App;
