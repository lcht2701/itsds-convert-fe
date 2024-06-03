import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  ContactRound,
  CreditCard,
  DollarSign,
  MonitorStop,
  ReceiptText,
  TicketCheck,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import useDashboard from "@/hooks/dashboard/useDashboard";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { TicketStatusBadge } from "@/utils/EnumObject";
import { RouteByRole } from "@/utils/RouteByRole";

export function HomeTechnician() {
  const { user } = useAuth();
  const { data, loading, fetchTechnicianDashboard } = useDashboard();
  const routeByRole = RouteByRole(user.role);

  useEffect(() => {
    fetchTechnicianDashboard(user.id);
  }, []);

  if (loading) return <Spinner size="medium" />;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Assigned Tickets
            </CardTitle>
            <ReceiptText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.current_assigned_tickets}
            </div>
            <p className="text-xs text-muted-foreground">
              Current progressing: {data.current_progressing_tickets}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Completed Tickets
            </CardTitle>
            <TicketCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.total_completed_tickets}
            </div>
            <p className="text-xs text-muted-foreground">
              No. Cancelled Tickets: {data.total_cancel_tickets}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Newly Assigned
            </CardTitle>
            <ContactRound className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.new_tickets_month}</div>
            <p className="text-xs text-muted-foreground">
              {data.new_tickets_month_percentage} from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Ticket Solutions Owned
            </CardTitle>
            <MonitorStop className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.num_solutions_owned}</div>
            <p className="text-xs text-muted-foreground">
              Today's Interactions: {data.num_actions_today}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Recent tickets assigned to me</CardDescription>
            </div>
            <Button asChild size="sm" className="gap-1 ml-auto">
              <Link to={`${routeByRole}/ticket`}>
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.available_tickets.map((ticket, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <div className="font-medium">{ticket.title || "-"}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Requested by: {ticket.requester?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      {<TicketStatusBadge status={ticket?.status} />}
                    </TableCell>
                    <TableCell>{ticket.updated_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Completed Ticket</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {data.recent_solved_tickets.map((ticket, key) => (
              <div className="flex items-center gap-4" key={key}>
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    {ticket.title.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {ticket.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Completed Time: {ticket.completed_time}
                  </p>
                </div>
                <div className="ml-auto">{ticket.requester?.name}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
