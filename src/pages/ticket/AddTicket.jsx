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
import { useEffect, useState } from "react";

const AddTicket = () => {
  const {
    availableServices,
    requesters,
    addTicket,
    fetchServices,
    fetchRequesters,
  } = useTicket();
  const [requesterId, setRequesterId] = useState(0);

  const schema = yup.object().shape({
    requester_id: yup.number().required("Ticket requester is required"),
    service_id: yup.number().required("Service is required"),
    title: yup
      .string()
      .required("Title is required")
      .max(1024, "Title must be at most 1024 characters"),
    description: yup
      .string()
      .nullable()
      .max(5000, "Description must be at most 5000 characters"),
    priority: yup.number().nullable(),
    impact: yup.number().nullable(),
    impact_detail: yup
      .string()
      .nullable()
      .max(5000, "Impact Detail must be at most 5000 characters"),
    type: yup.number().nullable(),
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
    addTicket(data);
  };

  useEffect(() => {
    fetchRequesters();
    if (requesterId) {
      fetchServices(requesterId);
    }
  }, [requesterId]);

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
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Controller
                      id="requester_id"
                      name="requester_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setRequesterId(value);
                          }}
                        >
                          <Label id="requester_id" htmlFor="requester_id">
                            Requester
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a requester" />
                          </SelectTrigger>
                          <SelectContent>
                            {requesters?.map((requester, key) => (
                              <SelectItem
                                key={key}
                                value={requester.id.toString()}
                              >
                                {requester.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="requester_id" />
                  </div>
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
                              <SelectItem
                                key={key}
                                value={service.id.toString()}
                              >
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="service_id" />
                  </div>
                </div>
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
                  className="w-full min-h-24"
                  placeholder="Enter description"
                  {...register("description")}
                />
                <ErrorMessage errors={errors} name="description" />
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-3 gap-10">
                  <div className="grid gap-3">
                    <Controller
                      id="impact"
                      name="impact"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <Label id="impact" htmlFor="impact">
                            Impact
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select impact ..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"0"}>Low</SelectItem>
                            <SelectItem value={"1"}>Medium</SelectItem>
                            <SelectItem value={"2"}>High</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="impact" />
                  </div>
                  <div className="grid gap-3">
                    <Controller
                      id="priority"
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <Label id="priority" htmlFor="priority">
                            Priority
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority ..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"0"}>Low</SelectItem>
                            <SelectItem value={"1"}>Medium</SelectItem>
                            <SelectItem value={"2"}>High</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="priority" />
                  </div>
                  <div className="grid gap-3">
                    <Controller
                      id="type"
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <Label id="type" htmlFor="type">
                            Support Type
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type ..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"0"}>Offline</SelectItem>
                            <SelectItem value={"1"}>Online</SelectItem>
                            <SelectItem value={"2"}>Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="type" />
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="impact_detail">Description</Label>
                <Textarea
                  id="impact_detail"
                  name="impact_detail"
                  className="w-full min-h-24"
                  placeholder="Enter impact detail"
                  {...register("impact_detail")}
                />
                <ErrorMessage errors={errors} name="impact_detail" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </form>
  );
};

export default AddTicket;
