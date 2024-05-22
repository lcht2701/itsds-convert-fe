import React, { useEffect, useState } from "react";
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
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import CompanyAddressService from "@/servers/CompanyAddressService";
import { Spinner } from "@/components/ui/spinner";
import { CompanyAddressDialog } from "./CompanyAddressDialog";
import useCompanyAddressList from "@/hooks/companyAddress/useCompanyAddressList";
import usePaginate from "@/hooks/usePaginate";
import CustomPagination from "@/components/custom/CustomPagination";
import useDialog from "@/hooks/useDialog";

function CompanyAddressTab({ companyId }) {
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { companyAddresses, loading, fetchCompanyAddressList } =
    useCompanyAddressList(companyId, currentPage);
  const createDialog = useDialog();
  const updateDialog = useDialog();
  const deleteDialog = useDialog();

  const handleReload = () => {
    fetchCompanyAddressList().then(setPaginationData);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await CompanyAddressService.delete(companyId, id).then(() => {
        deleteDialog.handleCloseDialog();
        handleReload();
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (companyId) {
      handleReload();
    }
  }, [currentPage, fetchCompanyAddressList, setPaginationData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Company Addresses</CardTitle>
          <CardDescription>Related locations of this company</CardDescription>
        </div>
        <div className="ml-auto items-center">
          <Button
            type="button"
            size="sm"
            className="bg-blue-500 text-white gap-1"
            onClick={() => createDialog.handleOpenDialog(companyId)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add
            </span>
          </Button>
        </div>
      </CardHeader>
      {loading ? (
        <Spinner size="medium" className="mb-6" />
      ) : (
        <CardContent className="grid gap-4">
          {companyAddresses?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Updated at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {companyAddresses?.map((address, key) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      {address.address}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {address.created_at}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {address.updated_at}
                    </TableCell>
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
                              updateDialog.handleOpenDialog(address.id)
                            }
                          >
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              deleteDialog.handleOpenDialog(address.id)
                            }
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No Addresses found</p>
          )}
        </CardContent>
      )}
      <CardFooter>
        <CustomPagination
          pagination={paginationData}
          onChangePage={onChangePage}
        />
      </CardFooter>
      <CompanyAddressDialog
        isOpen={createDialog.dialog !== null || updateDialog.dialog !== null}
        onCancel={() => {
          createDialog.handleCloseDialog();
          updateDialog.handleCloseDialog();
        }}
        companyId={companyId}
        updateAddressId={updateDialog.dialog}
        onReload={() => handleReload()}
      />
      <ConfirmDialog
        isOpen={deleteDialog.dialog !== null}
        content="Do you want to delete this address?"
        onCancel={() => deleteDialog.handleCloseDialog()}
        onConfirm={() => {
          handleConfirmDelete(deleteDialog.dialog);
        }}
      />
    </Card>
  );
}

export default CompanyAddressTab;
