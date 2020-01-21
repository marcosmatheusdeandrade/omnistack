import React, {useState, useEffect} from 'react';

import './global.css'
import './App.css'
import './Main.css'
import './Sidebar.css'
import api from './services/api'

function App() {

  const [devs, setDevs] = useState([]);
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      }
      , (err) => {
        console.log(err);
      },
      // parametros que vai passar para a function getCurrentPosition 
      {
        timeout: 30000,
      }
    )

  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithub_username('');
    setTechs('');

    setDevs([...devs, response.data])
  }

  return (
   <div id="app"> 
   
      <aside>
        <strong> Cadastrar </strong>

        <form>

          <div className="input-block">
            <label htmlFor="username_github"> Usuário do Github</label>
            <input 
                name="github_username"
                id="username_github"
                onChange={e => setGithub_username(e.target.value)}
                 />
          </div>
            
          <div className="input-block">
            <label htmlFor="techs"> Tecnologias</label>
            <input 
                name="techs"
                id="techs"
                onChange={e => setTechs(e.target.value)}
                 />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude"> Longitude</label>
              <input 
                  type="number"
                  name="latitude"
                  value={latitude}
                  id="latitude"
                  onChange={e => setLatitude(e.target.value)}
                   />
            </div>

            <div className="input-block">
              <label htmlFor="longitude"> Longitude</label>
              <input 
                  type="number"
                  name="longitude"
                  value={longitude}
                  id="longitude"
                  onChange={e => setLongitude(e.target.value)}
                   />
            </div>

          </div>

          <button type="submit" onClick={handleAddDev}> Salvar </button>
        </form>
      </aside>

      <main>

          <ul>
            {devs.map(dev => (
             
              <li className="dev-item"> 
                  <header>
                    
                    <img src={dev.avatar_url}
                        alt="Teste" />

                      <div className="user-info">
                        <strong>{dev.name}</strong>
                        <span> {dev.techs.join(', ')}</span>
                      </div>
                  </header>
                  <p> {dev.bio}</p>
                  <a href={`https://github.com/${dev.github_username}`}>Acessar Perfil no Git</a>
              </li>
            ))}
          </ul>

      </main>
   </div>
  );
}

export default App;
