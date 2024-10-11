import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetTask, fetchUpdateTask } from "@/features/TaskSlice";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CalendarIcon, Pencil, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

function TaskUpdatePage() {
  const { taskId } = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const getTask = useSelector((state: any) => state.task.getTask);
  const task = getTask?.task;
  const getTaskStatus = useSelector((state: any) => state.task.getTaskStatus);

  const [changedTask, setChangedTask] = useState({
    id: task?.id,
    title: task?.title,
    description: task?.description,
    priority: task?.priority,
    status: task?.status,
    dueDate: task?.due_date,
  });

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPriority, setEditPriority] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(fetchGetTask(taskId as string));
    }
  }, [taskId, dispatch]);

  useEffect(() => {
    setChangedTask({
      id: task?.id,
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      status: task?.status,
      dueDate: task?.due_date,
    });
  }, [task]);

  const handleUpdateTask = () => {
    const updateTaskPromise = dispatch(fetchUpdateTask(changedTask)).unwrap();
    toast.promise(updateTaskPromise, {
      loading: "Updating Task...",
      success: (data: any) => {
        navigate(`/task/${data.task.id}`);
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
        <div className="min-h-[93vh] flex justify-center items-center">
          <Card className="w-[98%] md:w-[90%]">
            <CardHeader>
              <div className="flex justify-between space-x-3">
                {editTitle ? (
                  <Input
                    id="title"
                    value={changedTask.title}
                    onChange={(e) =>
                      setChangedTask({ ...changedTask, title: e.target.value })
                    }
                  />
                ) : (
                  <CardTitle>{task?.title}</CardTitle>
                )}
                {editTitle ? (
                  <Button
                    size="smIcon"
                    variant="secondary"
                    onClick={() => setEditTitle(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    size="smIcon"
                    variant="secondary"
                    onClick={() => setEditTitle(true)}
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                )}
              </div>
              <CardDescription>
                Created at: {task?.created_at.substring(0, 10)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between">
                    <Label className="my-auto" htmlFor="description">
                      Description
                    </Label>
                    {editDescription ? (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditDescription(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    ) : (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditDescription(true)}
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  {editDescription ? (
                    <Textarea
                      id="description"
                      className="resize-none"
                      rows={8}
                      value={changedTask.description}
                      onChange={(e) =>
                        setChangedTask({
                          ...changedTask,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{task?.description}</p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between">
                    <Label className="my-auto" htmlFor="priority">
                      Priority
                    </Label>
                    {editPriority ? (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditPriority(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    ) : (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditPriority(true)}
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  {editPriority ? (
                    <Select
                      onValueChange={(e) =>
                        setChangedTask({
                          ...changedTask,
                          priority: e,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p>{task?.priority}</p>
                  )}
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between">
                    <Label className="my-auto" htmlFor="status">
                      Status
                    </Label>
                    {editStatus ? (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditStatus(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    ) : (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditStatus(true)}
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  {editStatus ? (
                    <Select
                      onValueChange={(e) =>
                        setChangedTask({
                          ...changedTask,
                          status: e,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p>{task?.status}</p>
                  )}
                </div>
                <div className="gird gap-2">
                  <div className="flex justify-between space-y-3">
                    <Label className="my-auto" htmlFor="dueDate">
                      Due Date
                    </Label>
                    {editDueDate ? (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditDueDate(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    ) : (
                      <Button
                        size="smIcon"
                        variant="secondary"
                        onClick={() => setEditDueDate(true)}
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  {editDueDate ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={
                            "w-[250px] justify-start text-left font-normal"
                          }
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {changedTask.dueDate ? (
                            format(changedTask.dueDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          onSelect={(e: any) =>
                            setChangedTask({
                              ...changedTask,
                              dueDate: e,
                            })
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    task?.due_date && (
                      <p>{new Date(task?.due_date).toLocaleDateString()}</p>
                    )
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="space-x-4">
              <Button className="w-full" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
              <Button className="w-full" size="sm" onClick={handleUpdateTask}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}

export default TaskUpdatePage;
