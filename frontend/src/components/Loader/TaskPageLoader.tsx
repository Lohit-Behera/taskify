import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

function TaskPageLoader() {
  return (
    <div className="min-h-[93vh] my-6 flex justify-center items-center">
      <Card className="w-[98%] md:w-[90%]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <Skeleton className="w-[70%] h-7" />
            <Skeleton className="w-8 h-8" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-[200px] h-3" />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="w-[100px] h-4" />
            <div className="grid gap-1">
              <Skeleton className="w-[90%] h-3" />
              <Skeleton className="w-[70%] h-3" />
              <Skeleton className="w-[95%] h-3" />
              <Skeleton className="w-[80%] h-3" />
              <Skeleton className="w-[85%] h-3" />
            </div>
          </div>
          <div className="grid gap-2">
            <Skeleton className="w-[100px] h-4" />
            <Skeleton className="w-32 h-10 rounded-full" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="w-[100px] h-4" />
            <Skeleton className="w-32 h-10 rounded-full" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="w-[100px] h-4" />
            <Skeleton className="w-[200px] h-4" />
            <Skeleton className="w-[150px] h-4" />
            <Skeleton className="w-72 h-72" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-3">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default TaskPageLoader;
