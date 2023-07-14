import { useContext, useEffect } from "react";
import LoginDialog from "./auth/loginDialog";
import RegisterDialog from "./auth/registerDialog";
import { UserContext } from "./context/UserContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Header: React.FC = () => {
  const { isLogin, username, loginUser, logoutUser } = useContext(UserContext);

  return (
    <>
      <div className="flex h-full flex-col bg-gray-950">
        <div className="container flex flex-row items-center justify-between space-y-2 py-12 md:h-16">
          <h2 className="text-lg font-semibold text-white">Todo List App</h2>
          <div className="ml-auto flex w-8/12 space-x-4 justify-end">
            {isLogin && username != "" ? (
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-white">
                  Hello, {username}!
                </h2>
                <Button
                  className="outline bg-white text-black hover:bg-black hover:outline-white hover:text-white"
                  onClick={() => logoutUser()}
                >
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
