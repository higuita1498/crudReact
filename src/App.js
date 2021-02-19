//useState y useEffect se consideran "hoooks" useEffect sirve para cuando la pagina cargue
import React, { useState, useEffect } from 'react'
import { isEmpty, size } from 'lodash'
//shortid usado para guardar variables en memoria
// import shortid from 'shortid'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, seteditMode] = useState(false)
  const [id, setid] = useState("")
  const [error, setError] = useState(null)


  useEffect(() => {
    //como necesitamos que se ejecute solo cuando cargue la página hacemos esto:
    (async () => {
      const result = await getCollection("tasks")
      if(result.statusResponse){
        setTasks(result.data)
      }
    })()
  }, [])

  const validateForm = () => {

    let isValid = true
    setError(null)

    if(isEmpty(task)){
      setError("Debes ingresar una tarea")
      isValid = false
    }

    return isValid
  }

  const addTask = async(e) => {
    //para evitar que nos recargue la pagina por el submit
    e.preventDefault()
    
    if(!validateForm()){
      return
    }

    const result = await addDocument("tasks", {name:task})

    if(!result.statusResponse){
      setError(result.error)
      return
    }

    //para guardar la tarea en memoria.
    // const newTask = {
    //   id: shortid.generate(),
    //   name: task
    // }

    setTasks([...tasks, {id:result.data.id, name:task}])
    //Hace referencia al value del input
    setTask("")
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    seteditMode(true)
    setid(theTask.id)
  }

  const updateTask = async(e) => {
    //para evitar que nos recargue la pagina por el submit
    e.preventDefault()
    if(!validateForm()){
      return 
    }

    const result = await updateDocument("tasks",id, {name:task})

    if(!result.statusResponse){
      setError(result.error)
      return 
    }

    //Si el id del item que estoy iterando es igual me vas a reemplazar el id del item y el nombre del item
    //por el nuevo item
    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)

    //le mandamos el nuevo objeto que creamos y actualizamos las tareas
    setTasks(editedTasks)

    seteditMode(false)
    setTask("")
    setid("")

  }

    //Metodo que lista las tareas filtradas por que elimnamos una tarea
    const deleteTask = async(id) => {

      const result = await deleteDocument("tasks", id)
  
      if(!result.statusResponse){
        setError(result.error)
        return
      }
  
      const filteredTasks = tasks.filter(task => task.id !== id)
      setTasks(filteredTasks)
    }


  return (
     <div className="container mt-5">
       <h1>Tareas</h1>
       <hr/>  
          <div className="row">
            <div className="col-8">
              <h4 className="text-center">Lista de tareas</h4>
                {
                  size(tasks) === 0 ? (
                    <li className="list-group-item">Aún no hay tareas programadas.</li>
                  ) : (
                    <ul className="list-group">
                    {
                      tasks.map((task) => (
                        <li className="list-group-item" key={task.id}>
                        <span className="lead">{task.name}</span> 
                        <button className="btn btn-danger btn-sm float-right mx-2" 
                        onClick={() => deleteTask(task.id)}>
                          Eliminar
                        </button>
                        <button className="btn btn-warning btn-sm float-right"
                        onClick={() => editTask(task)}>
                          Editar</button>
                      </li>
                      ))
                    }
                    </ul>
                  )
                }  
            </div>
            <div className="col-4">
                <h4 className="center">{editMode ? "Editar Tarea" : "Agregar tarea"}</h4>
                <form onSubmit={editMode ? updateTask : addTask }>

                  {
                      error && <span className="text-danger mb-2">{error}</span>
                  }

                  <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Ingrese la tarea..." 
                  onChange={(text) => setTask(text.target.value)}
                  value={task}
                  /> 
        
                  <button className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} 
                  type="submit">{editMode ? "Editar":"Agregar"}</button>

                </form>
            </div>
          </div>  
     </div>      
  )
}

export default App
