import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DetailNavbar from "@/components/custom/DetailNavbar";
import ServiceService from "@/servers/ServiceService";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { useEffect, useState } from "react";
import TicketSolutionService from "@/servers/TicketSolutionService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import UserService from "@/servers/UserService";
import { Spinner } from "@/components/ui/spinner";
import useServiceList from "@/hooks/service/useServiceList";
import useUserList from "@/hooks/user/useUserList";
import useTicketSolution from "@/hooks/ticketSolution/useTicketSolution";

const UpdateTicketSolution = () => {
  const { id } = useParams();
  const { services, fetchServiceSelectList } = useServiceList();
  const { users, fetchOwnerSelectList } = useUserList();
  const { ticketSolution, loading, updateTicketSolution } =
    useTicketSolution(id);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().nullable(),
    service_id: yup.number().required("Service is required"),
    owner_id: yup.number().required("Owner is required"),
    keyword: yup
      .string()
      .nullable()
      .matches(
        /^[a-z]+(?:,[a-z]+)*$/,
        "Keywords must be lowercase words separated by commas without spaces"
      ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    updateTicketSolution(data);
  };

  useEffect(() => {
    fetchOwnerSelectList();
    fetchServiceSelectList();

    if (ticketSolution) {
      setValue("title", ticketSolution.title);
      setValue("content", ticketSolution.content);
      setValue("service_id", ticketSolution.service?.id);
      setValue("owner_id", ticketSolution.owner?.id);
      setValue("keyword", ticketSolution.keyword);
    }
  }, [ticketSolution]);

  if (loading) return <Spinner size="medium" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Update Ticket Solution" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Update Ticket Solution</CardTitle>
              <CardDescription>
                Update name and content of the ticket solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      className="w-full"
                      placeholder="Enter title"
                      {...register("title")}
                    />
                    <ErrorMessage errors={errors} name="title" />
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
                            Service
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services?.map((service, key) => (
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
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="keyword">Keyword</Label>
                    <Input
                      id="keyword"
                      name="keyword"
                      type="text"
                      className="w-full"
                      placeholder="Enter keyword for the solution"
                      {...register("keyword")}
                    />
                    <ErrorMessage errors={errors} name="keyword" />
                  </div>
                  <div className="grid gap-3">
                    <Controller
                      id="owner_id"
                      name="owner_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <Label id="owner_id" htmlFor="owner_id">
                            Owner
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a owner" />
                          </SelectTrigger>
                          <SelectContent>
                            {users?.map((user, key) => (
                              <SelectItem key={key} value={user.id.toString()}>
                                {user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="owner_id" />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter content"
                    className="min-h-64"
                    {...register("content")}
                  />
                  <ErrorMessage errors={errors} name="content" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </form>
  );
};

export default UpdateTicketSolution;
