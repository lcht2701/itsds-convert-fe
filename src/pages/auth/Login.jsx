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
import AuthService from "@/servers/AuthService";

export function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(data);
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
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={onChange}
                />
              </div>
              <Button type="submit" className="w-full mt-1">
                Login
              </Button>

              <Link href="#" className="mx-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
