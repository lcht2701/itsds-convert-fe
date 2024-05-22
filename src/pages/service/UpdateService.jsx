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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/custom/ErrorMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import useCategoryList from "@/hooks/category/useCategoryList";
import useService from "@/hooks/service/useService";

const UpdateService = () => {
  const { id } = useParams();
  const { categories, fetchCategorySelectList } = useCategoryList();
  const { service, loading, updateService } = useService(id);

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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    updateService(data);
  };

  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("description", service.description);
      setValue("category_id", service.category?.id);
    }

    fetchCategorySelectList();
  }, [service]);

  if (loading) return <Spinner size="medium" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Update Service" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Update Service</CardTitle>
              <CardDescription>
                Update name and description of the service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString()}
                      >
                        <Label id="category_id" htmlFor="category_id">
                          Category
                        </Label>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category, key) => (
                            <SelectItem
                              key={key}
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

export default UpdateService;
