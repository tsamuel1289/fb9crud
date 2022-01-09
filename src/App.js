import React, {useState, useEffect} from 'react';
import firebaseApp from './credentials'
import {getFirestore, collection, doc, setDoc , getDoc, getDocs} from 'firebase/firestore'
const db = getFirestore(firebaseApp)


function App() {
  const [listadoIds, setListadoIds] = useState([])
  const [listadoTotal, setListadoTotal] = useState([])
  const [prDom, setPrDom] = useState([])
  const cancionesRef = collection(db, 'canciones')
  const [toSave, setToSave] = useState(null)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    
    let titulo = e.target.titulo.value
    let artista = e.target.artista.value
    let contenido = e.target.contenido.value
    
    const objFromForm = { titulo, artista, contenido }
    setToSave(objFromForm)
    await setDoc(doc(cancionesRef), objFromForm)
  }
  
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
      console.log(docTotal)
    })
    setListadoTotal(docTotal) //lo guarda en el useState
    console.log(listadoTotal)
  }
  //useEffect(()=>{ inicioPag() }, [])
  
  const domingoRef = collection(db, 'domingo')
  const addToSun =  async (key) => {
    await setDoc(doc(domingoRef) , {can: key} )
  }

  const printDomingo = () => {
    let domObjects = []
    listadoIds.forEach( async (rr) => {
      const rrstr = toString(rr) 
      
      const docRef = doc(db, "domingo" , rrstr)
      
      const docSnap = await getDoc(docRef)
      //domObjects.push(docSnap.data())
      //console.log(docSnap.data())

     /* if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }*/


      console.log(docSnap.data())
    })
  }

  const getSoloDom = async () => {
    const querySnapshot = await getDocs(collection(db, "domingo"))
    let listDomIds = []
    querySnapshot.forEach((dd)=> {
      listDomIds.push(dd.data().can)
    })
    setListadoIds(listDomIds)
  } 
  useEffect( ()=> getSoloDom(), [])
  
  printDomingo()
  //useEffect( ()=> printDomingo(), []) 
  


  return (
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

      <h1>Lista Dom</h1>

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
