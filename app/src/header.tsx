"use client";

import { useContext } from "react";
import LoginDialog from "./auth/loginDialog";
import RegisterDialog from "./auth/registerDialog";
import { UserContext } from "./contexts/UserContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Header: React.FC = () => {
  const [isLogin, username, loginUser, logoutUser] = useContext(UserContext);
  const { setTheme } = useTheme();

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="container flex flex-row items-center justify-between space-y-2 py-12 md:h-16">
          <h2 className="text-lg font-semibold">Todo List App</h2>
          <div className="ml-auto flex w-8/12 space-x-4 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isLogin ? (
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">Hello, {username}!</h2>
                <Button className="outline" onClick={() => logoutUser()}>
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </div>
            ) : (
              <>
                <LoginDialog loginUser={loginUser} />
                <RegisterDialog />
              </>
            )}
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
