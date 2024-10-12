import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

function HomePageLoader() {
  return (
    <div className="my-6 w-[98%] md:w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[80%] h-8" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-[90%] h-3" />
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Skeleton className="w-32 h-10 rounded-full" />
              <Skeleton className="w-32 h-10 rounded-full" />
              <Skeleton className="w-[70%] h-5 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomePageLoader;
