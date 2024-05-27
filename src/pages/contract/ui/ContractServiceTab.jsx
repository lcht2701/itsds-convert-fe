import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContractServiceService from "@/servers/ContractServiceService";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import usePaginate from "@/hooks/usePaginate";
import CustomPagination from "@/components/custom/CustomPagination";
import useDialog from "@/hooks/useDialog";
import { useAuth } from "@/contexts/AuthProvider";
import { ContractStatusToEnum, UserRoleToEnum } from "@/utils/EnumObject";
import useContractServiceList from "@/hooks/contractService/useContractServiceList";
import { ContractServiceDialog } from "./ContractServiceDialog";

function ContractServiceTab({ contract }) {
  const { user } = useAuth();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { contractServices, loading, fetchContractServicesList } =
    useContractServiceList(contract.id, currentPage);
  const createDialog = useDialog();
  const deleteDialog = useDialog();

  const handleReload = () => {
    fetchContractServicesList().then(setPaginationData);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await ContractServiceService.delete(contract.id, id).then(() => {
        deleteDialog.closeDialog();
        handleReload();
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (contract) {
      handleReload();
    }
  }, [currentPage, fetchContractServicesList, setPaginationData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Contract Services</CardTitle>
          <CardDescription>
            Services that are included in this contract
          </CardDescription>
        </div>
        {user.role === UserRoleToEnum.MANAGER &&
          contract.status !== ContractStatusToEnum.EXPIRED && (
            <div className="ml-auto items-center">
              <Button
                type="button"
                size="sm"
                className="bg-blue-500 text-white gap-1"
                onClick={() => createDialog.openDialog(contract.id)}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add
                </span>
              </Button>
            </div>
          )}
      </CardHeader>
      {loading ? (
        <Spinner size="medium" className="mb-6" />
      ) : (
        <CardContent className="grid gap-4">
          {contractServices?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Updated at
                  </TableHead>
                  {user.role === UserRoleToEnum.MANAGER &&
                    contract.status !== ContractStatusToEnum.EXPIRED && (
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractServices?.map((service, key) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      {service.service?.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {service.service?.created_at}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {service.service?.updated_at}
                    </TableCell>
                    {user.role === UserRoleToEnum.MANAGER &&
                      contract.status !== ContractStatusToEnum.EXPIRED && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  deleteDialog.openDialog(service.id)
                                }
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No Services found</p>
          )}
        </CardContent>
      )}
      <CardFooter>
        <CustomPagination
          pagination={paginationData}
          onChangePage={onChangePage}
        />
      </CardFooter>
      <ContractServiceDialog
        isOpen={createDialog.dialog !== null}
        onCancel={() => {
          createDialog.closeDialog();
        }}
        contractId={contract.id}
        onReload={() => handleReload()}
      />
      <ConfirmDialog
        isOpen={deleteDialog.dialog !== null}
        content="Do you want to delete this service?"
        onCancel={() => deleteDialog.closeDialog()}
        onConfirm={() => {
          handleConfirmDelete(deleteDialog.dialog);
        }}
      />
    </Card>
  );
}

export default ContractServiceTab;
