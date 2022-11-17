import { useState , useEffect} from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [listaRemision, setListaRemision] = useState([]);
  const [remisiones, setRemisiones] = useState([]);
  const [cargando, setCargando] = useState(true);  

  useEffect(() => {
    
    fetch('https://vercel-api-eta.vercel.app/api/listaremision')
    .then((response) => response.json())
    .then((data) => setListaRemision(data));

    fetch('https://vercel-api-eta.vercel.app/api/remisiones')
    .then((response) => response.json())
    .then((data) => setRemisiones(data))
    .then(setCargando(false));

  },[])

  const Mostrar_listaRemision = () =>
    <div className='listaRemision'>    
      {listaRemision.map(item =>        
        <div className='listaRemision_item' key={item.folio}>
          <p>folio: {item.folio}</p>            
          <p>cliente: {item.cliente}</p> 
          <p>domicilio: {item.domicilio}</p> 
          <p>total: {item.total}</p>
          <Mostrar_remisiones folio={item.folio} total={item.total}/>          
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
        <div className='Remision_item' key={index} style= {comparar_totales(props.folio, props.total) ? {background : 'none'} : {background : 'red'}}>
          <div className='fila'>
            <p>{item_remision.cantidad}</p> 
            <p> - {item_remision.producto}</p> 
          </div>
          <p style={{textAlign: 'end'}}>$ {item_remision.total}</p>
        </div> 
      )}
    </div>
  
  const comparar_totales = (folio, total) =>{
    let result = true;
    let suma = 0;
    let remisiones = filtrar_remisiones(folio);    
    remisiones.forEach(item =>{
      suma += parseFloat(item.total);
    })    
    total = parseFloat(total);    
    total == suma ? result = true : result = false;    
    return result;
  }

  const comprobar_estado = () =>{
    let estado = true;
    listaRemision.forEach(item => {
      if (!comparar_totales(item.folio, item.total))
        estado = false;
    })  
    return estado;
  }

  return (
    <div className="App">      
        
      {cargando ?           
          <h1>Cargando...</h1>       
      :
        <>
          <h1>estado de las notas: </h1>
          {comprobar_estado() ?  
            <h1 style={{color : 'green'}}> correcto </h1>
          :
            <h1 style={{color : 'red'}}> con error </h1>
          }
          <Mostrar_listaRemision/>
      </>
      }      
      
    </div>
  )
}

export default App
