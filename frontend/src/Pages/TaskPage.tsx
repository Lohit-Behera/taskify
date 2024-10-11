import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDeleteTask, fetchGetTask } from "@/features/TaskSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCcw, Trash } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

function TaskPage() {
  const { taskId } = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const getTask = useSelector((state: any) => state.task.getTask);
  const task = getTask?.task;
  const getTaskStatus = useSelector((state: any) => state.task.getTaskStatus);

  useEffect(() => {
    dispatch(fetchGetTask(taskId as string));
  }, [taskId, dispatch]);

  const daysLeft = (dueDate: string) => {
    const dueDateObj = new Date(dueDate);
    const now = new Date();
    const diffTime = dueDateObj.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDeleteTask = () => {
    const deleteTaskPromise = dispatch(
      fetchDeleteTask(taskId as string)
    ).unwrap();
    toast.promise(deleteTaskPromise, {
      loading: "Deleting Task...",
      success: (data: any) => {
        navigate("/");
        return data.message;
      },
      error: (error: any) => {
        return error.message || "Something went wrong";
      },
    });
  };

  return (
    <>
      {getTaskStatus === "loading" || getTaskStatus === "idle" ? (
        <div>Loading...</div>
      ) : getTaskStatus === "failed" ? (
        <div>Error</div>
      ) : (
        <div className="min-h-[93vh] my-6 flex justify-center items-center">
          <Card className="w-[98%] md:w-[90%]">
            <CardHeader>
              <CardTitle className="flex justify-between space-x-2">
                <p className="text-2xl font-bold my-auto">{task?.title}</p>
                {userInfo?.id === task?.user_id && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleDeleteTask}
                  >
                    <Trash />
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Created at: {format(new Date(task?.created_at), "PPP")}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm md:text-base">
              <div className="grid gap-2">
                <Label>Description</Label>
                <p>{task?.description}</p>
              </div>
              <div className="grid gap-2">
                <Label>Priority</Label>
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
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
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
              </div>
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <span>Due Date: {format(new Date(task?.due_date), "PPP")}</span>
                {daysLeft(task?.due_date) >= 0 && (
                  <span>Days left: {daysLeft(task?.due_date)} days</span>
                )}
                <Calendar
                  mode="single"
                  selected={new Date(task?.due_date)}
                  className="rounded-md border w-[280px]"
                />
              </div>
              <p>{task?.due_date}</p>
            </CardContent>
            <CardFooter className="space-x-4">
              <Button className="w-full" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
              <Button
                className="w-full"
                size="sm"
                onClick={() => navigate(`/update-task/${taskId}`)}
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Update
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}

export default TaskPage;
