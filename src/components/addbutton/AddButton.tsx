import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, Modal, Snackbar, Typography, TextField, Tooltip} from '@mui/material'
import { ModalStyle } from '../../styles/ModalStyle';
import { TodoInterface } from '../../services/interfaces/TodoInterface';
import { addNewTodo } from '../../services/requests/TodoRequests';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import { PRIMARY, getUserInformation } from '../../services/constants/Constants';
import SuccessAlert from '../alerts/SuccessAlert';
import CustomizedButton from '../buttons/Button';
import CustomizedTextField from '../textfields/TextField';

const AddButton: React.FC = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);
  const { t } = useTranslation(['addButton']);

  // Functions
  const handleOpen = () => {
	setOpen(true);
  }

  const handleClose = () => {
	setOpen(false);
  }
  const handleAddTodo = async () => {
    try {
      if (newTodo === ""    ||
	      !dueDate?.isValid ||
		  dayjs(dueDate).isBefore(yesterdayDate)) {
			setErrorText("Please fill in all fields and make sure the due date is in the future");
			setIsErrorOpen(true);
			setTimeout(() => {
				setIsErrorOpen(false);
			}, 60000);
		}
      const newTodoData = await addNewTodo(getUserInformation("userId"),newTodo, dueDate, description);
      		setTodos([...todos, newTodoData]);
      		handleClose();
      		setNewTodo('');
      		setIsSuccessOpen(true);
      		setTimeout(() => {
				setIsSuccessOpen(false);
			}, 3000);
    } catch (error) {
			console.error('Error:', error);
			setErrorText('Error:' + error);
			setIsErrorOpen(true);
			setTimeout(() => {
				setIsErrorOpen(false);
			}, 60000); // Close error alert after 10 seconds
		}
	};

  return (
  <>
  	<div>
		<Tooltip placement='top' title="Add a new reminder">
		<div className="addPopup" onClick={handleOpen}>
			+
		</div>
		</Tooltip>
		
			<Modal
				open={open}
          		onClose={handleClose}
          		aria-labelledby="modal-modal-title"
          		aria-describedby="modal-modal-description"
			>
				<Box sx={ModalStyle}>
					<Typography 
						id="modal-modal-title" 
						variant="h6"
						component="h2"
						sx={{ color: 'black' }}>
						{t("modalHeading", { ns: ['addButton'] })}
					</Typography>
					
					 <Typography 
					 	id="modal-modal-description"
						sx={{ mt: 2 }}>
							<CustomizedTextField
								label={t("reminderTitle", { ns: ['addButton'] })}
								// fullWidth
								// required
								type="text"
								onChange={e => setNewTodo(e.target.value)}value={newTodo}
								// color='primary'
								placeholder={t("titlePlaceholder", { ns: ['addButton'] })}
							/>
					</Typography>
						
					<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DatePicker']}>
    <DatePicker
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#E0E3E7',
          },
          '&:hover fieldset': {
            borderColor: PRIMARY,
          },
          '&.Mui-focused fieldset': {
            borderColor: PRIMARY,
          },
        },
      }}
      value={dueDate}
      onChange={(newValue) => setDueDate(newValue)}
    />
  </DemoContainer>
</LocalizationProvider>


            		<Typography 
						id="modal-modal-description"
						sx={{ mt: 2 }}>
							<CustomizedTextField
								// fullWidth
                				label={t("description", { ns: ['addButton'] })}
                				type="string"
                				// multiline
                				onChange={e => setDescription(e.target.value)}
                				value={description}
                				// color='primary'
                				placeholder={t("descriptionPlaceholder", { ns: ['addButton'] })}
             				 />
            		</Typography>
					<Typography 
						id="modal-modal-description"
						sx={{ mt: 2 }}
						>
						<CustomizedTextField
								//fullwidth
                				label="User_id"
                				aria-readonly
                				value={getUserInformation("userId")}
                				
             				 />
            		</Typography>
					 <br />
            		<Typography 
						sx={{ display:'flex', justifyContent:'right', gap:'10px' }}>
							<CustomizedButton
							variant='outlined'
							text={t("cancelBtn", { ns: ['addButton'] })}
							onClick={handleClose}
							/>
							
							<CustomizedButton
							variant='contained'
							onClick={handleAddTodo}
							text={t("createBtn", { ns: ['addButton'] })}
              				/>
            		</Typography>
				</Box>
    		</Modal>
    	</div>
      
	  	{isSuccessOpen && (

		<SuccessAlert />
      )}

      {isErrorOpen && (
        <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
          <Alert onClose={() => setIsErrorOpen(false)} severity="error" >
            <AlertTitle>Error: Adding a new Reminder wasn't successful </AlertTitle>
            {errorText}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default AddButton;
