import  {useEffect, useState} from 'react'
import { Alert, AlertTitle,  Backdrop,  CircularProgress,  Snackbar, } from '@mui/material'
import Icons from '../icons/MuiIcons'
import './StartCards.css'
import {Link} from 'react-router-dom'
import { getTodos } from '../../services/requests/TodoRequests'
import { TodoInterface } from '../../services/interfaces/TodoInterface';
import { DATE_TODAY } from '../../services/constants/Constants'

export const StartCards = () => {

const [isLoading, setIsLoading] = useState(false);
const [todos, setTodos] = useState<TodoInterface[]>([]);
const [incompletedTodos , setIncompletedTodos] = useState<TodoInterface[]>([]);
const [overdueTodos,setOverdueTodos] = useState<TodoInterface[]>([])
const [completedTodos ,setCompletedTodos] = useState<TodoInterface[]>([])
const [todayTodos ,setTodayTodos] = useState<TodoInterface[]>([])
const [isErrorOpen, setIsErrorOpen] = useState(false);
useEffect(() => {
  loadTodos();
}, []);

    // GET ALL TODOS
    const loadTodos = async () => {
      setIsLoading(true);
        try {
          const response = await getTodos();
          setTodos(response);
          setIsLoading(false);
          setIncompletedTodos(response.filter((todo) => !todo.complete));
          setOverdueTodos(response.filter((todo) => {
                       const dueDate = new Date(todo.dueDate);
                       return !todo.complete && dueDate.getTime() < DATE_TODAY;
             }))
          setCompletedTodos(response.filter((todo) => todo.complete));

              setTodayTodos(response.filter((todo) => {
                 const dueDate = new Date(todo.dueDate);
                 dueDate.setHours(0, 0, 0, 0); // Setze die Uhrzeit auf Mitternacht
                 return !todo.complete && dueDate.getTime() === DATE_TODAY;
             }))}
          catch (error) {
          setIsLoading(false);
          setIsErrorOpen(true);
          setTimeout(() => {
            setIsErrorOpen(false);
          }, 10000); // Close error alert after 10 seconds
          console.error('Error:', error); 
        }
      };

    return (
      <div> 
         {isLoading && (
          <div style={{textAlign:'center'}}>
        <div className="loading" style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
          <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading}
>          <p><CircularProgress sx={{color:'white'}} /> </p></Backdrop>

        </div>
        </div>
         )}
      <div className="card-container">
        <div>
          <Link to="/incomplete-tasks" style={{textDecoration:'none'}}>
           <div className="card">
           <div className="card-icon"><Icons.UnpublishedIcon  sx={{color:'red', fontSize:'40px'}}/></div>
           <div className="card-title">All Incomplete Tasks</div>
           <div className="card-amount"> {incompletedTodos.length} </div>
           </div>
          </Link>
        </div>

        <div>
        <Link to="/due-today-tasks" style={{textDecoration:'none'}}>
         <div className="card">
          <div className="card-icon"><Icons.TodayIcon sx={{fontSize:'40px'}} /></div>
          <div className="card-title">Tasks Due Today</div>
          <div className="card-amount">{todayTodos.length}</div>
         </div>
        </Link>
        </div>
       

        <div>
        <Link to="/overdue-tasks" style={{textDecoration:'none'}}>
        <div className="card">
          <div className="card-icon"><Icons.WatchLaterIcon sx={{color:'gold', fontSize:'40px'}}/></div>
          <div className="card-title">Overdue Tasks</div>
          <div className="card-amount">{overdueTodos.length}</div>
        </div>
        </Link>
        </div>
      
       <div>
        <Link to="/completed-tasks" style={{textDecoration:'none'}}>
         <div className="card">
          <div className="card-icon"><Icons.TaskAltIcon sx={{color:'green',fontSize:'40px'}} /></div>
          <div className="card-title">Completed Tasks</div>
          <div className="card-amount">{completedTodos.length}</div>
          </div>
         </Link>
       </div>
      </div>
      {isErrorOpen && (
        <div>
           <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
        <Alert  onClose={() => setIsErrorOpen(false)} severity="error" >
          <AlertTitle>Error while loading the data from the server</AlertTitle>
          Please try again!
        </Alert>
      </Snackbar>
        </div>
        
        )}
        </div>
        )
      }
  