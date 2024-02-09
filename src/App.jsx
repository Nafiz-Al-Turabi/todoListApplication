import './App.css'

function App() {

  return (
    <div className='bg-cyan-300 h-screen'>
      <h1 className='hidden lg:block text-2xl  text-center font-bold uppercase pt-10 mb-5'>Todo List Application</h1>
      <div className='max-w-5xl mx-auto h-screen lg:h-3/4  bg-slate-700 lg:rounded-md '>
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
          <div className=' w-full lg:w-3/5 space-y-2 md:space-x-1 lg:space-x-2 '>
            <input
              type="text"
              className='w-full md:w-1/2 text-gray-500 bg-gray-200 focus:outline-none p-[7px] rounded   '
              placeholder='Add new task ...'
            />
            <select className='w-full md:w-36 p-[7px] focus:outline-none text-gray-500 bg-gray-200 rounded  md:border-r '>
              <option selected>Priority of task</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button className='text-white p-2  font-semibold bg-green-500 rounded uppercase hover:bg-green-400 active:scale-95 duration-300 '>Add task</button>
          </div>
          <hr className='my-10' />
          <div>
            Todo
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
