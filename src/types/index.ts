export interface Project {
  name: string;
  description: string;
  _id: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  githubId?: string;
}

export interface Task {
  _id: string;
  name: string;
  description: string;
  status: "Todo" | "in-progress" | "done";
  project: string;
}