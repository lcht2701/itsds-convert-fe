import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import CompanyService from "@/servers/CompanyService";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { UserRoleToEnum } from "@/utils/EnumObject";
import { useAuth } from "@/contexts/AuthProvider";
import { RouteByRole } from "@/utils/RouteByRole";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import CompanyAddressTab from "./ui/CompanyAddressTab";
import CompanyMemberTab from "./ui/CompanyMemberTab";
import { CompanyDetailCard } from "./ui/CompanyDetailCard";

const CompanyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [company, setCompany] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = RouteByRole(user.role);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      var response = await CompanyService.getDetail(id);
      var result = response.result;
      setCompany(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdatePage = () => {
    navigate(`${route}/company/update/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await CompanyService.delete(id).then(() => {
        setOpen(false);
        setLoading(true);
        navigate(-1);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner size="medium" />;

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Company Detail
        </h1>
        <div className="ml-auto items-center gap-2 flex">
          {user.role === UserRoleToEnum.MANAGER && (
            <>
              <Button
                type="button"
                size="sm"
                className="bg-blue-500 text-white"
                onClick={() => handleOpenUpdatePage(company.id)}
              >
                Update
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => openDialog()}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="grid gap-8">
        <CompanyDetailCard company={company} />
        <Tabs defaultValue="address" className="flex flex-col items-start">
          <TabsList className="flex">
            <TabsTrigger value="address" className="px-6">
              Addresses
            </TabsTrigger>
            <TabsTrigger value="member" className="px-6">
              Members
            </TabsTrigger>
          </TabsList>
          <TabsContent value="address" className="w-full mt-2">
            <CompanyAddressTab companyId={company.id} />
          </TabsContent>
          <TabsContent value="member" className="w-full mt-2">
            <CompanyMemberTab companyId={company.id} />
          </TabsContent>
        </Tabs>
      </div>
      <ConfirmDialog
        isOpen={isOpen}
        content="Do you want to delete this company?"
        onCancel={handleCancel}
        onConfirm={() => {
          handleConfirmDelete(company.id);
        }}
      />
    </div>
  );
};

export default CompanyDetail;
