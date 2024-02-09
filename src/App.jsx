import './App.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt, FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [tasks, setTasks] = useState([]);

  // add new Task handler
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      console.log("Task:", { id: Date.now(), text: newTask, completed: false, priority });
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority }]);
      setNewTask('');
    }
  };
  // Delete task Handler
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // TODO
  const updateTask = id => {

  }

  // Mark As Complete Handler
  const toggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className='bg-gradient-to-r to-violet-600 from-violet-400 h-screen'>
      <h1 className='hidden lg:block text-2xl  text-center font-bold uppercase pt-10 mb-5'>Todo List Application</h1>
      <div className='max-w-5xl mx-auto h-screen lg:h-3/4  bg-slate-700 lg:rounded-md shadow-2xl'>
        <main className='p-6 md:p-4 lg:p-8'>
          <header className='flex justify-between items-center mb-6 '>
            <div>
              <h1 className='text-lg font-bold text-white'>Todo List</h1>
              <p className='text-xs text-gray-200'>Friday, Feb 9</p>
            </div>
            <div className='md:flex gap-10 text-gray-200'>
              <p className='text-lg'>Total Tasks: {tasks.length} </p>
              <p className='text-lg'>Completed Tasks: 12 </p>
            </div>
          </header>
          {/*  */}
          <section className=' w-full lg:w-3/5 space-y-2 md:space-x-1 lg:space-x-2 mb-10'>
            <input
              type="text"
              onChange={e => setNewTask(e.target.value)}
              className='w-full md:w-1/2 text-gray-500 bg-gray-200 focus:outline-none p-[7px] rounded   '
              placeholder='Add new task ...'
              required
            />
            <select
              onChange={e => setPriority(e.target.value)}
              className='w-full md:w-36 p-[7px] focus:outline-none text-gray-500 bg-gray-200 rounded  md:border-r '>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button onClick={handleAddTask} className='w-full md:w-24 text-white p-2  font-semibold bg-green-500 rounded uppercase hover:bg-green-400 active:scale-95 duration-300 '>Add task</button>
          </section>
          {/*  */}
          <section className='overflow-y-auto h-72 scrollable-container'>
            <div>
              {/* TODO Filter  */}
            </div>
            <div className='space-y-2'>
              {
                tasks.map(task =>
                  <div key={task.id} className='text-gray-200 flex justify-between items-center border-y bg-slate-400/10 border-gray-400 p-3 mr-2'>
                    <div className='flex gap-5 items-center '>
                      <button onClick={() => toggleComplete(task.id)}>
                        {task.completed ? <FaCircleCheck className="text-green-500 text-lg" /> : <FaRegCheckCircle className="text-lg" />}
                      </button>
                      {task.completed ? <p className='text-green-500'>{task.text}</p> : <p>{task.text}</p>}
                    </div>
                    <div className='space-x-5'>
                      {task.completed ? <span className='bg-green-500 text-white px-1 rounded py-0.5 uppercase'>Completed</span> : ''}
                      <span className='text-red-500'>{task.priority}</span>
                      <button onClick={updateTask}><FaPencilAlt /></button>
                      <button onClick={() => deleteTask(task.id)}><RiDeleteBin6Line /></button>
                    </div>
                  </div>
                )
              }
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
