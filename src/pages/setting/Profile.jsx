import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserService from "@/servers/UserService";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { UserRoleEnum } from "@/utils/EnumObject";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits long")
      .max(15, "Phone number must not exceed 15 digits"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await UserService.updateProfile(data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        var response = await UserService.getProfile();
        var result = response.result;
        setValue("id", result.id);
        setValue("name", result.name);
        setValue("email", result.email);
        setValue("phone", result.phone);
        setValue("role", UserRoleEnum[result.role]);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link to="#" className="font-semibold text-primary">
            Profile
          </Link>
          <Link to="#">Security</Link>
        </nav>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Profile Detail</CardTitle>
                <CardDescription>Your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full"
                      {...register("name")}
                    />
                    <ErrorMessage errors={errors} name="name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      className="w-full"
                      {...register("phone")}
                    />
                    <ErrorMessage errors={errors} name="phone" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      className="w-full"
                      disabled
                      {...register("email")}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      type="text"
                      className="w-full"
                      disabled
                      {...register("role")}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit">Save</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
