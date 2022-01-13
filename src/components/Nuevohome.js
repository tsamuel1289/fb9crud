import React , {useState, useEffect} from 'react'
import NoSleep from 'nosleep.js'
import firebaseApp from "../credentials"
import {getFirestore, doc, getDoc} from 'firebase/firestore'
import {Link} from 'react-router-dom'

const db = getFirestore(firebaseApp)


const Nuevohome = () => {

    var noSleep = new NoSleep();
    document.addEventListener('click', function enableNoSleep() {
        document.removeEventListener('click', enableNoSleep, false);
        noSleep.enable();
      }, false);

    

    // USESTATES
    const [dataDom, setDataDom] = useState([])

    const getDom = async () => {
        let arraySnap = await getDoc(doc(db, 'domingo', 'dom'))
        let arraySongs = arraySnap.data().array

        arraySongs.forEach( async (song) => {
            let songSnap = await getDoc(doc(db, 'canciones', song))
            let songwId = Object.assign(songSnap.data() , {id: song})
            setDataDom(dataDom => [...dataDom, songwId ])
        })
    }
    useEffect( () => getDom(), [] )
    
    
    return(<>
        {
            dataDom.map( (ss) => {
                return(<>    
                    <Link to = {`/contenido/${ss.id}`} style={{color: 'black' ,textDecoration: 'none'}}>
                        <div key={ss.id} >
                            <b>{ss.titulo}</b><br /><small>{ss.artista}</small><hr />  
                        </div>
                    </Link> 
                </>)
            })
        }
        
        
    </>)
    
}
export default Nuevohome