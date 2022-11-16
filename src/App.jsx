import { useState , useEffect} from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [listaRemision, setListaRemision] = useState([]);
  const [remisiones, setRemisiones] = useState([]);
  const [sumaRemsion, setSumaRemision] = useState(0);

  useEffect(() => {
    
    fetch('https://vercel-api-eta.vercel.app/api/listaremision')
    .then((response) => response.json())
    .then((data) => setListaRemision(data));

    fetch('https://vercel-api-eta.vercel.app/api/remisiones')
    .then((response) => response.json())
    .then((data) => setRemisiones(data));
  },[])

  const Mostrar_listaRemision = () =>
    <div className='listaRemision'>    
      {listaRemision.map(item =>        
        <div className='listaRemision_item' key={item.folio}>
          <p>folio: {item.folio}</p>            
          <p>cliente: {item.cliente}</p> 
          <p>domicilio: {item.domicilio}</p> 
          <p>total: {item.total}</p>
          {console.log('comparacion de sumas del folio '+ item.folio +': '+ sumaRemsion+'    '+item.total)}
          <Mostrar_remisiones folio={item.folio}/>
        </div>
      )}
    </div>

  const filtrar_remisiones = (folio) =>{    
    let remisionFiltrada = remisiones.filter(item => item.folio == folio);
    return(remisionFiltrada);
  }

  const Mostrar_remisiones = (props) =>
    <div className='Remisiones'> 
      {filtrar_remisiones(props.folio).map((item_remision, index) =>
        <div className='Remision_item' key={index}>
          <div className='fila'>
            <p>{item_remision.cantidad}</p> 
            <p> - {item_remision.producto}</p> 
          </div>
          <p style={{textAlign: 'end'}}>$ {item_remision.total}</p> 
          
        </div> 
      )}
    </div>

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React prueba</h1>
      <Mostrar_listaRemision/>      
    </div>
  )
}

export default App
