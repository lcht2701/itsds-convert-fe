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
import React from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CompanyMemberTab(props) {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
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
            onClick={() => null}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {props.companyMembers?.length > 0 ? (
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
              {props.companyMembers?.map((member, key) => (
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
                        <DropdownMenuItem onClick={() => null}>
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => null}>
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
    </Card>
  );
}

export default CompanyMemberTab;
