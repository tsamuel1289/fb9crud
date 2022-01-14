import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import {downHalfTone} from './functions'
const Contenido = () => {
    
    




    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    const [videoVis, setVideoVis] = useState(false)
    const [song , setSong] = useState({})
    
    const [espacioContenido , setEspacioContenido] = useState('')
    
    const getSong =  async () => {
        const songData = await JSON.parse(localStorage.getItem('song'))
        setSong(songData)
        setEspacioContenido(songData.letra)
    }
    useEffect( () => getSong(), [] )

   
    
    return(<>
        
       <div><b>{song.titulo}</b></div>
       <div >{song.artista}</div><hr />
       
        
       <div className = 'espacioContenido'><pre>{espacioContenido} </pre></div>

        <div className = 'videoEspacio'>
            <ReactPlayer className = 'videoYT' url={`https://www.youtube.com/watch?v=${song.url}`} height='70px' width='150px' controls= {true} light={true} playing={true} loop={true}/>
        </div>

        <div className = 'navAbajo'>
            <div onClick = {() => setEspacioContenido(song.letra)}>Letra</div>
            <div onClick = {()=> setEspacioContenido(song.acordes)}>Acordes</div>
            <div onClick = {() => setVideoVis(!videoVis)}>Video</div>
            <div onClick = {()=> setEspacioContenido(downHalfTone(espacioContenido))}>Tono</div>
        </div>
    </>)
}
export default Contenido