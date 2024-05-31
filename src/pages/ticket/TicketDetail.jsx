import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  ChevronLeft,
  ClipboardList,
  ListTodo,
  MessageCircleMore,
  Phone,
  Ticket,
} from "lucide-react";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import {
  PriorityBadge,
  TicketImpactBadge,
  TicketStatusBadge,
  TicketStatusToEnum,
  TicketTypeBadge,
  UserRoleToEnum,
  UserRoleToString,
} from "@/utils/EnumObject";
import { useAuth } from "@/contexts/AuthProvider";
import { RouteByRole } from "@/utils/RouteByRole";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useDialog from "@/hooks/useDialog";
import useTicket from "@/hooks/ticket/useTicket";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@radix-ui/react-tabs";
import TicketDetailTab from "./ui/TicketDetailTab";
import TicketTaskTab from "./ui/TicketTaskTab";
import UpdateStatusButton from "./ui/UpdateStatusButton";
import AssignTicketButton from "./ui/AssignTicketButton";
import useAssignment from "@/hooks/assignment/useAssignment";
import CancelTicketButton from "./ui/CancelTicketButton";

const TicketDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { dialog, openDialog, closeDialog } = useDialog();
  const { ticket, loading, fetchTicket } = useTicket(id);
  const { assignment, fetchAssignment } = useAssignment(id);
  const route = RouteByRole(user.role);
  const navigate = useNavigate();

  const handleOpenUpdatePage = () => {
    navigate(`${route}/ticket/update/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await TicketService.delete(id).then(() => {
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
          Ticket Detail
        </h1>
        <div className="ml-auto items-center gap-2 flex">
          <AssignTicketButton
            ticketId={ticket.id}
            onReload={() => fetchAssignment()}
            isShow={
              user.role === UserRoleToEnum.MANAGER &&
              ticket.status !== TicketStatusToEnum.CLOSED &&
              ticket.status !== TicketStatusToEnum.CANCELLED
            }
          />
          <CancelTicketButton
            ticketId={ticket.id}
            onReload={() => fetchTicket()}
            isShow={
              (user.role === UserRoleToEnum.CUSTOMER ||
                user.role === UserRoleToEnum.COMPANYADMIN) &&
              ticket.status === TicketStatusToEnum.ASSIGNED
            }
          />
          <UpdateStatusButton
            ticketId={ticket.id}
            onReload={() => fetchTicket()}
            isShow={
              (user.role === UserRoleToEnum.MANAGER ||
                user.role === UserRoleToEnum.TECHNICIAN) &&
              ticket.status !== TicketStatusToEnum.CLOSED &&
              ticket.status !== TicketStatusToEnum.CANCELLED
            }
          />

          {(ticket.status === TicketStatusToEnum.ASSIGNED ||
            ((user.role === UserRoleToEnum.MANAGER ||
              user.role === UserRoleToEnum.TECHNICIAN) &&
              ticket.status !== TicketStatusToEnum.CLOSED &&
              ticket.status !== TicketStatusToEnum.CANCELLED)) && (
            <Button
              type="button"
              size="sm"
              className="bg-blue-500 text-white"
              onClick={() => handleOpenUpdatePage(ticket.id)}
            >
              Update
            </Button>
          )}

          {(user.role === UserRoleToEnum.MANAGER ||
            user.role === UserRoleToEnum.TECHNICIAN) &&
            ticket.status !== TicketStatusToEnum.CLOSED &&
            ticket.status !== TicketStatusToEnum.CANCELLED && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => openDialog(ticket.id)}
              >
                Delete
              </Button>
            )}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-6 xl:grid-cols-12">
        <Card className="lg:col-span-4 xl:col-span-9">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-16 w-16 sm:flex">
                <AvatarFallback className="text-2xl">
                  <Ticket className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-2xl font-medium leading-none">
                  {ticket.title}
                </p>
                <div className="text-sm">
                  <div className="flex gap-2 items-center">
                    <p className="text-muted-foreground">Requester:</p>
                    <span className="italic">{ticket.requester?.name}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex gap-2 items-center">
                    <p className="text-muted-foreground">Created at:</p>
                    <span className="italic ">{ticket.created_at}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="detail" className="flex flex-col items-start">
              <TabsList className="flex">
                <TabsTrigger value="detail" className="flex items-center">
                  <p className="flex items-center gap-1 px-6">
                    <span>
                      <ListTodo className="h-5 w-5" />
                    </span>
                    Detail
                  </p>
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex items-center">
                  <p className="flex items-center gap-1 px-6">
                    <span>
                      <ClipboardList className="h-5 w-5" />
                    </span>
                    Tasks
                  </p>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="w-full mt-2">
                <TicketDetailTab ticket={ticket} />
              </TabsContent>
              <TabsContent value="tasks" className="w-full mt-2">
                <TicketTaskTab ticket={ticket} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 xl:col-span-3">
          <CardHeader>
            <CardTitle>More</CardTitle>
            <CardDescription>
              Related information about this ticket
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Status</div>
                <div className="truncate">
                  <TicketStatusBadge status={ticket.status} />
                </div>
              </div>
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Priority</div>
                <div className="truncate">
                  <PriorityBadge status={ticket.priority} />
                </div>
              </div>
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Impact</div>
                <div className="truncate">
                  <TicketImpactBadge status={ticket.impact} />
                </div>
              </div>
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Ticket Type</div>
                <div className="truncate">
                  <TicketTypeBadge status={ticket.type} />
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <Separator />
              <CardTitle className="text-lg flex items-center gap-6">
                <p>Requester Detail</p>
                <span className="flex items-center gap-2">
                  <Phone className="h-5 w-5" color="#40A578" />
                  <MessageCircleMore className="h-5 w-5" color="#285cd7" />
                </span>
              </CardTitle>
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Name</div>
                <div className="truncate">{ticket.requester?.name || "-"}</div>
              </div>
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Phone</div>
                <div className="truncate">{ticket.requester?.phone || "-"}</div>
              </div>
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Email</div>
                <div className="truncate">{ticket.requester?.email || "-"}</div>
              </div>
              <div className="grid grid-cols-2 text-sm font-medium">
                <div>Role</div>
                <div className="truncate">
                  {UserRoleToString[ticket.requester?.role]}
                </div>
              </div>
            </div>
            {assignment && assignment.ticket && (
              <div className="grid gap-6">
                <Separator />
                <CardTitle className="text-lg">
                  Your Technician Detail
                </CardTitle>
                <div className="grid grid-cols-2 text-sm font-medium">
                  <div>Technician Name</div>
                  <div className="truncate">
                    {assignment.technician?.name || "-"}
                  </div>
                </div>
                <div className="grid grid-cols-2 text-sm font-medium">
                  <div>Technician Phone</div>
                  <div className="truncate">
                    {assignment.technician?.phone || "-"}
                  </div>
                </div>
                <div className="grid grid-cols-2 text-sm font-medium">
                  <div>Technician Email</div>
                  <div className="truncate">
                    {assignment.technician?.email || "-"}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <ConfirmDialog
        isOpen={dialog}
        content="Do you want to delete this ticket?"
        onCancel={closeDialog}
        onConfirm={() => {
          handleConfirmDelete(ticket.id);
        }}
      />
    </div>
  );
};

export default TicketDetail;
