import React, { useState, useEffect } from 'react'
import NoSleep from 'nosleep.js'
import firebaseApp from "../credentials"
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

import useSound from 'use-sound'
import click1 from '../styles/click1.mp3'

const db = getFirestore(firebaseApp)


const Nuevohome = () => {

    const ws = new WebSocket('ws://localhost:10000')
    
    ws.onopen = () => {
        console.log('conectado a ws')
    }
    const sendtows = () => {
        const data = {
            name: 'pedro',
            message: 'hola amigos'
        }
        ws.send(console.log('hola hola'))
    }

    const [play] = useSound(click1)

    let son = null
    let change = false
    const intervalo = (r) => {

        if (r) {

            son = setInterval(() => play(), 1000)
            console.log(son)
            change = true
        }else{
            clearInterval(son)
            change = false
        }

    

    }

    
    /*var noSleep = new NoSleep();
    document.addEventListener('click', function enableNoSleep() {
        document.removeEventListener('click', enableNoSleep, false);
        noSleep.enable();
      }, false);*/

    // USESTATES
    const [dataDom, setDataDom] = useState([])

    const getDom = async () => {
        let arraySnap = await getDoc(doc(db, 'domingo', 'dom'))
        let arraySongs = arraySnap.data().array

        arraySongs.forEach(async (song) => {
            let songSnap = await getDoc(doc(db, 'canciones', song))
            let songwId = Object.assign(songSnap.data(), { id: song })
            setDataDom(dataDom => [...dataDom, songwId])
        })
    }
    useEffect(() => getDom(), [])

    const enviarSong = (titulo, artista, bpm, url, letra, acordes) => {
        const song = { titulo, artista, bpm, url, letra, acordes }
        localStorage.setItem('song', JSON.stringify(song))
    }

    return (<>
        <button onClick={() => intervalo(!change)}>sonido</button>
        {
            dataDom.map((ss) => {
                return (<>
                    <Link key={ss.id} to={'/contenido'} className='listaDom'>
                        <div onClick={() => enviarSong(ss.titulo, ss.artista, ss.bpm, ss.url, ss.letra, ss.acordes)}>
                            <b>{ss.titulo}</b><br /><small>{ss.artista}</small><hr />
                        </div>
                    </Link>
                </>)
            })
        }
        <button onClick = {()=> sendtows()}>Prueba WS</button>


    </>)

}
export default Nuevohome