import './App.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt, FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [tasks, setTasks] = useState([]);
  const [updatingTask, setUpdatingTask] = useState(null);
  const [updatedTaskText, setUpdatedTaskText] = useState('');
  const [updatedTaskPriority, setUpdatedTaskPriority] = useState('');

  // add new Task handler
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      // console.log("Task:", { id: Date.now(), text: newTask, completed: false, priority });
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority }]);
      setNewTask('');
    }
  };
  // Delete task Handler
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
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
      setTasks(tasks.map(task => task.id === updatingTask.id ? { ...task, text: updatedTaskText, priority: updatedTaskPriority } : task));
      setUpdatingTask(null)
    }
  };

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
              <p className='text-lg'>Completed Tasks: {tasks.filter(task => task.completed).length} </p>
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
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
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
                      {task.completed ? <span className='bg-green-500 text-xs text-white px-1 rounded py-0.5 uppercase'>Completed</span> : ''}
                      <span className='text-red-500'>{task.priority}</span>
                      <button onClick={() => updateTask(task.id)}><FaPencilAlt /></button>
                      <button onClick={() => deleteTask(task.id)}><RiDeleteBin6Line /></button>
                    </div>
                  </div>
                )
              }
            </div>
          </section>
        </main>
        {/* Updating Window */}
        {updatingTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <input
              type="text"
              value={updatedTaskText}
              onChange={e => setUpdatedTaskText(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
              placeholder="Update task..."
            />
            <select
              value={updatedTaskPriority}
              onChange={e => setUpdatedTaskPriority(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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
      )}
      </div>
    </div>
  )
}

export default App
