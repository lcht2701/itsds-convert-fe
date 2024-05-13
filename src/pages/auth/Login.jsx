import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "@/contexts/AuthProvider";
import { login } from "../../apis/Auth";

export function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(data);
      setUser(response.result.user);
      setToken(response.result.token);
      navigate("/manager");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={onChange}
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
