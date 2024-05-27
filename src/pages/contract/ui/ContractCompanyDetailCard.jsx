import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContractCompanyDetailCard(props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-16">
        <div className="grid gap-8">
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Company Name
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full"
              value={props.contract.company?.company_name}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Phone
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full "
              value={props.contract.company?.phone}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Email
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full"
              value={props.contract.company?.email}
              disabled
            />
          </div>
        </div>
        <div className="grid gap-8">
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Tax Code
            </Label>
            <Input
              id="duration"
              type="text"
              className="col-span-6 w-full "
              value={props.contract.company?.tax_code}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Website
            </Label>
            <Input
              id="start_date"
              type="text"
              className="col-span-6 w-full "
              value={props.contract.company?.company_website}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Field of business
            </Label>
            <Input
              id="end_date"
              type="text"
              className="col-span-6 w-full "
              value={props.contract.company?.field_of_business}
              disabled
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
