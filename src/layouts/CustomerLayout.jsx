import React, { useEffect } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import AuthService from "@/servers/AuthService";
import { Toaster } from "@/components/ui/toaster";

const CustomerLayout = () => {
  const { token, setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-foreground transition-colors hover:text-foreground"
      : "text-muted-foreground transition-colors hover:text-foreground";

  const onLogout = async (e) => {
    try {
      await AuthService.logout();
      setUser(null);
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
            <NavLink
              to="/customer/home"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </NavLink>
            <NavLink to="/customer/home" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/customer/ticket" className={getNavLinkClass}>
              My Tickets
            </NavLink>
            <NavLink to="/customer/ticket-solution" className={getNavLinkClass}>
              Ticket Solution
            </NavLink>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <NavLink
                  to="/customer/home"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </NavLink>
                <NavLink to="/customer/home" className={getNavLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/customer/ticket" className={getNavLinkClass}>
                  My Tickets
                </NavLink>
                <NavLink
                  to="/customer/home/ticket-solution"
                  className={getNavLinkClass}
                >
                  Ticket Solution
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("setting/profile")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </>
  );
};

export default CustomerLayout;
