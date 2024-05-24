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
import { ContractStatusBadge, UserRoleToEnum } from "@/utils/EnumObject";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useContractList from "@/hooks/contract/useContractList";
import usePaginate from "@/hooks/usePaginate";

const ContractList = () => {
  const navigate = useNavigate();
  const { currentPage, paginationData, setPaginationData, onChangePage } =
    usePaginate();
  const { contracts, loading, fetchContractList } =
    useContractList(currentPage);

  const handleOpenDetailPage = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    fetchContractList().then(setPaginationData);
  }, [currentPage, fetchContractList, setPaginationData]);

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
                <CardTitle>Contracts</CardTitle>
                <CardDescription>
                  Manage contracts and their details
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
                        <TableHead>Contract Num</TableHead>
                        <TableHead>Contract Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Description
                        </TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="hidden md:table-cell">
                          End Date
                        </TableHead>
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
                      {contracts?.map((contract, key) => (
                        <TableRow
                          key={key}
                          onClick={() => handleOpenDetailPage(contract.id)}
                        >
                          <TableCell className="hidden sm:table-cell">
                            {contract.id || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {contract.contract_num || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {contract.name || "-"}
                          </TableCell>
                          <TableCell className="font-medium hidden md:table-cell">
                            {contract.description || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {contract.company?.company_name || "-"}
                          </TableCell>
                          <TableCell className="font-medium hidden md:table-cell">
                            {contract.end_date || "-"}
                          </TableCell>
                          <TableCell className="font-medium ">
                            <ContractStatusBadge status={contract.status} />
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {contract.created_at}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {contract.updated_at}
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

export default ContractList;
