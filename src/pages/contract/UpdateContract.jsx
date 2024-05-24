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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/custom/ErrorMessage";
import useContract from "@/hooks/contract/useContract";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { InputDateFormatter } from "@/utils/InputDateFormatter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCompanyList from "@/hooks/company/useCompanyList";

const UpdateContract = () => {
  const { id } = useParams();
  const { contract, loading, updateContract } = useContract(id);
  const { companies, fetchCompanySelectList } = useCompanyList();

  const schema = yup.object().shape({
    contract_num: yup.string().required("Contract number is required"),
    name: yup
      .string()
      .required("Name is required")
      .max(255, "Name must be at most 255 characters"),
    description: yup
      .string()
      .nullable()
      .max(1024, "Description must be at most 1024 characters"),
    company_id: yup.number().required("Company ID is required"),
    start_date: yup.date().required("Start date is required"),
    duration: yup
      .number()
      .required("Duration is required")
      .oneOf(
        [3, 6, 9, 12, 18, 24, 36],
        "Duration must be one of 3, 6, 9, 12, 18, 24, or 36 months"
      ),
    value: yup
      .number()
      .required("Value is required")
      .min(1000, "Value must be at least 1000"),
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
    if (data.start_date) {
      data.start_date = InputDateFormatter(data.start_date);
    }
    updateContract(data);
  };

  useEffect(() => {
    fetchCompanySelectList();
  }, []);

  useEffect(() => {
    if (contract) {
      setValue("contract_num", contract.contract_num);
      setValue("name", contract.name);
      setValue("description", contract.description);
      setValue("company_id", contract.company.id);
      setValue("start_date", contract.start_date);
      setValue("duration", contract.duration);
      setValue("value", contract.value);
    }
  }, [contract]);

  if (loading) return <Spinner size="medium" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Update Contract" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Update Contract</CardTitle>
              <CardDescription>
                Update name and description of the contract
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="contract_num">Contract Number</Label>
                    <Input
                      id="contract_num"
                      name="contract_num"
                      type="text"
                      className="w-full"
                      placeholder="Enter contract number"
                      {...register("contract_num")}
                    />
                    <ErrorMessage errors={errors} name="contract_num" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Contract Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full"
                      placeholder="Enter contract name"
                      {...register("name")}
                    />
                    <ErrorMessage errors={errors} name="name" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="value">Contract Value</Label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      defaultValue={1000}
                      className="w-full"
                      placeholder="Enter value"
                      {...register("value")}
                    />
                    <ErrorMessage errors={errors} name="value" />
                  </div>
                  <div className="grid gap-3">
                    <Controller
                      id="company_id"
                      name="company_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <Label id="company_id" htmlFor="company_id">
                            Company
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a company" />
                          </SelectTrigger>
                          <SelectContent>
                            {companies?.map((company, key) => (
                              <SelectItem
                                key={key}
                                value={company.id.toString()}
                              >
                                {company.company_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="company_id" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Controller
                      id="start_date"
                      name="start_date"
                      control={control}
                      render={({ field }) => (
                        <Popover>
                          <Label htmlFor="value">First date of contract</Label>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={
                                ("w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground")
                              }
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date().setHours(0, 0, 0, 0)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    <ErrorMessage errors={errors} name="start_date" />
                  </div>
                  <div className="grid gap-3">
                    <Controller
                      id="duration"
                      name="duration"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <Label id="duration" htmlFor="duration">
                            Duration
                          </Label>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"3"}>3 months</SelectItem>
                            <SelectItem value={"6"}>6 months</SelectItem>
                            <SelectItem value={"9"}>9 months</SelectItem>
                            <SelectItem value={"12"}>12 months</SelectItem>
                            <SelectItem value={"18"}>18 months</SelectItem>
                            <SelectItem value={"24"}>24 months</SelectItem>
                            <SelectItem value={"36"}>36 months</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="duration" />
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="w-full min-h-32"
                  placeholder="Enter field of business"
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

export default UpdateContract;
