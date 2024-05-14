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
import CategoryService from "@/services/CategoryService";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      var response = await CategoryService.getDetail(id);
      var result = response.result;
      setData((prevData) => ({
        ...prevData,
        name: result.name,
        description: result.description,
      }));
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (data[key] != null && data[key] !== "") {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    try {
      await CategoryService.update(id, filteredData);
      navigate("/manager/category");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) return <Spinner size="medium" />;

  return (
    <form onSubmit={onSubmit}>
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <DetailNavbar name="Update Category" />
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
                    type="text"
                    className="w-full"
                    placeholder="Enter name"
                    value={data.name}
                    onChange={onChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    className="min-h-32"
                    value={data.description}
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

export default UpdateCategory;
