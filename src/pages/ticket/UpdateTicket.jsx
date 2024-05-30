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
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const UpdateTicket = () => {
  const { id } = useParams();
  const { ticket, loading, availableServices, updateTicket, fetchServices } =
    useTicket(id);

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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    updateTicket(data);
  };

  useEffect(() => {
    if (ticket && ticket.requester) {
      fetchServices(ticket.requester.id);
    }
  }, [ticket]);

  useEffect(() => {
    if (ticket && ticket.requester) {
      setValue("service_id", ticket.service.id);
      setValue("title", ticket.title);
      setValue("description", ticket.description);
      setValue("priority", ticket.priority);
      setValue("impact", ticket.impact);
      setValue("impact_detail", ticket.impact_detail);
      setValue("type", ticket.type);
    }
  }, [ticket, availableServices]);

  if (loading) return <Spinner size="medium" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Update Ticket" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Update Ticket</CardTitle>
              <CardDescription>Input detail for a ticket</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="requester_id">Requester</Label>
                    <Input
                      name="title"
                      type="text"
                      className="w-full"
                      placeholder="Enter title"
                      value={ticket.requester.name}
                      disabled
                    />
                  </div>
                  <div className="grid gap-3">
                    <Controller
                      id="service_id"
                      name="service_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
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

export default UpdateTicket;
