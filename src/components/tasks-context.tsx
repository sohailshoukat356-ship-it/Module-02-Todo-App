
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Task = {
  id: string;
  title: string;
  category: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, category: string) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, category: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
