import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContractDetailCard(props) {
  return (
    <Card className="grid gap-2">
      <CardHeader>
        <CardTitle>Contract Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-16">
        <div className="grid gap-8">
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Name
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full"
              value={props.contract.name}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Description
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full "
              value={props.contract.description}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Contract Value
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full "
              value={props.contract.value}
              disabled
            />
          </div>
        </div>
        <div className="grid gap-8">
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Duration
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full "
              value={`${props.contract.duration} months`}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              Start Date
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full "
              value={props.contract.start_date}
              disabled
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-10">
            <Label className="col-span-2 text-right whitespace-nowrap">
              End Date
            </Label>
            <Input
              type="text"
              className="col-span-6 w-full "
              value={props.contract.end_date}
              disabled
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
