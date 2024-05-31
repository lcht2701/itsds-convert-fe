import { useEffect } from "react";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import CustomPagination from "@/components/custom/CustomPagination";
import { useNavigate } from "react-router-dom";
import ListNavBar from "@/components/custom/ListNav";
import { TicketStatusBadge, UserRoleToEnum } from "@/utils/EnumObject";
import useTicketList from "@/hooks/ticket/useTicketList";
import usePaginate from "@/hooks/usePaginate";

const TicketList = () => {
  const navigate = useNavigate();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { tickets, loading, fetchTicketList } = useTicketList(currentPage);

  const handleOpenDetailPage = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    fetchTicketList().then(setPaginationData);
  }, [currentPage, fetchTicketList, setPaginationData]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <ListNavBar
            navigate={navigate}
            acceptedRoles={[
              UserRoleToEnum.MANAGER,
              UserRoleToEnum.TECHNICIAN,
              UserRoleToEnum.CUSTOMER,
              UserRoleToEnum.COMPANYADMIN,
            ]}
          />
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Tickets</CardTitle>
                <CardDescription>
                  Manage tickets and their details
                </CardDescription>
              </CardHeader>
              {loading ? (
                <Spinner size="medium" />
              ) : (
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only"></span>
                        </TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Updated at
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {tickets?.map((ticket, key) => (
                        <TableRow
                          key={key}
                          onClick={() => handleOpenDetailPage(ticket.id)}
                        >
                          <TableCell className="hidden sm:table-cell">
                            {ticket.id || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {ticket.requester?.name || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {ticket.title || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {ticket.service?.name || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            <TicketStatusBadge status={ticket.status} />
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {ticket.created_at}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {ticket.updated_at}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              )}
              <CardFooter>
                <CustomPagination
                  pagination={paginationData}
                  onChangePage={onChangePage}
                />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default TicketList;
