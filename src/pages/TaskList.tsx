import React, { useEffect, useState } from 'react';
import {TaskListInterface} from '../services/interfaces/TaskListInterface';
import { TodoInterface } from '../services/interfaces/TodoInterface';
import { getTodos, completeTodo, addNewTodo, deleteTodo } from '../services/requests/TodoRequests'; 
import { DATE_TODAY, api_base, getUserInformation } from '../services/constants/Constants';
import Icons from '../components/icons/MuiIcons';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle, Button, Skeleton, Snackbar, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NoTasksImage  from '../assets/NoTasksImage.svg'
import TaskListAlert from '../components/alerts/TaskListAlert'
import { differenceInDays, format } from 'date-fns';
import getDifference from '../services/constants/Constants';

const TaskList: React.FC<TaskListInterface> = ({ title, taskType}) => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [expanded, setExpanded] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const { t } = useTranslation(['tasklist']);
    const [showAlert, setShowAlert] = useState(false);
    const [daysUntilDue, setDaysUntilDue] = useState<number>();
    useEffect(() => {
        loadTodos();
	}, []);


  
    useEffect(() => {
      // Zeigen Sie den Erfolgs-Alert für 1 Sekunde an, indem Sie showAlert auf true setzen
      setShowAlert(true);
  
      // Verzögern Sie das Ausblenden des Alerts nach 1 Sekunde
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);
    


    // GET ALL TODOS
    const loadTodos = async () => {
      setIsLoading(true);
        try {
          const response = await getTodos(getUserInformation("userId") );
          setTodos(response);
          if (taskType === 'COMPLETE') {
            console.log("Filter: " + taskType);
            setTodos(response.filter((todo) => todo.complete));
          } else if( taskType === 'INCOMPLETE') {
            console.log("Filter: " + taskType);
            setTodos(response.filter((todo) => {
              setDaysUntilDue(differenceInDays(new Date(todo.dueDate), DATE_TODAY));
              console.log(daysUntilDue);
              return !todo.complete
            }))
          
          } else if (taskType === 'OVERDUE') {
            console.log("Filter: " + taskType);
            setTodos(response.filter((todo) => {
              const dueDate = new Date(todo.dueDate);
              setDaysUntilDue(differenceInDays(dueDate, DATE_TODAY));
              return !todo.complete && dueDate.getTime() < DATE_TODAY;
            }))} else {
              setTodos(response.filter((todo) => {
                const dueDate = new Date(todo.dueDate);
                dueDate.setHours(0, 0, 0, 0); // Setze die Uhrzeit auf Mitternacht
                return !todo.complete && dueDate.getTime() === DATE_TODAY;
            }))}
          setIsLoading(false);
      } catch (error) {
        setIsErrorOpen(true);
        setTimeout(() => {
          setIsErrorOpen(false);
        }, 10000); // Close error alert after 10 seconds

          setIsLoading(false);
          console.error('Error:', error); 
        }
      };

      //COMPLETE TODO
      const completeTodo = async (id:string) => {
		const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}
			return todo;
		}));
	}

    // DELETE TODO
    const handleDeleteTodo = async (id: string) => {
        try {
          await deleteTodo(id);
          setTodos((todos) => todos.filter((todo) => todo._id !== id));
        } catch (error) {
          console.error('Error:', error);
        }
      };

      function getDifferenceText(diff: number) {
        let text = '';
        if (diff === -1) {
     text = t("yesterdayDue", {ns: ['tasklist']});
   } else if (diff === 0) {
     text = t("todayDue", {ns: ['tasklist']});
   } else if(diff > 1) {
     text =  t("dueIn", {ns: ['tasklist']}) + " " + diff + " " + t("days", {ns: ['tasklist']})
   } else if(diff < -1) {
     text =  t("dueOver", {ns: ['tasklist']}) + Math.abs(diff) + " " + t("days", {ns: ['tasklist']})
   }
   return text;
  }
      return (
        <div>
 {/* Zeige den SuccessAlert nur dann an, wenn showAlert auf true gesetzt ist */}
      {showAlert && <TaskListAlert taskType={taskType} />}
 {isErrorOpen && (
          <div>
             <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
          <Alert  onClose={() => setIsErrorOpen(false)} severity="error" >
            <AlertTitle>{t("alertError", {ns: ['tasklist']})} </AlertTitle>
            {t("alertTryAgain", {ns: ['tasklist']})}
          </Alert>
        </Snackbar>
          </div>
          
          )}
        <div>
           {isLoading ?
     <div>
      <Link 
         to="/"
         style={{textDecoration:'none'}}>
          <Tooltip title="Add" placement="top-start">
            <Button sx={{color:'white'}}><Icons.WestIcon /></Button>
          </Tooltip>
     </Link>
  
     <h1>{title}</h1>
     <h4>{t("yourReminders", {ns: ['tasklist']})}</h4>
     <div className="todos">
           <Skeleton className='todo'  />
           <Skeleton className='todo'  />
           <Skeleton className='todo'  />
           <Skeleton className='todo'  />
        </div>
        </div>
      
        : (
            <div>
              <Tooltip title="Back to overview">
                <Link 
                  to="/"
                  style={{textDecoration:'none'}}>
                    <Button sx={{color:'white'}}>
                      <Icons.WestIcon />
                    </Button>
                </Link>
              </Tooltip>
             
              <h1>{title}</h1>
              <h4>{t("yourReminders", {ns: ['tasklist']})}</h4>
              <div className="todos">
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    
                    <div
                      className={"todo" + (todo.complete ? " is-complete" : "")}
                      key={todo._id}
                      onClick={() => completeTodo(todo._id)}
                    >
                      <div className="checkbox">
                        {todo.complete ? 
                        <Tooltip title="Move it to incompleted tasks">
                          <Icons.CheckCircleIcon />
                        </Tooltip> 
                        : 
                        <Tooltip title="Move it to completed tasks">
                          <Icons.CircleIcon />
                        </Tooltip>
                        }
                      </div>
                      <div className="todo-duedate">
                        <>
                        {t("", {ns: ['tasklist']})} 
                        </>
                        {/* {todo.dueDate} */}
                        <Tooltip placement='top' title={new Date(todo.dueDate).toLocaleDateString('de-DE')}>
                     
                          <Button sx={{color:'white'}}>
                            {getDifferenceText(getDifference(new Date(todo.dueDate), DATE_TODAY))}
                          </Button>
                        </Tooltip> 
                      {/* {new Date(todo.dueDate).toLocaleDateString('de-DE')} */}
                        </div>
                      <div className="text">
                        {todo.text} <br />
                        <span className="description">{todo.description}</span>
                      </div>
                      <div
                        className="delete-todo"
                        onClick={() => handleDeleteTodo(todo._id)}
                      >
                        <Tooltip placement='top' title="Delete this task forever">
                          <Icons.DeleteForeverIcon sx={{ color: 'red' }} />
                        </Tooltip>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>
                    <div style={{textAlign:'center'}}>
                     <img src={NoTasksImage} alt='' width="25%" height="auto" /> <br /> <br /><br />
                     <h3>{t("noTasksMsg", {ns: ['tasklist']})}</h3>
                    </div>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      );
    };
    
    export default TaskList;