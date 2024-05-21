import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import React, { useState } from "react";
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

function CompanyMemberTab({ companyMembers, companyId, onReload }) {
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [updateDialogId, setUpdateDialogId] = useState(null);
  const [deleteDialogId, setDeleteDialogId] = useState(null);

  // Handle Delete Address
  const handleConfirmDelete = async (id) => {
    try {
      setLoading(true);
      await CompanyMemberService.delete(companyId, id).then(() => {
        setDeleteDialogId(null);
        onReload();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Company Members</CardTitle>
          <CardDescription>Related members of this company</CardDescription>
        </div>
        <div className="ml-auto items-center">
          <Button
            type="button"
            size="sm"
            className="bg-blue-500 text-white gap-1"
            onClick={() => setCreateDialog(true)}
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
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
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
                            onClick={() => setUpdateDialogId(member.id)}
                          >
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteDialogId(member.id)}
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
            <p>No Members found</p>
          )}
        </CardContent>
      )}

      <CompanyMemberDialog
        isOpen={createDialog || updateDialogId !== null}
        onCancel={() => {
          setCreateDialog(false);
          setUpdateDialogId(null);
        }}
        companyId={companyId}
        onReload={onReload}
        updateMemberId={updateDialogId}
      />
      <ConfirmDialog
        isOpen={deleteDialogId !== null}
        content="Do you want to delete this member?"
        onCancel={() => setDeleteDialogId(null)}
        onConfirm={() => {
          handleConfirmDelete(deleteDialogId);
        }}
      />
    </Card>
  );
}

export default CompanyMemberTab;
