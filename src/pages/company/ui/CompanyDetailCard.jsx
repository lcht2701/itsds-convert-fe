import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";

export function CompanyDetailCard(props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-16 w-16 sm:flex">
            <AvatarImage src={props.company.logo_url} alt="logo" />
            <AvatarFallback className="text-2xl">
              {props.company.company_name
                ? props.company.company_name.charAt(0)
                : ""}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="flex gap-2">
              <p className="text-2xl font-medium leading-none">
                {props.company.company_name}
              </p>
              <span>
                {props.company.is_active ? (
                  <Badge>Active</Badge>
                ) : (
                  <Badge variant="destructive">Inactive</Badge>
                )}
              </span>
            </div>
            <p className="text-lg text-muted-foreground">
              Tax Code: <span className="italic">{props.company.tax_code}</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <p className="font-bold">Email:</p>
            <p>{props.company.email}</p>
          </div>
          <div className="grid gap-2">
            <p className="font-bold">Website:</p>
            <p>{props.company.company_website}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <p className="font-bold">Phone Number:</p>
            <p>{props.company.phone}</p>
          </div>
          <div className="grid gap-2">
            <p className="font-bold">Field of business:</p>
            <p>{props.company.field_of_business}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <p className="font-bold">Created Date:</p>
            <p>{props.company.created_at}</p>
          </div>
          <div className="grid gap-2">
            <p className="font-bold">Updated Date:</p>
            <p>{props.company.updated_at}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
