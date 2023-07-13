import LoginDialog from "./auth/loginDialog";
import RegisterDialog from "./auth/registerDialog";
import { Separator } from "@/components/ui/separator";

const Header: React.FC = () => {
  return (
    <>
      <div className="hidden h-full flex-col md:flex bg-gray-950">
        <div className="container flex flex-col items-start justify-between space-y-2 py-12 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold text-white">Todo List App</h2>
          <div className="ml-auto flex w-full space-x-4 sm:justify-end">
            <LoginDialog />
            <RegisterDialog />
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
