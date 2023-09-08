import React, { useEffect, useState } from 'react';
import {TaskListInterface} from '../services/interfaces/TaskListInterface';
import { TodoInterface } from '../services/interfaces/TodoInterface';
import { getTodos, completeTodo, addNewTodo, deleteTodo } from '../services/requests/TodoRequests'; 
import { DATE_TODAY, api_base } from '../services/constants/Constants';
import Icons from '../components/icons/MuiIcons';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle, Button, Skeleton, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TaskList: React.FC<TaskListInterface> = ({ title, taskType}) => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [expanded, setExpanded] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const { t, i18n } = useTranslation(['tasklist']);

    useEffect(() => {
        loadTodos();
	}, []);


    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    // GET ALL TODOS
    const loadTodos = async () => {
      setIsLoading(true);
        try {
          const response = await getTodos();
          setTodos(response);
          if (taskType === 'COMPLETE') {
            console.log("Filter: " + taskType);
            setTodos(response.filter((todo) => todo.complete));
          } else if( taskType === 'INCOMPLETE') {
            console.log("Filter: " + taskType);
            setTodos(response.filter((todo) => !todo.complete));
          } else if (taskType === 'OVERDUE') {
            console.log("Filter: " + taskType);
            setTodos(response.filter((todo) => {
              const dueDate = new Date(todo.dueDate);
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

      return (
        <div>
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
           <Button>Back to overview</Button>
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
              <Link 
                  to="/"
                  style={{textDecoration:'none'}}>
                    <Button>Back to overview</Button>
              </Link>
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
                        {todo.complete ? <Icons.CheckCircleIcon /> : <Icons.CircleIcon />}
                      </div>
                      <div className="todo-duedate">
                        <>
                        {t("", {ns: ['tasklist']})} 
                        {new Date(todo.dueDate).toLocaleDateString('de-DE')}
                        </>
                        {/* {todo.dueDate} */}
                        </div>
                      <div className="text">
                        {todo.text} <br />
                        <span className="description">{todo.description}</span>
                      </div>
                      <div
                        className="delete-todo"
                        onClick={() => handleDeleteTodo(todo._id)}
                      >
                        <Icons.DeleteForeverIcon sx={{ color: 'red' }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{t("noTasksMsg", {ns: ['tasklist']})}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      );
    };
    
    export default TaskList;