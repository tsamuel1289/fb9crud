import React, {useState, useEffect} from 'react';
import firebaseApp from '../credentials'
import {getFirestore, collection, doc, setDoc , getDoc, getDocs} from 'firebase/firestore'
const db = getFirestore(firebaseApp)

function Iniciopractica() {
  // USESTATES
  const [cancionesDomingo, setCancionesDomingo] = useState([])
  const [listadoTotal, setListadoTotal] = useState([])
  const [toSave, setToSave] = useState(null)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    
    let titulo = e.target.titulo.value
    let artista = e.target.artista.value
    let bpm = e.target.bpm.value
    let url = e.target.url.value
    let letra = e.target.letra.value
    let acordes = e.target.acordes.value
    
    const objFromForm = { titulo, artista, bpm, url, letra, acordes }
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
  
  //ADQUIRIR DATOS DOMINGO
  const printDomingo = async () => {
    
    const arraySnapshot = await getDoc(doc(db, "domingo", "dom"))
    let acuIds = arraySnapshot.data().array 
    
    acuIds.forEach( async (rr) => {
      const docSnap = await getDoc(doc(db, "canciones", rr))
      let idComp = Object.assign(docSnap.data() , {id: rr})
      setCancionesDomingo(cancionesDomingo => [...cancionesDomingo, idComp])
    })
  }
  useEffect( ()=> printDomingo(), []) 
    
  //GENERA LA LISTA DEL INICIO
  const inicioPag = async () => {
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

  const limpiar = () => {
    setDoc(doc(db, "domingo", "dom"), {array: []})
  }
  
  return  (
    <div>
      <h3>Inicio practica</h3>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Titulo' id='titulo' />
        <input type="text" placeholder='Artista' id='artista' />
        <input type="number" placeholder='BPM' id='bpm' />
        <input type="text" placeholder='URL' id='url' />
        <textarea placeholder='Letra' id = 'letra' name="" cols="30" rows="10">
        </textarea><br />
        <textarea placeholder='Acordes' id = 'acordes' name="" cols="30" rows="10">
        </textarea><br />
        <button type='submit'>Guardar</button>
      </form>

      <hr />

      <button onClick={limpiar}>Limpiar</button>
      <button onClick={printDomingo}>mostrar</button>

      <hr /> <hr />
      
      {cancionesDomingo.map((yy)=> {
        return(<div key = {yy.id}>{yy.titulo}</div>)
      }) }

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

export default Iniciopractica;