import React, {useState} from 'react';
import firebaseApp from './credentials'
import {getFirestore, collection, doc, setDoc , getDoc, getDocs} from 'firebase/firestore'
import { useEffect } from 'react/cjs/react.development';

const db = getFirestore(firebaseApp)


function App() {

    const cancionesRef = collection(db, 'canciones')
    const [toSave, setToSave] = useState(null)
    
    const submitHandler = async (e) => {
      e.preventDefault()
      
      let titulo = e.target.titulo.value
      let artista = e.target.artista.value
      let contenido = e.target.contenido.value

      const objFromForm = {
        titulo,
        artista,
        contenido
      }
      setToSave(objFromForm)
      await setDoc(doc(cancionesRef), objFromForm)
    }
    
    const inicioPag = async () => {
      //SOLO UN DOCUMENTO
      const docRef = doc(db, "canciones", "7rEvNzUfny6vISE2wwyb");
      const docSnap = await getDoc(docRef);

      //console.log(docSnap.data())

      //TODA LA COLECCION

      const querySnapshot = await getDocs(collection(db, "canciones"))

      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=" , doc.data())
      })

    
    }
    inicioPag()

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

     

    </div>
  );
}

export default App;
