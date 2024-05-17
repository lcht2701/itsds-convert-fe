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
import CategoryService from "@/servers/CategoryService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

const AddService = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().nullable(),
    category_id: yup.number().nullable(),
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
      await ServiceService.add(data);
      navigate("/manager/service");
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        var response = await CategoryService.getSelectList();
        console.log("Get select list", response.result);
        setCategoryList(response.result);
      } catch (error) {
        console.log("Error fetching select list: ", error);
      }
    };

    fetchCategoryList();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit(id))}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Add Service" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>New Service</CardTitle>
              <CardDescription>
                Input name and description of the service
              </CardDescription>
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
                    placeholder="Enter name"
                    {...register("name")}
                  />
                  <ErrorMessage errors={errors} name="name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    className="min-h-32"
                    {...register("description")}
                  />
                  <ErrorMessage errors={errors} name="description" />
                </div>
                <div className="grid gap-3">
                  <Controller
                    id="category_id"
                    name="category_id"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <Label id="category_id" htmlFor="category_id">
                          Category
                        </Label>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryList?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <ErrorMessage errors={errors} name="category_id" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </form>
  );
};

export default AddService;
