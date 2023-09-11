import axios from 'axios';
import { api_base } from '../constants/Constants';
import { TodoInterface } from '..//interfaces/TodoInterface';
import { Dayjs } from 'dayjs';
export const getTodos = async (): Promise<TodoInterface[]> => {
  const response = await axios.get<TodoInterface[]>(`${api_base}/todos`);
  return response.data;
};

export const completeTodo = async (id: string): Promise<void> => {
    await fetch(`${api_base}/todo/complete/${id}`);
  };

export const addNewTodo = async (userId: string, newTodo: string, dueDate: Dayjs | null, description: string): Promise<TodoInterface> => {
  const response = await axios.post<TodoInterface>(`${api_base}/todo/new`, {userId, text: newTodo, dueDate: dueDate, description: description});
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${api_base}/todo/delete/${id}`);
};

