import React from 'react'
import Start from './pages/Start';
import Topbar from './components/topbar/Topbar';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import TaskList from './pages/TaskList';
import AddButton from './components/addbutton/AddButton';
import { useTranslation } from 'react-i18next';

function App() {
	const { t, i18n } = useTranslation(['start']);
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
			element={<TaskList title={t("incomplete", {ns: ['start']})}   taskType='INCOMPLETE'/>}
			/>
           <Route path="/due-today-tasks"
			element={<TaskList title={t("today", {ns: ['start']})} taskType='TODAY'/>}
			/>
			 <Route path="/overdue-tasks"
			element={<TaskList title={t("overdue", {ns: ['start']})}  taskType='OVERDUE'/>}
			/>
			<Route path="/completed-tasks"
			element={<TaskList title={t("completed", {ns: ['start']})} taskType='COMPLETE'/>}
			/>
		</Routes>
		</BrowserRouter>
		</div>
	
		
		

		</>
		
	);
}

export default App;
