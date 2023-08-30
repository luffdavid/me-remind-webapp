import React from 'react'
import Start from './pages/Start';
import Topbar from './components/topbar/Topbar';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import TaskList from './pages/TaskList';

function App() {
	return (
		<>
			<Topbar />
		<div className="App">
		<BrowserRouter>
		<Routes>
			<Route
			path="/"
			element={ <Start />}
			/>
			<Route path="/incomplete-tasks"
			element={<TaskList title="All Incomplete Tasks" />}
			/>
           <Route path="/due-today-tasks"
			element={<TaskList title="Tasks Due today" />}
			/>
			 <Route path="/overdue-tasks"
			element={<TaskList title="Overdue Tasks" />}
			/>
			<Route path="/completed-tasks"
			element={<TaskList title="Completed Tasks" />}
			/>
		</Routes>
		</BrowserRouter>
		</div>
	
		
		

		</>
		
	);
}

export default App;
