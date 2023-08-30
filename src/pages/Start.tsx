import React from 'react'
import { useEffect, useState } from 'react';
import { TodoInterface } from '../services/interfaces/TodoInterface';
import { api_base } from '../services/constants/Constants';
import { getTodos, completeTodo, addNewTodo, deleteTodo } from '../services/requests/TodoRequests'; 
import Icons from '../components/icons/MuiIcons';
import { StartCards } from '../components/cards/StartCards';
import { Button, Input } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ModalStyle } from '../styles/ModalStyle';

const Start = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
	const [newTodo, setNewTodo] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [description, setDescription] = useState("");
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
		  handleClose();
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
        <h1>Welcome, $username</h1>
		<StartCards />
			<h4>Your Reminders</h4>

			{/* <div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
					<div className="checkbox">
						{todo.complete ? <Icons.CheckCircleIcon /> : <Icons.CircleIcon />}
					</div>

						<div className="text">{todo.text}</div>
						<div className="text">{todo.description}</div>
						<div className="text">.........{todo.dueDate.toString()}</div>

						<div className="delete-todo" onClick={() => handleDeleteTodo(todo._id)}><Icons.DeleteForeverIcon sx={{color:'red'}}/></div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div> */}

		    <div className="addPopup" onClick={handleOpen}>+</div>
				 <Modal
				 open={open}
				 onClose={handleClose}
				 aria-labelledby="modal-modal-title"
				 aria-describedby="modal-modal-description"
			   >
				 <Box sx={ModalStyle}>
				   <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: 'black'}}>
					 Add a new REMINDER
				   </Typography>
				   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
				   <Input
				    type="text"
					onChange={e => setNewTodo(e.target.value)}
					value={newTodo} 
					color='primary'
					placeholder='Reminder title'/>
				   </Typography>
				   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
				   <Input
				    type="date"
					onChange={e => setDueDate(e.target.value)} 
					value={dueDate}
					color='primary'
					placeholder='Due date dd.mm.yyyy'/>
				   </Typography>
				   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
				   <Input
				    type="string"
					multiline
					onChange={e => setDescription(e.target.value)} 
					value={description}
					color='primary'
					placeholder='Description'/>
				   </Typography> <br />
				   <Typography sx={{textAlign:'right'}}>
				   <Button
				   sx={{marginRight:'6px'}}
				   onClick={handleClose}
					color='primary'
					variant='outlined'>Cancel
					</Button> 
				   <Button
				    onClick={handleAddTodo}
					color='primary'
					variant='contained'>Create Task
					</Button>
				</Typography>
				 </Box>
			   </Modal>
			</div>
  )
}

export default Start