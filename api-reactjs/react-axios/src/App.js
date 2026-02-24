import React, {useEffect, useState} from "react";
import api from "./services/api";
import './App.css';

export default function App() {
    const [username, setUsername] = useState('zCaiP');
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    //carrega dados da API
    useEffect(() =>{
      async function loadData(userToSearch = username){
        try{
          setLoading(true);
          setError(null);

          //carrega dados do usuário
          const userResponse = await api.get(`/users/${userToSearch}`); //API Responde com os dados do usuário
          setUser(userResponse.data); // Extrai os dados da API

          const reposReponse = await api.get(`/users/${userToSearch}/repos?per_page=6&sort=updated`);
          setRepos(reposReponse.data);

        } catch(error){
          console.error('Erro', error)
          setError(`Usuário ${userToSearch} não encontrado`);

        } finally{
          setLoading(false);
        }
        loadData();
      }
    }, []);

    if (loading){
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Carregando Perfil...</p>
        </div>
      );
    }

    if (error || !user){
      return (
        <div className="error-container">
          <h2> ❌ {error}</h2>
          <button onClick={ () => window.location.reload()}>Tentar Novamente</button>

        </div>
      )
    }


    return (
      <div className="app-container">
        <div className="profile-card"></div>

      </div>
      );
}