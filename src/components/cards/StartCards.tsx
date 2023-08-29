import React from 'react'
import Icons from '../icons/MuiIcons'
import './StartCards.css'

export const StartCards = () => {
    return (
      <div className="card-container">
          <div className="card">
          <div className="card-icon"><Icons.UnpublishedIcon  sx={{color:'red', fontSize:'40px'}}/></div>
          <div className="card-title">All Incomplete Tasks</div>
          <div className="card-amount">100</div>
        </div>
        <div className="card">
          <div className="card-icon"><Icons.TodayIcon sx={{fontSize:'40px'}} /></div>
          <div className="card-title">Tasks Due Today</div>
          <div className="card-amount">1</div>
        </div>
        <div className="card">
          <div className="card-icon"><Icons.WatchLaterIcon sx={{color:'gold', fontSize:'40px'}}/></div>
          <div className="card-title">Overdue Tasks</div>
          <div className="card-amount">1</div>
        </div>
      
        <div className="card">
          <div className="card-icon"><Icons.TaskAltIcon sx={{color:'green',fontSize:'40px'}} /></div>
          <div className="card-title">Completed Tasks</div>
          <div className="card-amount">100</div>
        </div>
      </div>
    )
  }
  