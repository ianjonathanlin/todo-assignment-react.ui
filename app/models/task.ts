export interface ITask {
  id?: number;
  title: string;
  category: string;
  description: string | undefined;
  dueDate: string;
  created?: string;
  updated?: string;
}
