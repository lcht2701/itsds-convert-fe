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
import React, { useEffect, useState } from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CompanyMemberService from "@/servers/CompanyMemberService";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { CompanyMemberDialog } from "./CompanyMemberDialog";
import useCompanyMemberList from "@/hooks/companyMember/useCompanyMemberList";
import usePaginate from "@/hooks/usePaginate";
import CustomPagination from "@/components/custom/CustomPagination";
import useDialog from "@/hooks/useDialog";
import { useAuth } from "@/contexts/AuthProvider";
import { UserRoleToEnum } from "@/utils/EnumObject";

function CompanyMemberTab({ companyId }) {
  const { user } = useAuth();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { companyMembers, loading, fetchCompanyMemberList } =
    useCompanyMemberList(companyId, currentPage);

  const createDialog = useDialog();
  const updateDialog = useDialog();
  const deleteDialog = useDialog();

  const handleReload = () => {
    fetchCompanyMemberList().then(setPaginationData);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await CompanyMemberService.delete(companyId, id).then(() => {
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
  }, [currentPage, fetchCompanyMemberList, setPaginationData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Company Members</CardTitle>
          <CardDescription>Related members of this company</CardDescription>
        </div>
        {user.role === UserRoleToEnum.MANAGER && (
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
        )}
      </CardHeader>
      {loading ? (
        <Spinner size="medium" className="mb-6" />
      ) : (
        <CardContent className="grid gap-4">
          {companyMembers?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Updated at
                  </TableHead>
                  {user.role === UserRoleToEnum.MANAGER && (
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {companyMembers?.map((member, key) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      {member.member?.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {member.companyAddress?.address}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {member.created_at}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {member.updated_at}
                    </TableCell>
                    {user.role === UserRoleToEnum.MANAGER && (
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
                                updateDialog.handleOpenDialog(member.id)
                              }
                            >
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                deleteDialog.handleOpenDialog(member.id)
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
            <p>No Members found</p>
          )}
        </CardContent>
      )}
      <CardFooter>
        <CustomPagination
          pagination={paginationData}
          onChangePage={onChangePage}
        />
      </CardFooter>
      <CompanyMemberDialog
        isOpen={createDialog.dialog !== null || updateDialog.dialog !== null}
        onCancel={() => {
          createDialog.handleCloseDialog();
          updateDialog.handleCloseDialog();
        }}
        companyId={companyId}
        updateMemberId={updateDialog.dialog}
        onReload={() => handleReload()}
      />
      <ConfirmDialog
        isOpen={deleteDialog.dialog !== null}
        content="Do you want to delete this member?"
        onCancel={() => deleteDialog.handleCloseDialog()}
        onConfirm={() => {
          handleConfirmDelete(deleteDialog.dialog);
        }}
      />
    </Card>
  );
}

export default CompanyMemberTab;
