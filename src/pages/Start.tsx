import React from 'react'
import { useEffect, useState } from 'react';
import { TodoInterface } from '../services/interfaces/TodoInterface';
import { api_base } from '../services/constants/Constants';
import { getTodos, completeTodo, addNewTodo, deleteTodo } from '../services/requests/TodoRequests'; 

const Start = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
        loadTodos();
	}, []);

    const loadTodos = async () => {
        try {
          const response = await getTodos();
          setTodos(response);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
	
	const completeTodo = async (id:string) => {
		const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));
	}
      
    const handleAddTodo = async () => {
        try {
          const newTodoData = await addNewTodo(newTodo, dueDate, description);
    
          setTodos([...todos, newTodoData]);
    
          setPopupActive(false);
          setNewTodo('');
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleDeleteTodo = async (id: string) => {
        try {
          await deleteTodo(id);
          setTodos((todos) => todos.filter((todo) => todo._id !== id));
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <div>
        <h1>Welcome $username</h1>
			<h4>Your Reminders</h4>

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>
						<div className="text">{todo.description}</div>
						<div className="text">.........{todo.dueDate.toString()}</div>

						<div className="delete-todo" onClick={() => handleDeleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<input type="date" className="add-todo-input-dueDate" onChange={e => setDueDate(e.target.value)} value={dueDate} />
						<input type="string" className="add-todo-input-description" onChange={e => setDescription(e.target.value)} value={description} />
						<div className="button" onClick={handleAddTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
    </div>
  )
}

export default Start