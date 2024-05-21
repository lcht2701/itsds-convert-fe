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
import { useEffect, useState } from "react";
import CompanyService from "@/servers/CompanyService";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Controller, useForm } from "react-hook-form";
import { handleNullInputField } from "@/utils/HandleNullInputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const schema = yup.object().shape({
    company_name: yup
      .string()
      .required("Name is required")
      .max(255, "Max 255 characters"),
    tax_code: yup
      .string()
      .nullable()
      .min(10, "Min 10 digits")
      .max(13, "Max 13 digits"),
    phone: yup
      .string()
      .required("Phone Number is required")
      .min(10, "Min 10 digits")
      .max(15, "Max 15 digits")
      .matches(/^\d+$/, "Phone Number can only contains digits"),
    email: yup.string().email("Email address must be valid"),
    field_of_business: yup.string().max(255, "Max 255 characters"),
    is_active: yup.boolean(),
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
    data = handleNullInputField(data);
    console.log(data);
    try {
      await CompanyService.update(id, data);
      navigate("/manager/company");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        var response = await CompanyService.getDetail(id);
        var result = response.result;
        setValue("company_name", result.company_name);
        setValue("tax_code", result.tax_code);
        setValue("phone", result.phone);
        setValue("email", result.email);
        setValue("field_of_business", result.field_of_business);
        setValue("company_website", result.company_website);
        setValue("is_active", result.is_active);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner size="medium" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Update Company" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Update Company</CardTitle>
              <CardDescription>
                Update name and description of the company
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-10">
                  <div className="grid gap-3">
                    <Label htmlFor="logo">Logo</Label>
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      className="w-full"
                      disabled
                      {...register("logo")}
                    />
                    <ErrorMessage errors={errors} name="logo" />
                  </div>
                  <div>
                    <Controller
                      id="is_active"
                      name="is_active"
                      control={control}
                      render={({ field }) => (
                        <div className="grid gap-3">
                          <Label
                            htmlFor="is_active"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Set Active
                          </Label>
                          <Switch
                            className="mt-2"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      )}
                    />
                    <ErrorMessage errors={errors} name="is_active" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-10">
                  <div className="grid gap-3">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      type="text"
                      className="w-full"
                      placeholder="Enter name"
                      {...register("company_name")}
                    />
                    <ErrorMessage errors={errors} name="company_name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tax_code">Tax Code</Label>
                    <Input
                      id="tax_code"
                      name="tax_code"
                      type="text"
                      className="w-full"
                      placeholder="Enter tax code"
                      {...register("tax_code")}
                    />
                    <ErrorMessage errors={errors} name="tax_code" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-10">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                    <ErrorMessage errors={errors} name="email" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      className="w-full"
                      placeholder="Enter phone"
                      {...register("phone")}
                    />
                    <ErrorMessage errors={errors} name="phone" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-10">
                  <div className="grid gap-3">
                    <Label htmlFor="company_website">Company Website</Label>
                    <Input
                      id="company_website"
                      name="company_website"
                      type="text"
                      className="w-full"
                      placeholder="Enter website"
                      {...register("company_website")}
                    />
                    <ErrorMessage errors={errors} name="company_website" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="field_of_business">Field Of Business</Label>
                    <Input
                      id="field_of_business"
                      name="field_of_business"
                      type="text"
                      className="w-full"
                      placeholder="Enter field of business"
                      {...register("field_of_business")}
                    />
                    <ErrorMessage errors={errors} name="field_of_business" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </form>
  );
};

export default UpdateCompany;
