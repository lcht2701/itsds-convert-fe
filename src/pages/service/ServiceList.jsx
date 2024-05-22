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
import ServiceService from "@/servers/ServiceService";
import { Spinner } from "@/components/ui/spinner";
import CustomPagination from "@/components/custom/CustomPagination";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import ListNavBar from "@/components/custom/ListNav";
import { UserRoleToEnum } from "@/utils/EnumObject";
import usePaginate from "@/hooks/usePaginate";
import useDialog from "@/hooks/useDialog";
import useServiceList from "@/hooks/service/useServiceList";

const ServiceList = () => {
  const navigate = useNavigate();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { services, loading, fetchList } = useServiceList(currentPage);
  const { activeDialogId, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleOpenUpdateService = (id) => {
    navigate(`/manager/service/update/${id}`);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await ServiceService.delete(id).then(() => {
        handleCloseDialog();
        fetchList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList().then(setPaginationData);
  }, [currentPage, fetchList, setPaginationData]);

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <ListNavBar
            navigate={navigate}
            acceptedRoles={[UserRoleToEnum.MANAGER]}
          />
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>
                  Manage services and their details
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
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
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
                      {services?.map((service, key) => (
                        <TableRow key={key}>
                          <TableCell className="hidden sm:table-cell">
                            {service.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {service.name}
                          </TableCell>
                          <TableCell className="font-medium">
                            {service.description || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {service.category?.name || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {service.created_at}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {service.updated_at}
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
                                    handleOpenUpdateService(service.id)
                                  }
                                >
                                  Update
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleOpenDialog(service.id)}
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
                  pagination={paginationData}
                  onChangePage={onChangePage}
                />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <ConfirmDialog
          isOpen={activeDialogId !== null}
          content="Do you want to delete this service?"
          onCancel={handleCloseDialog}
          onConfirm={() => {
            handleConfirmDelete(activeDialogId);
          }}
        />
      </main>
    </>
  );
};

export default ServiceList;
