import React, {useState, useEffect} from 'react';
import firebaseApp from './credentials'
import {getFirestore, collection, doc, setDoc , getDoc, getDocs, query, where} from 'firebase/firestore'
const db = getFirestore(firebaseApp)

function App() {
  // USESTATES
  const [listadoTotal, setListadoTotal] = useState([])
  const [toSave, setToSave] = useState(null)
  const [cancionesDomingo, setCancionesDomingo] = useState([])
  
  const submitHandler = async (e) => {
    e.preventDefault()
    
    let titulo = e.target.titulo.value
    let artista = e.target.artista.value
    let contenido = e.target.contenido.value
    
    const objFromForm = { titulo, artista, contenido }
    const cancionesRef = collection(db, 'canciones')
    setToSave(objFromForm)
    await setDoc(doc(cancionesRef), objFromForm)
  }
  
  const addToSun =  async (key) => {
    const querySnapshot = await getDoc(doc(db, "domingo", "dom"))
    let actualArray = querySnapshot.data().array
    actualArray.push(key)
    let nuevoObj = {array: actualArray}
    console.log(nuevoObj)
    await setDoc(doc(db, "domingo", "dom"), nuevoObj )
  }
  
  //ADQUIRIR DATOS --------------------------------------------------
  
  const printDomingo = async () => {
    
    const arraySnapshot = await getDoc(doc(db, "domingo", "dom"))
    let acuIds = arraySnapshot.data().array 
    
    acuIds.forEach( async (rr) => {
      const docSnap = await getDoc(doc(db, "canciones", rr))
      let nuevoObj = docSnap.data()
      setCancionesDomingo([...cancionesDomingo, nuevoObj])
      console.log(cancionesDomingo)
      
      //console.log(acuSongs)
      
    })
    console.log(cancionesDomingo)
    
    
    
  }
  useEffect( ()=> {printDomingo()}, []) 
    
  //GENERA LA LISTA DEL INICIO
  const inicioPag = async () => {
    //SOLO UN DOCUMENTO
    //const docRef = doc(db, "canciones", "7rEvNzUfny6vISE2wwyb");
    //const docSnap = await getDoc(docRef);
    //console.log(docSnap.data())
    
    //TODA LA COLECCION
    const querySnapshot = await getDocs(collection(db, "canciones"))
    let docTotal = []
    let docComp = null
    querySnapshot.forEach((doc) => {
      let id = {id: doc.id}
      docComp = Object.assign(id, doc.data())
      docTotal.push(docComp)
    })
    setListadoTotal(docTotal) //lo guarda en el useState
    
  }
  useEffect(()=> inicioPag() , [])

  const ejecutar = () => {
    setDoc(doc(db, "domingo", "dom"), {array: []})
  }
  //console.log(cancionesDomingo)
  return  (
    <div>
      <h1>Hola hola</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Titulo' id='titulo' />
        <input type="text" placeholder='Artista' id='artista' />
        <textarea placeholder='Contenido' id = 'contenido' name="" cols="30" rows="10">
        </textarea><br />
        <button type='submit'>Guardar</button>
      </form>

      <hr />

      <button onClick={ejecutar}>Limpiar</button>
      <button onClick={printDomingo}>mostrar</button>

      <hr />
      <hr />
      
      {
      cancionesDomingo.map((yy)=> {
        
        return(<div >{yy.titulo}</div>)
      }) 
      }
      <hr /> <hr />
      
      {listadoTotal.map((dd) => {
        
        return (<div key={dd.id}>
          <button onClick={() => addToSun(dd.id) }>add</button>
          <h4>{dd.titulo} - {dd.artista}</h4>
          <pre><b>{dd.contenido}</b> </pre>
          <hr />
        </div>)
      })}



    </div>
  );
}

export default App;
