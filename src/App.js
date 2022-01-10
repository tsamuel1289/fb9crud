import React, {useState, useEffect} from 'react';
import firebaseApp from './credentials'
import {getFirestore, collection, doc, setDoc , getDoc, getDocs} from 'firebase/firestore'
const db = getFirestore(firebaseApp)

function App() {
  // USESTATES
  const [cancionesDomingo, setCancionesDomingo] = useState([])
  const [listadoIds, setListadoIds] = useState([])
  const [listadoTotal, setListadoTotal] = useState([])
  const [toSave, setToSave] = useState(null)
  
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
  
  
  const domingoRef = collection(db, 'domingo')
  const addToSun =  async (key) => {
    await setDoc(doc(domingoRef) , {can: key} )
  }
  
  //ADQUIRIR DATOS --------------------------------------------------
  const getSoloDom = async () => {
    const querySnapshot = await getDocs(collection(db, "domingo"))
    querySnapshot.forEach((dd)=> {
      setListadoIds(listadoIds.push(dd.data().can))
    })
  } 
  const printDomingo = async () => {
    await getSoloDom()
    
    let acuSongs = []
    listadoIds.forEach( async (rr) => {
      const docRef = doc(db, "canciones" , rr)
      const docSnap = await getDoc(docRef)
      acuSongs.push(docSnap.data())
    })
    setCancionesDomingo(acuSongs)
  }
  useEffect( ()=> printDomingo(), []) 
  
  
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
  //useEffect(()=> inicioPag() , [])

  const ejecutar = () => {
    console.log(cancionesDomingo)
  }
  
  const rep = () => {cancionesDomingo.map((yy) => {
    console.log(yy.titulo)
    return (<div>{yy.titulo}</div>)

  })

  }


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

      <button onClick={ejecutar}>Ejecutar</button>
      
      {setTimeout(rep, 1000)}
      {console.log('count')}


      <hr />
      <hr />


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
