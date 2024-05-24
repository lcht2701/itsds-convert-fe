import { Badge } from "@/components/ui/badge";

export const UserRoleToString = {
  0: "Customer",
  1: "Company Admin",
  2: "Technician",
  3: "Manager",
  4: "Admin",
};

export const UserRoleToEnum = {
  CUSTOMER: 0,
  COMPANYADMIN: 1,
  TECHNICIAN: 2,
  MANAGER: 3,
  ADMIN: 4,
};

export const ReactionToString = {
  0: "Dislike",
  1: "Like",
};

export const ReactionToEnum = {
  DISLIKE: 0,
  LIKE: 1,
};

export const ContractStatusToString = {
  0: "Pending",
  1: "Active",
  2: "Locked",
  3: "Expired",
};

export const ContractStatusToEnum = {
  PENDING: 0,
  ACTIVE: 1,
  LOCKED: 2,
  EXPIRED: 3,
};

export const ActiveBadge = ({ isActive }) => {
  switch (isActive) {
    case 0:
      return <Badge variant="destructive">Inactive</Badge>;
    case 1:
      return <Badge variant="green">Active</Badge>;
    default:
      return null; // Handle unexpected cases
  }
};

export const ContractStatusBadge = ({ status }) => {
  switch (status) {
    case ContractStatusToEnum.PENDING:
      return <Badge variant="yellow">Pending</Badge>;
    case ContractStatusToEnum.ACTIVE:
      return <Badge variant="green">Active</Badge>;
    case ContractStatusToEnum.LOCKED:
      return <Badge variant="destructive">Locked</Badge>;
    case ContractStatusToEnum.EXPIRED:
      return <Badge variant="secondary">Expired</Badge>;
    default:
      return null; // Handle unexpected cases
  }
};
