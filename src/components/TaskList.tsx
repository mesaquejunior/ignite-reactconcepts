import { useState } from 'react'
import nextId from 'react-id-generator'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const repeated = tasks.map((task) => task.title).indexOf(newTaskTitle)
    if (repeated === -1 && newTaskTitle !==  '') {
      setTasks([...tasks, {
        id: nextId(),
        title: newTaskTitle,
        isComplete: false
      }])
    }
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: string) {
    const newTasks = [...tasks]
    const taskid = newTasks.map((task) => task.id).indexOf(id)
    newTasks[taskid].isComplete = !newTasks[taskid].isComplete
    setTasks(newTasks)    
  }

  function handleRemoveTask(id: string) {
    const newTasks = [...tasks]
    const taskid = newTasks.map((task) => task.id).indexOf(id)
    newTasks.splice(taskid, 1)
    setTasks(newTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}