import React from "react";
import { useCallback, useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import TicketSolutionService from "@/servers/TicketSolutionService";
import ListNavBar from "@/components/custom/ListNav";

const TicketSolutionList = () => {
  const [ticketSolutions, setTicketSolutions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDialogId, setActiveDialogId] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      var response = await TicketSolutionService.getPaginatedList(currentPage);
      setTicketSolutions(response.result.data);
      setPagination(response.result.pagination);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const onChangePage = (pageNumber) => {
    if (pageNumber !== null) setCurrentPage(pageNumber);
  };

  const handleOpenDetailPage = (id) => {
    navigate(`detail/${id}`);
  };

  const handleOpenUpdatePage = (id) => {
    navigate(`update/${id}`);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await TicketSolutionService.delete(id).then(() => {
        setActiveDialogId(null);
        setLoading(true);
        fetchData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setActiveDialogId(null);
  };

  const handleOpenDialog = (id) => {
    setActiveDialogId(id);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, fetchData]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <ListNavBar navigate={navigate} />
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
                        <TableHead>
                          <span className="sr-only">Actions</span>
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
                                  onClick={() =>
                                    handleOpenUpdatePage(solution.id)
                                  }
                                >
                                  Update
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleOpenDialog(solution.id)}
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
                </CardContent>
              )}
              <CardFooter>
                <CustomPagination
                  pagination={pagination}
                  onChangePage={onChangePage}
                />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <ConfirmDialog
          isOpen={activeDialogId !== null}
          content="Do you want to delete this solution?"
          onCancel={handleCancel}
          onConfirm={() => {
            handleConfirmDelete(activeDialogId);
          }}
        />
      </main>
    </>
  );
};

export default TicketSolutionList;
