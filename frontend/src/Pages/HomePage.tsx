import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AddTasks,
  fetchGetUserTasks,
  resetGetUserTasks,
  resetTasks,
} from "@/features/TaskSlice";

function HomePage() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const getUserTasks = useSelector((state: any) => state.task.getUserTasks);
  const getUserTasksStatus = useSelector(
    (state: any) => state.task.getUserTasksStatus
  );
  const tasks = useSelector((state: any) => state.task.tasks);
  console.log(tasks);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(resetTasks());
      dispatch(fetchGetUserTasks());
    }
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (getUserTasksStatus === "succeeded") {
      dispatch(AddTasks(getUserTasks.tasks));
      dispatch(resetGetUserTasks());
    }
  }, [getUserTasksStatus]);
  return (
    <div className="my-6 w-[98%] md:w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(
          (task: {
            id: number;
            title: string;
            description: string;
            priority: string;
            status: string;
            due_date: string;
            user: number;
            created_at: string;
          }) => (
            <Card
              key={task.id}
              className={`${
                task.status === "In Progress"
                  ? "bg-amber-400/30"
                  : task.status === "Pending"
                  ? "bg-red-400/30"
                  : "bg-green-400/30 "
              }`}
            >
              <CardHeader>
                <Link to={`/task/${task.id}`}>
                  <CardTitle className="font-bold hover:underline">
                    {task.title}
                  </CardTitle>
                </Link>
                <CardDescription className="line-clamp-2">
                  {task.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
                <p>Due Date: {task.due_date}</p>
              </CardContent>
              <CardFooter>
                <p>Created At: {task.created_at.substring(0, 10)}</p>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default HomePage;
