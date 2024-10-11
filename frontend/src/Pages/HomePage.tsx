import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AddTasks,
  fetchGetUserTasks,
  resetGetUserTasks,
  resetTasks,
} from "@/features/TaskSlice";
import { format } from "date-fns";

function HomePage() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const getUserTasks = useSelector((state: any) => state.task.getUserTasks);
  const getUserTasksStatus = useSelector(
    (state: any) => state.task.getUserTasksStatus
  );
  const tasks = useSelector((state: any) => state.task.tasks);

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
            <Card key={task.id}>
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
              <CardContent className="grid gap-4">
                <span
                  className={`flex justify-center space-x-1 w-32 p-2 rounded-full ${
                    task?.priority === "Low"
                      ? "bg-green-500/40"
                      : task?.priority === "Medium"
                      ? "bg-orange-500/40"
                      : "bg-red-500/40"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mt-[9px] ${
                      task?.priority === "Low"
                        ? "bg-green-500"
                        : task?.priority === "Medium"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  <p>{task?.priority}</p>
                </span>
                <span
                  className={`flex justify-center space-x-1 p-2 rounded-full w-32 ${
                    task?.status === "Pending"
                      ? "bg-gray-500/40"
                      : task?.status === "In Progress"
                      ? "bg-blue-500/40"
                      : "bg-green-500/40"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full  mt-[9px] ${
                      task?.status === "Pending"
                        ? "bg-gray-500"
                        : task?.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <p>{task?.status}</p>
                </span>

                <p>Due Date: {format(new Date(task?.due_date), "PPP")}</p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default HomePage;
