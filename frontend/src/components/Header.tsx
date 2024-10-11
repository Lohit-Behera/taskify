import { ModeToggle } from "./mode-toggle";
import Logo from "./Logo";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="z-20 w-full sticky top-0 p-2 backdrop-blur bg-background/30">
      <nav className="hidden md:flex justify-between space-x-2">
        <Logo className="h-10 w-10" />
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
