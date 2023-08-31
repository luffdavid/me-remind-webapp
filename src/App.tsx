import React from 'react'
import Start from './pages/Start';
import Topbar from './components/topbar/Topbar';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import TaskList from './pages/TaskList';
import AddButton from './components/addbutton/AddButton';

function App() {
	return (
		<>
			<Topbar />
		<div className="App">
			<AddButton />
		<BrowserRouter>
		<Routes>
			<Route
			path="/"
			element={ <Start />}
			/>
			<Route path="/incomplete-tasks"
			element={<TaskList title="All Incomplete Tasks"  taskType='INCOMPLETE'/>}
			/>
           <Route path="/due-today-tasks"
			element={<TaskList title="Tasks Due today" taskType='TODAY'/>}
			/>
			 <Route path="/overdue-tasks"
			element={<TaskList title="Overdue Tasks"  taskType='OVERDUE'/>}
			/>
			<Route path="/completed-tasks"
			element={<TaskList title="Completed Tasks" taskType='COMPLETE'/>}
			/>
		</Routes>
		</BrowserRouter>
		</div>
	
		
		

		</>
		
	);
}

export default App;
