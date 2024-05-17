import { UserRoleToEnum } from "./EnumObject";

export function RouteByRole(role) {
  switch (role) {
    case UserRoleToEnum.CUSTOMER: {
      return "/customer";
    }
    case UserRoleToEnum.COMPANYADMIN: {
      return "/company-admin";
    }
    case UserRoleToEnum.TECHNICIAN: {
      return "/technician";
    }
    case UserRoleToEnum.MANAGER: {
      return "/manager";
    }
    case UserRoleToEnum.ADMIN: {
      return "/admin";
    }
    default:
      return "/login";
  }
}
