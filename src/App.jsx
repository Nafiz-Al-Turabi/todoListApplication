import './App.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      console.log("Task:", { id: Date.now(), text: newTask, completed: false, priority });
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority }]);
      setNewTask('');
    }
  };

  return (
    <div className='bg-gradient-to-r to-violet-600 from-violet-400 h-screen'>
      <h1 className='hidden lg:block text-2xl  text-center font-bold uppercase pt-10 mb-5'>Todo List Application</h1>
      <div className='max-w-5xl mx-auto h-screen lg:h-3/4  bg-slate-700 lg:rounded-md shadow-2xl'>
        <div className='p-6 md:p-4 lg:p-8'>
          <div className='flex justify-between items-center mb-6 '>
            <div>
              <p className='text-lg text-gray-200'>Friday, Feb 9</p>
            </div>
            <div className='md:flex gap-10 text-gray-200'>
              <p className='text-lg'>Incompete Tasks: 50 </p>
              <p className='text-lg'>Completed Tasks: 12 </p>
            </div>
          </div>
          {/*  */}
          <div className=' w-full lg:w-3/5 space-y-2 md:space-x-1 lg:space-x-2 mb-10'>
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
          </div>
          {/*  */}
          <div>
            <div>
              {/* TODO Filter  */}
            </div>
            <div className='text-gray-400 flex justify-between items-center border-y bg-slate-400/10 border-gray-400 p-3'>
              <div className='flex gap-5 items-center '>
                <input type="checkbox" />
                <p>I will go to School </p>
              </div>
              <div className='space-x-5'>
                <span className='text-red-500'>High</span>
                <button><FaPencilAlt /></button>
                <button><RiDeleteBin6Line /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
