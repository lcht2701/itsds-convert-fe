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
import CompanyService from "@/servers/CompanyService";
import { Spinner } from "@/components/ui/spinner";
import CustomPagination from "@/components/custom/CustomPagination";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import ListNavBar from "@/components/custom/ListNav";
import { UserRoleToEnum } from "@/utils/EnumObject";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDialogId, setActiveDialogId] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      var response = await CompanyService.getPaginatedList(currentPage);
      setCompanies(response.result.data);
      setPaginationData(response.result.pagination);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const handleOpenDetailPage = (id) => {
    navigate(`${id}`);
  };

  const onChangePage = (pageNumber) => {
    if (pageNumber !== null) setCurrentPage(pageNumber);
  };

  const handleOpenUpdateCompany = (id) => {
    navigate(`/manager/company/update/${id}`);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await CompanyService.delete(id).then(() => {
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
          <ListNavBar
            navigate={navigate}
            acceptedRoles={[UserRoleToEnum.MANAGER]}
          />
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Companies</CardTitle>
                <CardDescription>
                  Manage companies and their details
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
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
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
                      {companies?.map((company, key) => (
                        <TableRow
                          key={key}
                          onClick={() => handleOpenDetailPage(company.id)}
                        >
                          <TableCell className="hidden sm:table-cell">
                            <Avatar>
                              <AvatarImage
                                src={company.logo_url}
                                alt={company.company_name.charAt(0)}
                              />
                              <AvatarFallback>
                                {company.company_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {company.company_name || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {company.phone || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {company.email || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {company.is_active ? (
                              <Badge>Active</Badge>
                            ) : (
                              <Badge variant="destructive">Inactive</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {company.created_at}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {company.updated_at}
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
                                    handleOpenUpdateCompany(company.id)
                                  }
                                >
                                  Update
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleOpenDialog(company.id)}
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
          content="Do you want to delete this company?"
          onCancel={handleCancel}
          onConfirm={() => {
            handleConfirmDelete(activeDialogId);
          }}
        />
      </main>
    </>
  );
};

export default CompanyList;
