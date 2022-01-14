import React, {useState, useEffect} from 'react'

const Contenido = () => {
    
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
        <div style = {{display : videoVis ? 'block' : 'none'}} >
            <iframe width="350" height="50" src={`https://www.youtube.com/embed/${song.url}`}></iframe>
        </div>
        <audio src="gs://fb9crud.appspot.com/diosdepactos.mp3" />
       <div><pre>{espacioContenido}</pre></div>


        <div className = 'navAbajo'>
            <div onClick = {() => setEspacioContenido(song.letra)}>Letra</div>
            <div onClick = {()=> setEspacioContenido(song.acordes)}>Acordes</div>
            <div onClick = {() => setVideoVis(!videoVis)}>Video</div>
        </div>
    </>)
}
export default Contenido