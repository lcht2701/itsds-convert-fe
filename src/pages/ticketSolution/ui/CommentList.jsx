import {
  ChevronsUpDown,
  CornerDownLeft,
  Paperclip,
  Pencil,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ErrorMessage from "@/components/custom/ErrorMessage";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const CommentList = (props) => {
  return (
    <Collapsible
      open={props.isOpenComment}
      onOpenChange={props.setOpenComment}
      className="grid gap-3"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <CardTitle className="ml-2">Comment</CardTitle>
          <Badge>{props.comments.length}</Badge>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0 mr-4">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {/* Collapsible Comment */}
      {props.comments.map((comment, key) => (
        <CollapsibleContent className="space-y-2" key={key}>
          <div className="flex gap-4 m-2">
            <Avatar className="hidden h-12 w-12 sm:flex">
              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid">
              <div className="flex gap-4 items-center">
                <div className="text-lg font-semibold text-blue-500">
                  {comment.user.name}
                </div>
                {comment.user.id === props.user.id && (
                  <div className="flex gap-2">
                    <Pencil className="w-4 h-4" onClick={() => null} />
                    <Trash
                      className="w-4 h-4"
                      onClick={() => props.handleDeleteComment(comment.id)}
                    />{" "}
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500">{comment.created_at}</div>
              <div className="mt-3 text-sm">{comment.content}</div>
            </div>
          </div>
        </CollapsibleContent>
      ))}
      {/* Comment Form */}
      <div className="relative flex h-full flex-col rounded-xl bg-muted/50 p-4">
        <form
          onSubmit={props.handleSubmit(props.onSubmitComment)}
          className="relative overflow-hidden rounded-lg border bg-background"
          x-chunk="dashboard-03-chunk-1"
        >
          <Label htmlFor="content" className="sr-only">
            Message
          </Label>
          <Textarea
            id="content"
            placeholder="Type your comment here..."
            className="min-h-20 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus:ring-0"
            {...props.register("content")}
          />
          <ErrorMessage className="mx-2" errors={props.errors} name="content" />
          <div className="flex items-center p-3 pt-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </Collapsible>
  );
};

export default CommentList;
