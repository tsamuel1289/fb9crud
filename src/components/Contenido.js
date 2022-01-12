import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import firebaseApp from '../credentials'
import {getFirestore, doc , getDoc} from 'firebase/firestore'

const db = getFirestore(firebaseApp)


const Contenido = () => {
    
    const {id} = useParams()
    const [song , setSong] = useState({})
    const [espacioContenido, setEspacioContenido] = useState()
    

    const getSong = async (idSong) => {
        const snapSong = await getDoc(doc(db, 'canciones' , idSong))
        setSong(snapSong.data())
    }
    useEffect( () => getSong(id), [] )
    

    return(<>
        <div>{song.titulo} <br /> <small>{song.artista}</small> </div><hr />
        <div><pre>{espacioContenido}</pre></div>




        <div className = 'navAbajo'>
            <div onClick = {()=> setEspacioContenido(song.contenido)}>One</div>
            <div>Two</div>
            <div>Three</div>
        </div>
    </>)
}
export default Contenido