import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '@/data/types';

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'deadlineDate' | 'attachments' | 'progress'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Convert deadlineDate strings back to Date objects
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          deadlineDate: new Date(task.deadlineDate),
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error('Error parsing tasks data:', error);
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isInitialized]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'deadlineDate' | 'attachments' | 'progress'>) => {
    // Parse the deadline date string (YYYY-MM-DD format from date input)
    const deadlineDate = new Date(taskData.deadline);
    const formattedDeadline = deadlineDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });

    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deadline: formattedDeadline,
      deadlineDate: deadlineDate,
      attachments: 0,
      progress: 0,
      assignedTo: null, // Ensure new tasks are unassigned
      assignedToName: undefined,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              ...(updates.deadline && { deadlineDate: new Date(updates.deadline) }),
            }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

