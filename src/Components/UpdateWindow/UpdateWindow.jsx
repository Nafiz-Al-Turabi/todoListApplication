import React from 'react';

const UpdateWindow = ({ updatingTask, setUpdatedTaskText, setUpdatedTaskPriority, onUpdateTask, onCancelUpdate }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-slate-600 p-6 rounded-lg">
                <input
                    type="text"
                    value={updatingTask.text}
                    onChange={e => setUpdatedTaskText(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                    placeholder="Update task..."
                />
                <select
                    value={updatingTask.priority}
                    onChange={e => setUpdatedTaskPriority(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <div className='text-center'>
                    <button
                        onClick={onUpdateTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => onCancelUpdate(null)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateWindow;
