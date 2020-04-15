import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [projects, setProjects ] = useState([]);
  async function getRepositories() {
    const { data: repositories } = await api.get('repositories');
    setProjects(repositories);
  }

  async function handleAddRepository() {
    try {
      const { data: project } = await api.post('repositories', {
        title: `Novo repositório ${new Date().toLocaleString()}`,
        url: `http://noverepositorio${Date.now()}.com`,
        techs: ['Tech A', 'Tech B', 'Tech C'],
      })
      setProjects([...projects, project]);
    } catch(error) {
      console.error(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const projectsFiltered = projects.filter(project => project.id !== id);
      setProjects(projectsFiltered);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRepositories();
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.length > 0 && projects.map(project => (
            <li key={project.id}>
              <strong>{project.title}</strong> &nbsp; ({project.url})
              [{project.techs.map(tech => <span key={tech}>{tech}, </span>)}]

              <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
      {!projects.length && <p><strong>Ainda não há repositórios cadastrados!</strong></p>}

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
