import { useCallback, useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import ServerErrorPage from "./Error/ServerErrorPage";
import HomePageLoader from "@/components/Loader/HomePageLoader";

function HomePage() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const getUserTasks = useSelector((state: any) => state.task.getUserTasks);
  const getUserTasksStatus = useSelector(
    (state: any) => state.task.getUserTasksStatus
  );
  const tasks = useSelector((state: any) => state.task.tasks);

  const [once, setOnce] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (tasks.length === 0) {
      dispatch(resetTasks());
      setPage(1);
      setHasMore(false);
      setOnce(true);
      dispatch(fetchGetUserTasks(page));
    }
  }, [userInfo]);

  useEffect(() => {
    if (getUserTasksStatus === "succeeded") {
      if (once) {
        dispatch(AddTasks(getUserTasks.tasks));
        setOnce(false);
      }
      setPage(getUserTasks.next_page);
      setHasMore(getUserTasks.has_next_page);
      dispatch(resetGetUserTasks());
    }
  }, [getUserTasksStatus]);

  const handleScroll = useCallback(() => {
    const scrollableHeight = document.documentElement.scrollHeight;
    const scrolledFromTop = window.innerHeight + window.scrollY;
    const scrollTrigger = (scrollableHeight * 90) / 100;

    if (Math.ceil(scrolledFromTop) > scrollTrigger) {
      if (hasMore) {
        setOnce(true);
        dispatch(fetchGetUserTasks(page));
      }
    }

    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }, [hasMore, dispatch, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <>
      {getUserTasksStatus === "loading" && tasks.length === 0 ? (
        <HomePageLoader />
      ) : getUserTasksStatus === "failed" ? (
        <ServerErrorPage />
      ) : (
        <div className="my-6 w-[98%] md:w-[90%] mx-auto">
          {tasks.length === 0 ? (
            <p className="text-center text-lg md:text-xl font-semibold mt-6">
              You didn't create any tasks yet.
            </p>
          ) : (
            <>
              {showScrollToTop && (
                <Button
                  className="fixed bottom-10 right-10 rounded-full w-11 h-11 z-10"
                  variant="secondary"
                  onClick={scrollToTop}
                  size="icon"
                >
                  <ArrowUp />
                </Button>
              )}
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
                            className={`w-2 h-2 rounded-full mt-[9px] ${
                              task?.status === "Pending"
                                ? "bg-gray-500"
                                : task?.status === "In Progress"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                          <p>{task?.status}</p>
                        </span>

                        <p>
                          Due Date: {format(new Date(task?.due_date), "PPP")}
                        </p>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
              {getUserTasksStatus === "loading" && (
                <div className="flex justify-center mt-6">
                  <Loader2 className="animate-spin w-14 h-14" />
                </div>
              )}
              {!hasMore && (
                <p className="text-center text-lg md:text-xl font-semibold mt-6">
                  No more posts
                </p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
