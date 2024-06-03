import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Lightbulb,
  ReceiptText,
  Ticket,
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
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { TicketStatusBadge } from "@/utils/EnumObject";

export function HomeManager() {
  const { data, loading, fetchManagerDashboard } = useDashboard();
  const routeByRole = RouteByRole(user.role);

  useEffect(() => {
    fetchManagerDashboard();
  }, []);

  if (loading) return <Spinner size="medium" />;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Tickets</CardTitle>
            <Ticket className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.new_tickets_current_month}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.new_tickets_percentage} from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              New Ticket Solutions
            </CardTitle>
            <Lightbulb className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.new_solutions_current_month}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.new_solutions_percentage} from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Contracts</CardTitle>
            <ReceiptText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.new_contracts_current_month}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.new_contracts_percentage} from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.new_active_users_current_month}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.new_active_users_percentage} since last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Recent tickets requested</CardDescription>
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
            <CardTitle>Recent New Users</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {data.recent_new_users.map((user, key) => (
              <div className="flex items-center gap-4" key={key}>
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="ml-auto">{user.created_at}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
