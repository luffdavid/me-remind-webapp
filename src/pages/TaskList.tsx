import React from 'react';
import {TaskListInterface} from '../services/interfaces/TaskListInterface';

const TaskList: React.FC<TaskListInterface> = ({ title }) => {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
};

export default TaskList;
