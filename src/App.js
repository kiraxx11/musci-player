
import { useState } from 'react';
import {Formik,Form,Field} from 'formik'
import {getAlbums} from './functions/api.js'
import './styles/header.css'
import {Player} from './components/Player.js'




function App() {
  const [songs, setsongs] = useState([])
  const [played, setplayed] = useState("");
 
  const currentSong=(song)=>{
    setplayed(song)
    
  }

  return (
    
    <div className="">
      
        <header>
          
          <h1>Music App</h1>
          <Formik initialValues={{search:''}} onSubmit={async values=>{
            const response=await getAlbums(values.search,setsongs)
            
            
          }}>
            <Form>
              <Field name='search'/>
            </Form>
          </Formik>
        </header>
          <div>
          
            <div className='container'>
              {songs.map(song => <section key={song.id} onClick={()=>currentSong(song)}>
                <img src={song.album.cover_big}/>
                <div className='info'>
                <p className='songName'>
                  {song.title}
                </p>
                <p className='artist'>
                {song.artist.name}
                </p>
                </div>
                
              </section>)}
            </div>
          </div>
          <Player className='playerBott' song={played} ></Player>
    </div>
  );
}

export default App;
