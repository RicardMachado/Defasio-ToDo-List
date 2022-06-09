import { ChangeEvent, FormEvent, useState } from "react";
import { Header } from "./components/Header";
import { PlusCircle, Trash } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import clipboard from "./assets/clipboard.svg";
import "./global.css";
import styles from "./App.module.css";

interface ITask {
  id: number;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleNewTask() {
    if (!newTaskTitle) return;

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isComplete: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const editTasks = tasks.map( task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task );
    setTasks(editTasks)
  }

  function handleRemoveTask(id: number) {
    const filteredTask  = tasks.filter(task => task.id != id);
    setTasks(filteredTask);
  }

  const totalTasks = tasks.length
  const TaskComplete = tasks.filter( task => task.isComplete === true)

  return (
    <div>
      <Header />

      <div className={styles.newTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button type="submit" onClick={handleNewTask}>
          Criar
          <PlusCircle size={16} />
        </button>
      </div>

      <div className={styles.Task}>
        <div className={styles.createTask}>
          <p>Tarefas Criadas</p>
          <span>{totalTasks}</span>
        </div>

        <div className={styles.completedTask}>
          <p>Concluídas</p>
          <span>{TaskComplete.length} de {totalTasks}</span>
        </div>
      </div>

      <main>
        { tasks.length >= 1 ?
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={styles.task}>
                  <input
                    type="checkbox" 
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)} 
                  />
                  <p className={task.isComplete ? styles.taskComplete : ''}>{task.title}</p>
                  <button type="button" onClick={() => handleRemoveTask(task.id)}>
                    <Trash size={24} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        :
          <div className={styles.listTask}>
            <img src={clipboard}/>
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        }
      </main>
    </div>
  );
}

export default App;