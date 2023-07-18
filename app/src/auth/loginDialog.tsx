"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as authApi from "../../api/authApi";
import { IUser } from "@/app/models/user";

interface LoginDialogProps {
  loginUser: Function;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ loginUser }) => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const userToAuth: IUser = {
        userName: values.userName,
        password: values.password,
      };

      authenticateUser(userToAuth, values.userName);

      formik.resetForm();
    },
  });

  function authenticateUser(user: IUser, userName: string) {
    authApi
      .authenticate(user)
      .then((res: any) => {
        loginUser(res.data.authToken, res.data.refreshToken);
        toast({
          description: "Login Successful!",
        });
      })
      .catch((err: any) => {
        if (err.response.status == 400) {
          toast({
            variant: "destructive",
            description: err.response?.data,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: err.response?.data,
          });
        }
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LogIn className="h-4 w-4 mr-1" /> Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="title">Username*</Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                className="col-span-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <>
                  <span className="col-span-1"></span>
                  <div className="col-span-3 text-red-600 mb-0">
                    <small>{formik.errors.userName}</small>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="title">Password*</Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="col-span-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <>
                  <span className="col-span-1"></span>
                  <div className="col-span-3 text-red-600 mb-0">
                    <small>{formik.errors.password}</small>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
