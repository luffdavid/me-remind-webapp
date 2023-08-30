import React, { useEffect, useState } from 'react';
import {TaskListInterface} from '../services/interfaces/TaskListInterface';
import { TodoInterface } from '../services/interfaces/TodoInterface';
import { getTodos, completeTodo, addNewTodo, deleteTodo } from '../services/requests/TodoRequests'; 
import { api_base } from '../services/constants/Constants';
import Icons from '../components/icons/MuiIcons';
import CircularProgress from '@mui/material/CircularProgress';

const TaskList: React.FC<TaskListInterface> = ({ title, taskType}) => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [expanded, setExpanded] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        loadTodos();
	}, []);


    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Filter für abgeschlossene und unvollständige Aufgaben
  const completedTasks = todos.filter((todo) => todo.complete);
  const incompletedTasks = todos.filter((todo) => !todo.complete);

    // GET ALL TODOS
    const loadTodos = async () => {
      setIsLoading(true);
        try {
          const response = await getTodos();
          setTodos(response);
          if (taskType === 'COMPLETE') {
            console.log("Filter" + taskType);
            setTodos(response.filter((todo) => todo.complete));
          } else if( taskType === 'INCOMPLETE') {
            console.log("Filter: " + taskType);
            setTodos(response.filter((todo) => !todo.complete));
          }
          setIsLoading(false);
        } catch (error) {
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
          {isLoading ? (
            <CircularProgress sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
          ) : (
            <div>
              <h1>{title}</h1>
              <h4>Your Reminders</h4>
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
                      <div className="todo-duedate">{todo.dueDate}</div>
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
                  <p>You currently have no {taskType.toLowerCase()} tasks</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default TaskList;