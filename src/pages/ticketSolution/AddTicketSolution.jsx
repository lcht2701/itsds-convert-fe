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
import { useNavigate } from "react-router-dom";
import { handleNullInputField } from "@/utils/HandleNullInputField";
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

const AddTicketSolution = () => {
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required("Name is required"),
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    data = handleNullInputField(data);
    console.log(data);
    try {
      await TicketSolutionService.add(data);
      navigate(-1);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        var response = await ServiceService.getSelectList();
        console.log("Get select list", response.result);
        setServiceList(response.result);
      } catch (error) {
        console.log("Error fetching select list: ", error);
      }
    };

    const fetchOwnerList = async () => {
      try {
        var response = await UserService.getOwnerList();
        console.log("Get select list", response.result);
        setOwnerList(response.result);
      } catch (error) {
        console.log("Error fetching select list: ", error);
      }
    };

    fetchServiceList();
    fetchOwnerList();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Add Ticket Solution" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>New Ticket Solution</CardTitle>
              <CardDescription>
                Input details for a new ticket solution
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
                        <Select onValueChange={field.onChange}>
                          <Label id="service_id" htmlFor="service_id">
                            Service
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceList?.map((service) => (
                              <SelectItem
                                key={service.id}
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
                        <Select onValueChange={field.onChange}>
                          <Label id="owner_id" htmlFor="owner_id">
                            Owner
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a owner" />
                          </SelectTrigger>
                          <SelectContent>
                            {ownerList?.map((owner) => (
                              <SelectItem
                                key={owner.id}
                                value={owner.id.toString()}
                              >
                                {owner.name}
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

export default AddTicketSolution;