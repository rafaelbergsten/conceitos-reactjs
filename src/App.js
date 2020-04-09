import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App(props) {
  const [repositories, setRepository] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Desafio Novo',
      url: 'http://github.com',
      techs: ['Nodejs', 'Java'] 
    });
    
    const repository = response.data;

    setRepository([...repositories, repository]);
    
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepository(repositories.filter(repositorie => repositorie.id !== id));
    } catch (err) {
      console.log(err);
    }
    

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
