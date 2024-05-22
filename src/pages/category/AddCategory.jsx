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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/custom/ErrorMessage";
import useCategory from "@/hooks/category/useCategory";

const AddCategory = () => {
  const { addCategory } = useCategory();
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    addCategory(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Add Category" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>New Category</CardTitle>
              <CardDescription>
                Input name and description of the category
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
                </div>
                <ErrorMessage errors={errors} name="description" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </form>
  );
};

export default AddCategory;
