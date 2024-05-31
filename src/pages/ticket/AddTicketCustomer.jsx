import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DetailNavbar from "@/components/custom/DetailNavbar";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/custom/ErrorMessage";
import useTicket from "@/hooks/ticket/useTicket";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";

const AddTicketCustomer = () => {
  const { user } = useAuth();
  const { availableServices, addTicketByCustomer, fetchServices } = useTicket();

  const schema = yup.object().shape({
    service_id: yup.number().required("Service is required"),
    title: yup
      .string()
      .required("Title is required")
      .max(1024, "Title must be at most 1024 characters"),
    description: yup
      .string()
      .nullable()
      .max(5000, "Description must be at most 5000 characters"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    addTicketByCustomer(data);
  };

  useEffect(() => {
    if (user) {
      fetchServices(user.id);
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Add Ticket" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>New Ticket</CardTitle>
              <CardDescription>Input detail for a ticket</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Controller
                  id="service_id"
                  name="service_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <Label id="service_id" htmlFor="service_id">
                        Requested Service
                      </Label>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableServices?.map((service, key) => (
                          <SelectItem key={key} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessage errors={errors} name="service_id" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Ticket Title</Label>
                <Input
                  name="title"
                  type="text"
                  className="w-full"
                  placeholder="Enter title"
                  {...register("title")}
                />
                <ErrorMessage errors={errors} name="title" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="w-full min-h-32"
                  placeholder="Enter description"
                  {...register("description")}
                />
                <ErrorMessage errors={errors} name="description" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </form>
  );
};

export default AddTicketCustomer;
