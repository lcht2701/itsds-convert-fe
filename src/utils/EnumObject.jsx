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

export const TicketStatusToString = {
  0: "Assigned",
  1: "In Progress",
  2: "Resolved",
  3: "Closed",
  4: "Cancelled",
};

export const TicketStatusToEnum = {
  ASSIGNED: 0,
  INPROGRESS: 1,
  RESOLVED: 2,
  CLOSED: 3,
  CANCELLED: 4,
};

export const TicketImpactToString = {
  0: "Low",
  1: "Medium",
  2: "High",
};

export const TicketImpactToEnum = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

export const PriorityToString = {
  0: "Low",
  1: "Medium",
  2: "High",
};

export const PriorityToEnum = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

export const TicketTypeToString = {
  0: "Offline",
  1: "Online",
  2: "Hybrid",
};

export const TicketTypeToEnum = {
  OFFLINE: 0,
  ONLINE: 1,
  HYBRID: 2,
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

export const TicketTaskStatusToString = {
  0: "Open",
  1: "In Progress",
  2: "On Hold",
  3: "Closed",
  4: "Cancelled",
};

export const TicketTaskStatusToEnum = {
  OPEN: 0,
  INPROGRESS: 1,
  ONHOLD: 2,
  CLOSED: 3,
  CANCELLED: 4,
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
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const TicketStatusBadge = ({ status }) => {
  switch (status) {
    case TicketStatusToEnum.ASSIGNED:
      return <Badge variant="yellow">Assigned</Badge>;
    case TicketStatusToEnum.INPROGRESS:
      return <Badge variant="green">In Progress</Badge>;
    case TicketStatusToEnum.RESOLVED:
      return <Badge variant="primary">Resolved</Badge>;
    case TicketStatusToEnum.CLOSED:
      return <Badge variant="secondary">Closed</Badge>;
    case TicketStatusToEnum.CANCELLED:
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const PriorityBadge = ({ status }) => {
  switch (status) {
    case PriorityToEnum.LOW:
      return <Badge variant="green">Low</Badge>;
    case PriorityToEnum.MEDIUM:
      return <Badge variant="yellow">Medium</Badge>;
    case PriorityToEnum.HIGH:
      return <Badge variant="destructive">High</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const TicketImpactBadge = ({ status }) => {
  switch (status) {
    case TicketImpactToEnum.LOW:
      return <Badge variant="green">Low</Badge>;
    case TicketImpactToEnum.MEDIUM:
      return <Badge variant="yellow">Medium</Badge>;
    case TicketImpactToEnum.HIGH:
      return <Badge variant="destructive">High</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const TicketTypeBadge = ({ status }) => {
  switch (status) {
    case TicketTypeToEnum.OFFLINE:
      return <Badge variant="yello">Offline</Badge>;
    case TicketTypeToEnum.ONLINE:
      return <Badge variant="green">Online</Badge>;
    case TicketTypeToEnum.HYBRID:
      return <Badge variant="primary">Hybrid</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const TicketTaskStatusBadge = ({ status }) => {
  switch (status) {
    case TicketTaskStatusToEnum.OPEN:
      return <Badge variant="yellow">Open</Badge>;
    case TicketTaskStatusToEnum.INPROGRESS:
      return <Badge variant="green">In Progress</Badge>;
    case TicketTaskStatusToEnum.ONHOLD:
      return <Badge variant="primary">Resolved</Badge>;
    case TicketTaskStatusToEnum.CLOSED:
      return <Badge variant="secondary">Closed</Badge>;
    case TicketTaskStatusToEnum.CANCELLED:
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};
