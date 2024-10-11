import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/UserSlice";

function Header() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  return (
    <header className="z-20 w-full sticky top-0 p-2 backdrop-blur bg-background/30">
      <nav className="hidden md:flex justify-between space-x-2">
        <Logo className="h-10 w-10" />
        <Button
          variant="ghost"
          className="my-auto"
          onClick={() => {
            navigate("/create-task");
          }}
        >
          Create Task
        </Button>
        <Button
          variant="ghost"
          className="my-auto"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
        <ModeToggle />
      </nav>
      <nav className=" flex md:hidden justify-between">
        <Button variant="ghost" size="icon" className="my-auto">
          <PanelLeft />
        </Button>
        <ModeToggle />
      </nav>
    </header>
  );
}

export default Header;
