import React from "react";
import { TicketImpactToString, TicketTypeToString } from "@/utils/EnumObject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function TicketDetailTab({ ticket }) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="grid gap-6">
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex h-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Textarea
              id="content"
              name="content"
              className="min-h-48"
              value={ticket.description}
              disabled
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
          <CardDescription>Detailed information of the ticket</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Requester:</p>
              <p className="col-span-4">{ticket.requester?.name}</p>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Impact:</p>
              <p className="col-span-4">
                {TicketImpactToString[ticket.impact] || "N/A"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Type:</p>
              <p className="col-span-4">
                {TicketTypeToString[ticket.type] || "N/A"}
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Ticket Type:</p>
              <p className="col-span-4">
                {TicketTypeToString[ticket.type] || "N/A"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Service:</p>
              <p className="col-span-4">{ticket.service?.name || "N/A"}</p>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Category:</p>
              <p className="col-span-4">
                {ticket.service?.category?.name || "N/A"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Created Date:</p>
              <p className="col-span-4">{ticket.created_at || "N/A"}</p>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <p className="font-bold col-span-2 ">Updated Date:</p>
              <p className="col-span-4">{ticket.updated_at || "N/A"}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <p className="font-bold col-span-2 ">Impact Detail:</p>
            <p className="col-span-10">{ticket.impact_detail || "N/A"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TicketDetailTab;
