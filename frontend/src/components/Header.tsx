import { ModeToggle } from "./mode-toggle";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import { Home, LogIn, LogOut, PanelLeft, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/UserSlice";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

function Header() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  return (
    <header className="z-20 w-full sticky top-0 p-2 backdrop-blur bg-background/30">
      <nav className="hidden md:flex justify-between space-x-2">
        <Logo className="h-10 w-10" />
        <div className="flex space-x-2">
          {userInfo ? (
            <>
              <NavLink to="/">
                {({ isActive }) => (
                  <Button variant={isActive ? "default" : "ghost"}>
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                )}
              </NavLink>
              <NavLink to="/create-task">
                {({ isActive }) => (
                  <Button variant={isActive ? "default" : "ghost"}>
                    <SquarePlus className="mr-2 h-4 w-4" />
                    Create Task
                  </Button>
                )}
              </NavLink>
              <Button
                variant="ghost"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                navigate("/login");
              }}
            >
              <LogIn className="mr-2 h-4 w-4" /> LogIn
            </Button>
          )}

          <ModeToggle />
        </div>
      </nav>
      <nav className=" flex md:hidden justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="my-auto">
              <PanelLeft />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[180px]">
            <SheetHeader>
              <SheetTitle className="mx-auto mb-4">
                <Logo className="h-10 w-10" />
              </SheetTitle>
              <SheetFooter>
                <div className="flex flex-col mx-auto space-y-3">
                  {userInfo ? (
                    <>
                      <SheetClose asChild>
                        <NavLink to="/">
                          {({ isActive }) => (
                            <Button variant={isActive ? "default" : "ghost"}>
                              <Home className="mr-2 h-4 w-4" />
                              Home
                            </Button>
                          )}
                        </NavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavLink to="/create-task">
                          {({ isActive }) => (
                            <Button variant={isActive ? "default" : "ghost"}>
                              <SquarePlus className="mr-2 h-4 w-4" />
                              Create Task
                            </Button>
                          )}
                        </NavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            dispatch(logout());
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        <LogIn className="mr-2 h-4 w-4" /> LogIn
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </SheetFooter>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </nav>
    </header>
  );
}

export default Header;
