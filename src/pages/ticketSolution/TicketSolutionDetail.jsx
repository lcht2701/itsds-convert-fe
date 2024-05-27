import { useNavigate, useParams } from "react-router-dom";
import { Lightbulb, ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TicketSolutionService from "@/servers/TicketSolutionService";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { UserRoleToEnum, UserRoleToString } from "@/utils/EnumObject";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactionService from "@/servers/ReactionService";
import CommentService from "@/servers/CommentService";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CommentList from "./ui/CommentList";
import { useAuth } from "@/contexts/AuthProvider";
import { RouteByRole } from "@/utils/RouteByRole";
import useTicketSolution from "@/hooks/ticketSolution/useTicketSolution";
import useDialog from "@/hooks/useDialog";
import useReaction from "@/hooks/reaction/useReaction";
import useComment from "@/hooks/comment/useComment";

const TicketSolutionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { reaction, likeReaction, dislikeReaction } = useReaction(id);
  const { ticketSolution, loading, approve, reject } = useTicketSolution(id);
  const { comments, addComment, deleteComment, isOpenComment, setOpenComment } =
    useComment(id);
  const { dialog, closeDialog, openDialog } = useDialog();
  const route = RouteByRole(user.role);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    content: yup.string().max(2000, "Maximum 2000 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOpenUpdatePage = () => {
    navigate(`${route}/ticket-solution/update/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await TicketSolutionService.delete(id).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          {user.role === UserRoleToEnum.MANAGER && (
            <>
              {ticketSolution.review_date === null ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => approve()}
                >
                  Approve
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => reject()}
                >
                  Reject
                </Button>
              )}
            </>
          )}
          {(user.role === UserRoleToEnum.MANAGER ||
            user.id === ticketSolution.createdBy?.id) && (
            <>
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
                onClick={() => openDialog(ticketSolution.id)}
              >
                Delete
              </Button>
            </>
          )}
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
                  {ticketSolution.title || "-"}
                </p>
                <p className="text-lg text-muted-foreground">
                  Service: {ticketSolution.service?.name}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <CardTitle className="ml-2">Content</CardTitle>
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
              <Label className="flex items-center ml-2">
                Does this solution helpful
              </Label>
              <div className="flex gap-4 ">
                <div className="flex gap-2">
                  <ThumbsUp
                    className="h-6 w-6"
                    color={reaction.my_reaction === 1 ? "#3f86d2" : "#000"}
                    onClick={() => likeReaction()}
                  />
                  <p className="text-sm text-gray-600 font-semibold">
                    {reaction.count_like}
                  </p>
                </div>
                <div className="flex gap-2">
                  <ThumbsDown
                    className="h-6 w-6"
                    color={reaction.my_reaction === 0 ? "#ff0000" : "#000"}
                    onClick={() => dislikeReaction()}
                  />
                  <p className="text-sm text-gray-600 font-semibold">
                    {reaction.count_dislike}
                  </p>
                </div>
              </div>
            </div>
            {/* Comment */}
            <CommentList
              user={user}
              comments={comments}
              isOpenComment={isOpenComment}
              setOpenComment={setOpenComment}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmitComment={addComment}
              handleDeleteComment={deleteComment}
            />
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
              <div className="truncate">{ticketSolution.keyword || "-"}</div>
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
              <div>{UserRoleToString[ticketSolution.owner?.role] || "-"}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ConfirmDialog
        isOpen={dialog}
        content="Do you want to delete this solution?"
        onCancel={closeDialog}
        onConfirm={() => {
          handleConfirmDelete(ticketSolution.id);
        }}
      />
    </div>
  );
};

export default TicketSolutionDetail;
