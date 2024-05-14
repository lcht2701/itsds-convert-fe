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
import { useState } from "react";
import CategoryService from "@/services/CategoryService";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: null,
  });

  const onChange = (e) => {
    const value = e.target.value || null;
    setData({ ...data, [e.target.id]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (data[key] != null && data[key] !== "") {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    try {
      await CategoryService.add(filteredData);
      navigate("/manager/category");
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Add Category" />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>New Category</CardTitle>
              <CardDescription>
                Input name and description of new category
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
                    onChange={onChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    className="min-h-32"
                    onChange={onChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </form>
  );
};

export default AddCategory;
