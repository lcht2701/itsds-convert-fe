import { Link } from "react-router-dom";
import { ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useAuth } from "@/contexts/AuthProvider";
import useDashboard from "@/hooks/dashboard/useDashboard";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { TicketStatusBadge } from "@/utils/EnumObject";
import { RouteByRole } from "@/utils/RouteByRole";

export function HomeCustomer() {
  const { user } = useAuth();
  const { data, loading, fetchCustomerDashboard } = useDashboard();
  const routeByRole = RouteByRole(user.role);

  useEffect(() => {
    fetchCustomerDashboard(user.id);
  }, []);

  if (loading) return <Spinner size="medium" />;
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Tickets</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.num_new_tickets}</div>
            <p className="text-xs text-muted-foreground">
              Current progressing: {data.num_progressing_tickets}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Completed Tickets
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.total_completed_tickets}
            </div>
            <p className="text-xs text-muted-foreground">
              Cancelled Ticket: {data.total_cancel_tickets}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Tickets Requested This Month
            </CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.count_tickets_month}</div>
            <p className="text-xs text-muted-foreground">
              {data.count_tickets_month_percentage} from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>My Ticket Lists</CardDescription>
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
                {data.recent_tickets.map((ticket, key) => (
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
            <CardTitle>Ticket Solutions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {data.recent_ticket_solutions.map((solution, key) => (
              <div className="flex items-center gap-4" key={key}>
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    {solution.title.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {solution.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Owner: {solution.owner?.name}
                  </p>
                </div>
                <div className="ml-auto">{solution.created_at}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
