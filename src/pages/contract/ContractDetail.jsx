import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronLeft, Notebook, ReceiptText } from "lucide-react";
import CompanyService from "@/servers/CompanyService";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { ContractStatusBadge, UserRoleToEnum } from "@/utils/EnumObject";
import { useAuth } from "@/contexts/AuthProvider";
import { RouteByRole } from "@/utils/RouteByRole";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useDialog from "@/hooks/useDialog";
import useContract from "@/hooks/contract/useContract";
import { ContractDetailCard } from "./ui/ContractDetailCard";
import { ContractCompanyDetailCard } from "./ui/ContractCompanyDetailCard";

const ContractDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { dialog, openDialog, closeDialog } = useDialog();
  const { contract, loading } = useContract(id);
  const route = RouteByRole(user.role);
  const navigate = useNavigate();

  const handleOpenUpdatePage = () => {
    navigate(`${route}/contract/update/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await CompanyService.delete(id).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                onClick={() => handleOpenUpdatePage(contract.id)}
              >
                Update
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => openDialog(contract.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="grid gap-8">
        <Card x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-16 w-16 sm:flex">
                <AvatarFallback className="text-2xl">
                  <ReceiptText className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex gap-2">
                  <p className="text-2xl font-medium leading-none">
                    {contract.name}
                  </p>
                  <span>
                    <ContractStatusBadge status={contract.status} />
                  </span>
                </div>
                <div className="text-sm">
                  <div className="flex gap-2 items-center">
                    <p className="text-muted-foreground">Contract Number:</p>
                    <span className="italic">{contract.contract_num}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex gap-2 items-center">
                    <p className="text-muted-foreground">Valid until:</p>
                    <span className="italic ">{contract.end_date}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="detail" className="flex flex-col items-start">
              <TabsList className="flex">
                <TabsTrigger value="detail" className="flex items-center ">
                  <p className="flex items-center gap-1 px-6">
                    <span>
                      <ReceiptText className="h-5 w-5" />
                    </span>
                    Contract Detail
                  </p>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center">
                  <p className="flex items-center gap-1 px-6">
                    <span>
                      <Notebook className="h-5 w-5" />
                    </span>
                    Services
                  </p>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="w-full mt-1">
                <div className="grid gap-8">
                  <ContractDetailCard contract={contract} />
                  <ContractCompanyDetailCard contract={contract} />
                </div>
              </TabsContent>
              <TabsContent value="services" className="w-full">
                {/* Content for Services */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <ConfirmDialog
        isOpen={dialog}
        content="Do you want to delete this contract?"
        onCancel={closeDialog}
        onConfirm={() => {
          handleConfirmDelete(contract.id);
        }}
      />
    </div>
  );
};

export default ContractDetail;
