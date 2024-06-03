import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

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

export function HomeCompanyAdmin() {
  const { user } = useAuth();
  const { data, loading, fetchCompanyAdminDashboard } = useDashboard();
  const routeByRole = RouteByRole(user.role);

  useEffect(() => {
    fetchCompanyAdminDashboard(user.id);
  }, []);

  if (loading) return <Spinner size="medium" />;
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Company's New Tickets
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.num_company_new_tickets}
            </div>
            <p className="text-xs text-muted-foreground">
              In Processing: {data.num_company_progressing_tickets}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Completed Tickets
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.total_company_completed_tickets}
            </div>
            <p className="text-xs text-muted-foreground">
              Cancelled: {data.total_company_cancelled_tickets} tickets
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Company Detail
            </CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.company_members}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Contracts
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.active_contracts}</div>
            {/* <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your store.
              </CardDescription>
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
                {data.recent_company_tickets.map((ticket, key) => (
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
            <CardTitle>Recent Sales</CardTitle>
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
