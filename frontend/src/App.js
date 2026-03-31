import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchTasks = async (filterPath = "") => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks${filterPath}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return alert("O título é obrigatório!");

    try {
      await axios.post("http://localhost:5000/tasks", {
        title: title,
        description: description,
        priority_level: priority,
      });
      setTitle("");
      setDescription("");
      setPriority("Medium");
      fetchTasks(); 
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
      }
    }
  };

  const toggleComplete = async (task) => {
    try {
      const newStatus = task.status ? 0 : 1;
      
      await axios.put(`http://localhost:5000/tasks/${task.id}`, {
        title: task.title, 
        description: task.description, 
        priority_level: task.priority_level, 
        status: newStatus,   
      });
      
      fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar. Verifique a conexão com o servidor.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTasks(`?title=${searchTerm}`);
  };

  return (
    <div className="App">
      <h1>FocusTask</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Título da tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição curta (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-row">
          <label>Prioridade: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Baixa</option>
            <option value="Medium">Média</option>
            <option value="High">Alta</option>
          </select>
          <button type="submit">Adicionar Tarefa</button>
        </div>
      </form>

      <hr />

      <form onSubmit={handleSearch} className="search-bar">
        <input 
          type="text" 
          placeholder="Pesquisar tarefa pelo nome..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={() => { setSearchTerm(""); fetchTasks(""); }}>Limpar</button>
      </form>

      <div className="filters">
        <button onClick={() => fetchTasks("")}>Todas</button>
        <button onClick={() => fetchTasks("?status=pending")}>Pendentes</button>
        <button onClick={() => fetchTasks("?status=completed")}>Concluídas</button>
        <button onClick={() => fetchTasks("?priority_level=High")}>Alta Prioridade</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-msg">Nenhuma tarefa encontrada.</p>
        ) : (
          tasks.map((task) => (
            <div 
              key={task.id} 
              className={`task-card ${task.priority_level} ${task.status ? "completed" : ""}`}
            >
              <div className="task-content">
                <h3 style={{ textDecoration: task.status ? "line-through" : "none" }}>
                  {task.title}
                </h3>
                <p>{task.description}</p>
                <span className="priority-badge">Prioridade: {task.priority_level}</span>
              </div>

              <div className="task-actions">
                <button 
                  className="status-btn" 
                  onClick={() => toggleComplete(task)} 
                >
                  {task.status ? "Reabrir" : "Concluir"}
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteTask(task.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
