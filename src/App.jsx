import './App.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFilter, FaPencilAlt, FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import logo from './assets/logo.png'

function App() {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [tasks, setTasks] = useState([]);
  const [updatingTask, setUpdatingTask] = useState(null);
  const [updatedTaskText, setUpdatedTaskText] = useState('');
  const [updatedTaskPriority, setUpdatedTaskPriority] = useState('Low');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);


  // Function to read tasks from local storage
  const getFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  };

  // Function to write tasks to local storage
  const setTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  useState(() => {
    getFromLocalStorage();
  }, []);


  // add new Task handler
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = { id: Date.now(), text: newTask, completed: false, priority };
      setTasks([...tasks, newTaskObject]);
      setTasksToLocalStorage([...tasks, newTaskObject])
      setNewTask('');
    }
  };
  // Delete task Handler
  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => id !== id)
    setTasks(updatedTasks);
    setTasksToLocalStorage(updatedTasks);
  };

  // Update Task Handler
  const updateTask = id => {
    const taskToUpdate = tasks.find(task => task.id == id);
    if (taskToUpdate) {
      setUpdatingTask(taskToUpdate);
      setUpdatedTaskText(taskToUpdate.text);
      setUpdatedTaskPriority(taskToUpdate.priority)
    }
  };

  // Save updated task Handler
  const saveUpdatedTask = () => {
    if (updatedTaskText.trim() !== '') {
      const updatedTasks = tasks.map(task => task.id === updatingTask.id ? { ...task, text: updatedTaskText, priority: updatedTaskPriority } : task)
      setTasks(updatedTasks);
      setTasksToLocalStorage(updatedTasks)
      setUpdatingTask(null)
    }
  };

  // Mark As Complete Handler
  const toggleComplete = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setTasksToLocalStorage(updatedTasks);
  };

  // Filter by priority
  const filteredTasks = filterPriority === 'all' ? tasks : tasks.filter(task => task.priority === filterPriority);


  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handlePriorityChange = (priority) => {
    setFilterPriority(priority);
    setFilterOpen(false);
  };

  return (
    <div className='bg-gradient-to-r to-cyan-100 from-cyan-300 h-screen'>
      <h1 className='hidden lg:block text-2xl text-gray-800  text-center font-bold uppercase pt-10 mb-5'>Todo List Application</h1>
      <div className='max-w-5xl mx-auto h-screen lg:h-3/4  bg-slate-700 lg:rounded-md shadow-2xl'>
        <main className='p-6 md:p-4 lg:p-8'>
          <header className='flex justify-between items-center mb-1 '>
            <div>
              <h1 className='text-lg font-bold text-white'>Todo List</h1>
              <img src={logo} alt="" className='h-10' />
            </div>
            <div className='md:flex gap-10 text-gray-200'>
              <p className='text-lg'>Total Tasks: {tasks.length} </p>
              <p className='text-lg'>Completed Tasks: {tasks.filter(task => task.completed).length} </p>
            </div>
          </header>
          {/*  */}
          <section className=' w-full lg:w-3/5 space-y-2 md:space-x-1 lg:space-x-2 mb-5'>
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
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button onClick={handleAddTask} className='w-full md:w-24 text-white p-2  font-semibold bg-green-500 rounded uppercase hover:bg-green-400 active:scale-95 duration-100 '>Add task</button>
          </section>
          {/* Filter by priority */}
          {
            tasks.length === 0 ? ''
              :
              <div className='relative'>
                <div className="flex">
                  <button className="text-gray-500" onClick={handleFilterClick}>
                    <FaFilter className='bg-gray-400 text-4xl text-white p-1 mb-5 rounded' />
                  </button>
                </div>
                {filterOpen && (
                  <div className="mt-2 w-32 space-y-1 absolute left-3 top-6 bg-slate-500 p-2 rounded ">
                    <button className='block text-white w-full hover:bg-slate-400 rounded' onClick={() => handlePriorityChange('all')}>All</button>
                    <button className='block text-white w-full hover:bg-slate-400 rounded' onClick={() => handlePriorityChange('Low')}>Low</button>
                    <button className='block text-white w-full hover:bg-slate-400 rounded' onClick={() => handlePriorityChange('Medium')}>Medium</button>
                    <button className='block text-white w-full hover:bg-slate-400 rounded' onClick={() => handlePriorityChange('High')}>High</button>
                  </div>
                )}
              </div>
          }
          {/* Table or card  */}
          <section className='overflow-y-auto h-[500px] md:h-72 scrollable-container'>
            {
              tasks.length === 0 ? <p className='text-center text-gray-500/20 text-4xl md:text-6xl font-extrabold uppercase mt-12'>Add new task</p>
                :
                <div className='space-y-2'>
                  {
                    filteredTasks.map(task =>
                      <div key={task.id} className='text-gray-200 flex justify-between items-center border-y bg-slate-400/10 border-gray-400 p-3 mr-2'>
                        <div className='flex gap-5 items-center '>
                          <button onClick={() => toggleComplete(task.id)}>
                            {task.completed ? <FaCircleCheck className="text-green-500 text-lg" /> : <FaRegCheckCircle className="text-lg" />}
                          </button>
                          {task.completed ? <p className='text-green-500'>{task.text}</p> : <p>{task.text}</p>}
                        </div>
                        <div className='space-x-5'>
                          {task.completed ? <span className=' bg-green-500 text-xs text-white px-1 rounded py-0.5 uppercase'>Completed</span> : ''}
                          <span className={`text-xs uppercase ${task.priority === 'Low' ? 'text-green-500' :
                            task.priority === 'Medium' ? 'text-yellow-500' :
                              task.priority === 'High' ? 'text-red-500' :
                                ''
                            }`}>
                            {task.priority}
                          </span>
                          <button onClick={() => updateTask(task.id)}><FaPencilAlt /></button>
                          <button onClick={() => deleteTask(task.id)}><RiDeleteBin6Line /></button>
                        </div>
                      </div>
                    )
                  }
                </div>
            }
          </section>
        </main>
        {/* Updating Window */}
        {updatingTask && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-slate-700 p-6 rounded-lg mx-4 md:mx-0">
              <input
                type="text"
                value={updatedTaskText}
                onChange={e => setUpdatedTaskText(e.target.value)}
                className="w-full mb-4 px-3 py-2 text-gray-100 bg-gray-400 focus:outline-nonerounded"
                placeholder="Update task..."
              />
              <select
                value={updatedTaskPriority}
                onChange={e => setUpdatedTaskPriority(e.target.value)}
                className="w-full mb-4 px-3 py-2 text-gray-100 bg-gray-400 focus:outline-none rounded"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className='text-center'>
                <button
                  onClick={saveUpdatedTask}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setUpdatingTask(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
