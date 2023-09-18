import React from 'react'
import Start from './pages/Start';
import Topbar from './components/topbar/Topbar';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import TaskList from './pages/TaskList';
import AddButton from './components/buttons/addbutton/AddButton';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {getUserStatus} from './services/constants/Constants';

function App() {
	const { t } = useTranslation(['start']);
	const isLoggedIn = getUserStatus();
	return (
	<>
		<Topbar />
		<div className="App">
			{isLoggedIn ? <AddButton /> : <></> }
			<BrowserRouter>
			 	<Routes>
					<Route
						path="/"
						element={!isLoggedIn ?  <Navigate to ="/login" /> : <Start />}
					/>
					<Route
			     		path="/login"
				 		element={!isLoggedIn ? <Login/> : <Navigate to="/" />} 
					/>
					<Route
						path="/signup"
						element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
					/>
					<Route 
						path="/incomplete-tasks"
						element={!isLoggedIn ? <Navigate to ="/login" /> : <TaskList title={t("incomplete", {ns: ['start']})}   taskType='INCOMPLETE'/>}
					/>
           			<Route
					 	path="/due-today-tasks"
					 	element={!isLoggedIn ? <Navigate to ="/login" /> : <TaskList title={t("today", {ns: ['start']})} taskType='TODAY'/>}
					/>
			 		<Route
					 	path="/overdue-tasks"
					 	element={!isLoggedIn ? <Navigate to ="/login" /> : <TaskList title={t("overdue", {ns: ['start']})}  taskType='OVERDUE'/>}
					/>
					<Route 
						path="/completed-tasks"
						element={ !isLoggedIn ? <Navigate to ="/login" /> : <TaskList title={t("completed", {ns: ['start']})} taskType='COMPLETE'/>}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	</>	
	);
}

export default App;
