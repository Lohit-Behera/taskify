import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

function TaskUpdatePageLoader() {
  return (
    <div className="min-h-[93vh] flex justify-center items-center">
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
          <div className="flex justify-between">
            <Skeleton className="w-[150px] h-4" />
            <Skeleton className="w-8 h-8 " />
          </div>
          <div className="grid gap-1">
            <Skeleton className="w-[90%] h-3" />
            <Skeleton className="w-[70%] h-3" />
            <Skeleton className="w-[95%] h-3" />
            <Skeleton className="w-[80%] h-3" />
            <Skeleton className="w-[85%] h-3" />
          </div>

          <div className="flex justify-between">
            <Skeleton className="w-[150px] h-4" />
            <Skeleton className="w-8 h-8 " />
          </div>
          <Skeleton className="w-[100px] h-4 " />

          <div className="flex justify-between">
            <Skeleton className="w-[150px] h-4" />
            <Skeleton className="w-8 h-8 " />
          </div>
          <Skeleton className="w-[100px] h-4 " />

          <div className="flex justify-between">
            <Skeleton className="w-[150px] h-4" />
            <Skeleton className="w-8 h-8 " />
          </div>
          <Skeleton className="w-[100px] h-4 " />
        </CardContent>
        <CardFooter className="flex justify-between space-x-3">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default TaskUpdatePageLoader;
