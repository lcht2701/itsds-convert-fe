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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useCompanyList from "@/hooks/company/useCompanyList";
import usePaginate from "@/hooks/usePaginate";

const CompanyList = () => {
  const navigate = useNavigate();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { companies, loading, fetchCompanyList } = useCompanyList(currentPage);

  const handleOpenDetailPage = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    fetchCompanyList().then(setPaginationData);
  }, [currentPage, fetchCompanyList, setPaginationData]);

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

export default CompanyList;
