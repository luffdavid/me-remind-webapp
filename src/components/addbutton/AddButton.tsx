import { Box, Button, Input, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ModalStyle } from '../../styles/ModalStyle'
import { TodoInterface } from '../../services/interfaces/TodoInterface';
import { addNewTodo } from '../../services/requests/TodoRequests';

const AddButton = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
	const [newTodo, setNewTodo] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [description, setDescription] = useState("");
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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

  return (
    <div>
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

export default AddButton