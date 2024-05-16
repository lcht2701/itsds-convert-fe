import { useNavigate, useParams } from "react-router-dom";
import {
  CornerDownLeft,
  Lightbulb,
  Paperclip,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TicketSolutionService from "@/servers/TicketSolutionService";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { UserRoleEnum } from "@/utils/EnumObject";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactionService from "@/servers/ReactionService";

const TicketSolutionDetail = () => {
  const { id } = useParams();
  const [reaction, setReaction] = useState([]);
  const [ticketSolution, setTicketSolution] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchReactionDetail = async (id) => {
    try {
      var response = await ReactionService.get(id);
      var result = response.result;
      setReaction(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const fetchData = async (id) => {
    setLoading(true);
    try {
      var response = await TicketSolutionService.getDetail(id);
      var result = response.result;
      setTicketSolution(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdatePage = (id) => {
    navigate(`/manager/ticket-solution/update/${id}`);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await TicketSolutionService.delete(id).then(() => {
        setOpen(false);
        setLoading(true);
        navigate(-1);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleLike = async (id) => {
    try {
      await ReactionService.like(id).then(() => {
        fetchReactionDetail(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (id) => {
    try {
      await ReactionService.dislike(id).then(() => {
        fetchReactionDetail(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReactionDetail(id);
    fetchData(id);
  }, []);

  if (loading) return <Spinner size="medium" />;

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Ticket Solution Detail
        </h1>
        <div className="ml-auto items-center gap-2 flex">
          <Button type="button" variant="outline" size="sm">
            Approve
          </Button>
          <Button type="button" variant="outline" size="sm">
            Reject
          </Button>
          <Button
            type="button"
            size="sm"
            className="bg-blue-500 text-white"
            onClick={() => handleOpenUpdatePage(ticketSolution.id)}
          >
            Update
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => handleOpenDialog()}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-6 xl:grid-cols-12">
        <Card
          className="lg:col-span-4 xl:col-span-9"
          x-chunk="dashboard-01-chunk-4"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-16 w-16 sm:flex">
                <AvatarFallback className="text-yellow-400">
                  <Lightbulb className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-3xl font-medium leading-none">
                  {ticketSolution.title}
                </p>
                <p className="text-lg text-muted-foreground">
                  Service: {ticketSolution.service?.name}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <CardTitle>Content</CardTitle>
              <div className="relative flex h-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <Textarea
                  id="content"
                  name="content"
                  className="min-h-64"
                  value={ticketSolution.content}
                  disabled
                />
              </div>
            </div>
            <div className="flex gap-8 h-auto">
              <Label className="flex items-center">
                Does this solution helpful
              </Label>
              <div className="flex gap-4 ">
                <div className="flex gap-2">
                  <ThumbsUp
                    className="h-6 w-6"
                    color={reaction.my_reaction === 1 ? "#3f86d2" : "#000"}
                    onClick={() => handleLike(id)}
                  />
                  <p className="text-sm text-gray-600 font-semibold">
                    {reaction.count_like}
                  </p>
                </div>
                <div className="flex gap-2">
                  <ThumbsDown
                    className="h-6 w-6"
                    color={reaction.my_reaction === 0 ? "#ff0000" : "#000"}
                    onClick={() => handleDislike(id)}
                  />
                  <p className="text-sm text-gray-600 font-semibold">
                    {reaction.count_dislike}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex gap-3">
                <CardTitle>Comment</CardTitle>
                <Badge>[input numbers of comments later]</Badge>
              </div>
              <div className="relative flex h-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <form
                  className="relative overflow-hidden rounded-lg border bg-background"
                  x-chunk="dashboard-03-chunk-1"
                >
                  <Label htmlFor="message" className="sr-only">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus:ring-0"
                  />
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
            </div>
          </CardContent>
        </Card>
        <Card
          className="lg:col-span-2 xl:col-span-3"
          x-chunk="dashboard-01-chunk-5"
        >
          <CardHeader>
            <CardTitle>More</CardTitle>
            <CardDescription>
              Related information about this ticket solution
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <CardTitle className="text-lg">Solution Detail</CardTitle>
            <div className="grid grid-cols-2 text-sm">
              <div>Keyword</div>
              <div>{ticketSolution.keyword || "-"}</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Reviewed Date</div>
              <div>{ticketSolution.review_date || "-"}</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Created By</div>
              <div className="font-bold text-blue-500">
                {ticketSolution.createdBy?.name || "-"}
              </div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Created At</div>
              <div>{ticketSolution.created_at || "-"}</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Updated At</div>
              <div>{ticketSolution.updated_at || "-"}</div>
            </div>
            <Separator />
            <CardTitle className="text-lg">Solution Owner</CardTitle>
            <div className="grid grid-cols-2 text-sm">
              <div>Name</div>
              <div>{ticketSolution.owner?.name || "-"}</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Email</div>
              <div>{ticketSolution.owner?.email || "-"}</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Role</div>
              <div>{UserRoleEnum[ticketSolution.owner?.role] || "-"}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ConfirmDialog
        isOpen={isOpen}
        content="Do you want to delete this solution?"
        onCancel={handleCancel}
        onConfirm={() => {
          handleConfirmDelete(ticketSolution.id);
        }}
      />
    </div>
  );
};

export default TicketSolutionDetail;
