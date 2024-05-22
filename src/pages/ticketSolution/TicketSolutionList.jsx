import React from "react";
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
import { UserRoleToEnum } from "@/utils/EnumObject";
import usePaginate from "@/hooks/usePaginate";
import useTicketSolutionList from "@/hooks/ticketSolution/useTicketSolutionList";

const TicketSolutionList = () => {
  const navigate = useNavigate();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { ticketSolutions, loading, fetchTicketSolutionList } =
    useTicketSolutionList(currentPage);

  const handleOpenDetailPage = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    fetchTicketSolutionList().then(setPaginationData);
  }, [currentPage, fetchTicketSolutionList, setPaginationData]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <ListNavBar
            navigate={navigate}
            acceptedRoles={[UserRoleToEnum.MANAGER, UserRoleToEnum.TECHNICIAN]}
          />
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Ticket Solutions</CardTitle>
                <CardDescription>
                  Manage ticket solutions and their details
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
                          <span className="sr-only">Id</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Owner
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Reviewed Date
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Keyword
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created By
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Updated at
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {ticketSolutions?.map((solution, key) => (
                        <TableRow
                          key={key}
                          onClick={() => handleOpenDetailPage(solution.id)}
                          className="cursor-pointer"
                        >
                          <TableCell className="hidden sm:table-cell">
                            {solution.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {solution.title}
                          </TableCell>
                          <TableCell className="font-medium">
                            {solution.service?.name || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {solution.owner?.name || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {solution.review_date || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {solution.keyword || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {solution.createdBy?.name || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {solution.created_at}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {solution.updated_at}
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

export default TicketSolutionList;
