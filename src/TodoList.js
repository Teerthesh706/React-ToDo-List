import React, { useState, useEffect } from 'react';

const getStoredTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
};

const setStoredTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const TodoList = () => {
    const [tasks, setTasks] = useState(getStoredTasks());
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('asc');

    useEffect(() => {
        setStoredTasks(tasks);
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim() === '') {
            alert('Task cannot be empty');
            return;
        }
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sort === 'asc') return a.text.localeCompare(b.text);
        return b.text.localeCompare(a.text);
    });

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                />
                <button type="submit">Add Task</button>
            </form>
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <select onChange={(e) => setSort(e.target.value)} value={sort}>
                    <option value="asc">Sort Ascending</option>
                    <option value="desc">Sort Descending</option>
                </select>
            </div>
            <ul>
                {sortedTasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                        />
                        <span className={task.completed ? 'completed' : ''}>
                            {task.text}
                        </span>
                        <button onClick={() => removeTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;