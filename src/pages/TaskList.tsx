import React, { useEffect, useState } from 'react';
import {TaskListInterface} from '../services/interfaces/TaskListInterface';
import { TodoInterface } from '../services/interfaces/TodoInterface';
import { getTodos, completeTodo, addNewTodo, deleteTodo } from '../services/requests/TodoRequests'; 
import { api_base } from '../services/constants/Constants';
import Icons from '../components/icons/MuiIcons';

const TaskList: React.FC<TaskListInterface> = ({ title, taskType}) => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        loadTodos();
	}, []);


    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
    // GET ALL TODOS
    const loadTodos = async () => {
        try {
          const response = await getTodos();
          setTodos(response);
        } catch (error) {
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
        //<div>
        //    <h1>{title}</h1>
        //    <h4>Your Reminders</h4> 
        //    <div className="todos">
		//		{todos.length > 0 ? todos.map(todo => (
		//			<div className={
		//				"todo" + (todo.complete ? " is-complete" : "")
		//			} key={todo._id} onClick={() => completeTodo(todo._id)}>
		//			<div className="checkbox">
		//				{todo.complete ? <Icons.CheckCircleIcon /> : <Icons.CircleIcon />}
		//			</div>
 //
		//				<div className="text">{todo.text}</div> */}
        //                <div className="text">TODOTEXT</div>
		//				{/* <div className="text">{todo.description}</div> */}
        //                <div className="text">todo.description</div>
        //                {/* <div className="text">.........{todo.dueDate.toString()}</div> */}
        //                <div className="text">.........30.08.2023</div>
//
		//				<div className="delete-todo" onClick={() => handleDeleteTodo(todo._id)}><Icons.DeleteForeverIcon sx={{color:'red'}}/></div>
		//			</div>
		//		)) : (
		//			<p>You currently have no <span>{taskType.toLowerCase()}</span>  tasks</p>
		//		)}
		//	</div>
        //</div>
        <div>
            <h1>{title}</h1>
            <h4>Your Reminders</h4> 
            <div className="todos">
                <div className="todo">
                <div className="todo-duedate">30.08.2023</div> <br />
                    <div className="checkbox"><Icons.CircleIcon /></div>
                    <div className="text">To do Title</div>
                    {/* <div className="description">todo.description</div> */}                    
                    <div className="delete-todo"><Icons.DeleteForeverIcon sx={{color:'red'}}/></div>	
                </div>
                <div className="todo">
                <div className="todo-duedate">30.08.2023</div> <br />
                    <div className="checkbox"><Icons.CircleIcon /></div>
                    <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Quam blanditiis repellendus dolor harum maiores nihil ut doloribus iusto ipsam
                      perspiciatis in vel quia, eligendi provident. Magnam ipsam iure nam architecto!s <br />
                      <span className='description'>aaaaaaaaa</span></div> <br />
                    {/* <div className="text">todo.description</div>                     */}
                    <div className="delete-todo"><Icons.DeleteForeverIcon sx={{color:'red'}}/></div>	
                </div>
            </div>
       </div>
    );
};

export default TaskList;
