import { Alert, AlertTitle, Box, Button, Input, Modal, Snackbar, Typography, TextField} from '@mui/material'
import React, { useState } from 'react'
import { ModalStyle } from '../../styles/ModalStyle'
import { TodoInterface } from '../../services/interfaces/TodoInterface';
import { addNewTodo } from '../../services/requests/TodoRequests';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddButton = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
	const [newTodo, setNewTodo] = useState("");
	const [description, setDescription] = useState("");
	const [open, setOpen] = React.useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [dueDate, setDueDate] = React.useState<Dayjs | null>(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

    const handleAddTodo = async () => {
        try {
			if (newTodo === "" || !dueDate?.isValid) {
				setErrorText("Please fill in all fields");
				setIsErrorOpen(true);
				setTimeout(() => {
				  setIsErrorOpen(false);
				}, 60000); 
			}
          const newTodoData = await addNewTodo(newTodo, dueDate, description);
          setTodos([...todos, newTodoData]);
		  handleClose();
          setNewTodo('');
          setIsSuccessOpen(true);
          setTimeout(() => {
            setIsSuccessOpen(false);
          }, 60000); // Close success alert after 10 seconds
        } catch (error) {
          console.error('Error:', error);
		  setErrorText('Error:'+ error);
          setIsErrorOpen(true);
          setTimeout(() => {
            setIsErrorOpen(false);
          }, 60000); // Close error alert after 10 seconds
        }
      };

  return (
   <>
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
				   <TextField
				    label="Reminder title"
					fullWidth
					required
				    type="text"
					onChange={e => setNewTodo(e.target.value)}
					value={newTodo} 
					color='primary'
					placeholder='How do you want to name your reminder?'/>
				   </Typography>
				   <LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DatePicker']}>
						<DatePicker
						value={dueDate}
						onChange={(newValue) => setDueDate(newValue)}/>
					</DemoContainer>
				   </LocalizationProvider>

				   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
				   <TextField
				   	fullWidth
				    label="Description"
				    type="string"
					multiline
					onChange={e => setDescription(e.target.value)} 
					value={description}
					color='primary'
					placeholder='If needed take some additional input here'/>
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
            {isSuccessOpen && (
      <Snackbar open={isSuccessOpen} autoHideDuration={null} onClose={() => setIsSuccessOpen(false)}>
        <Alert onClose={() => setIsSuccessOpen(false)} severity="success" >
          <AlertTitle>Success</AlertTitle>
         Reminder succesfully saved
        </Alert>
      </Snackbar>
   )}

{isErrorOpen && (
    <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
    <Alert  onClose={() => setIsErrorOpen(false)} severity="error" >
      <AlertTitle>Error: Adding a new Reminder wasn't successfully </AlertTitle>
	  {errorText} 
    </Alert>
  </Snackbar>
   )}
   </>
  )
}

export default AddButton