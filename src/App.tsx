import React from 'react'
import Start from './pages/Start';
import Topbar from './components/topbar/Topbar';

function App() {
	return (
		<>
		<Topbar />
		<div className="App">
			<Start />
		</div>
		</>
		
	);
}

export default App;
