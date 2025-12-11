import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Task, Project } from "../types";
import TaskForm from "../components/TaskForm";

function ProjectDetailsPage() {
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  

  const { projectId } = useParams();
  console.log(tasks);



  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);


  //------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchProjectTasks = async () => {
    try {
      setTasksLoading(true);
      const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
      setTasks(res.data);
    } catch (error: any) {
      console.error(error);
      setTasksError(error.message);
    } finally {
      setTasksLoading(false);
    }
  };
  if (projectId) fetchProjectTasks();
  }, [projectId]);
//-------------------------------------------------------------------------------------tasks info

const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setEditTaskId(null);
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      await apiClient.delete(`/api/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

//---------------------------------------------------------
  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  if (error) return <div className="text-3xl text-white">Error loading Project</div>;

  return (
    <div className="text-white">
      <h1 className="text-4xl">Project Details</h1>

      <div className="mt-10">
        <div className="text-3xl">{project?.name}</div>
        <div className="text-xl">{project?.description}</div>
      </div>

      <h1 className="text-3xl mt-8">Tasks</h1>

      create task form
      {projectId && (
        <TaskForm
          projectId={projectId}
          onSuccess={handleTaskCreated}
        />
      )}

      {tasksLoading && <div>Loading tasks...</div>}
      {tasksError && <div className="text-red-400">{tasksError}</div>}

      {tasks.map(task => (
        <div key={task._id} className="mt-4 border p-3 rounded">
          {editTaskId === task._id ? (
            <TaskForm
              projectId={projectId!}
              task={task}
              onSuccess={handleTaskUpdated}
              submitLabel="Save Task"
            />
          ) : (
            <>
              <div className="text-xl font-semibold">{task.title}</div>
              <div>{task.description}</div>
              <div className="text-sm mt-1">Status: {task.status}</div>

              <div className="mt-2 flex gap-2">
                <button
                  className="bg-sky-500 rounded px-3 py-1"
                  onClick={() => setEditTaskId(task._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 rounded px-3 py-1"
                  onClick={() => handleTaskDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}


export default ProjectDetailsPage;