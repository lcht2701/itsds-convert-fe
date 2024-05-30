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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TicketTaskService from "@/servers/TicketTaskService";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import usePaginate from "@/hooks/usePaginate";
import CustomPagination from "@/components/custom/CustomPagination";
import useDialog from "@/hooks/useDialog";
import { useAuth } from "@/contexts/AuthProvider";
import {
  ContractStatusToEnum,
  PriorityBadge,
  TicketTaskStatusBadge,
  UserRoleToEnum,
} from "@/utils/EnumObject";
import useTicketTaskList from "@/hooks/ticketTask/useTicketTaskList";
import { Progress } from "@/components/ui/progress";
import { CreateTicketTaskDialog } from "./CreateTicketTaskDialog";
import { UpdateTicketTaskDialog } from "./UpdateTicketTaskDialog";

function TicketTaskTab({ ticket }) {
  const { user } = useAuth();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { ticketTasks, loading, fetchTicketTaskList } = useTicketTaskList(
    ticket.id,
    currentPage
  );

  const createDialog = useDialog();
  const updateDialog = useDialog();
  const deleteDialog = useDialog();

  const handleReload = () => {
    fetchTicketTaskList().then(setPaginationData);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await TicketTaskService.delete(ticket.id, id).then(() => {
        deleteDialog.closeDialog();
        handleReload();
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (ticket) {
      handleReload();
    }
  }, [currentPage, fetchTicketTaskList, setPaginationData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Ticket Tasks</CardTitle>
          <CardDescription>Tasks that belong to the ticket</CardDescription>
        </div>
        {user.role === UserRoleToEnum.MANAGER &&
          ticket.status !== ContractStatusToEnum.EXPIRED && (
            <div className="ml-auto items-center">
              <Button
                type="button"
                size="sm"
                className="bg-blue-500 text-white gap-1"
                onClick={() => createDialog.openDialog(ticket.id)}
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
          {ticketTasks?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Start Time
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Finish Time
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Progress
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Updated at
                  </TableHead>
                  {user.role === UserRoleToEnum.MANAGER &&
                    ticket.status !== ContractStatusToEnum.EXPIRED && (
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticketTasks?.map((task, key) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      {task.title || "-"}
                    </TableCell>
                    <TableCell className="font-medium">
                      <PriorityBadge status={task.priority} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TicketTaskStatusBadge status={task.task_status} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {task.created_by?.name}
                    </TableCell>
                    <TableCell className="font-medium hidden md:table-cell">
                      {task.start_time || "-"}
                    </TableCell>
                    <TableCell className="font-medium hidden md:table-cell">
                      {task.end_time || "-"}
                    </TableCell>
                    <TableCell className="font-medium hidden md:table-cell">
                      <Progress value={task.progress} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {task.created_at}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {task.updated_at}
                    </TableCell>
                    {user.role === UserRoleToEnum.MANAGER &&
                      ticket.status !== ContractStatusToEnum.EXPIRED && (
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
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => updateDialog.openDialog(task.id)}
                              >
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteDialog.openDialog(task.id)}
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
            <p>No Tasks found</p>
          )}
        </CardContent>
      )}
      <CardFooter>
        <CustomPagination
          pagination={paginationData}
          onChangePage={onChangePage}
        />
      </CardFooter>
      <CreateTicketTaskDialog
        isOpen={createDialog.dialog !== null}
        onCancel={() => {
          createDialog.closeDialog();
        }}
        ticketId={ticket.id}
        onReload={() => handleReload()}
      />
      <UpdateTicketTaskDialog
        isOpen={updateDialog.dialog !== null}
        onCancel={() => {
          updateDialog.closeDialog();
        }}
        ticketId={ticket.id}
        id={updateDialog.dialog}
        onReload={() => handleReload()}
      />
      <ConfirmDialog
        isOpen={deleteDialog.dialog !== null}
        content="Do you want to delete this task?"
        onCancel={() => deleteDialog.closeDialog()}
        onConfirm={() => {
          handleConfirmDelete(deleteDialog.dialog);
        }}
      />
    </Card>
  );
}

export default TicketTaskTab;
