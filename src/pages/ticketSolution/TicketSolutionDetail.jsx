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
import { handleNullInputField } from "@/utils/HandleNullInputField";
import CommentList from "./ui/CommentList";
import { useAuth } from "@/contexts/AuthProvider";

const TicketSolutionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [reaction, setReaction] = useState({});
  const [comments, setComments] = useState([]);
  const [ticketSolution, setTicketSolution] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [isOpenComment, setOpenComment] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const fetchCommentList = async () => {
    try {
      var response = await CommentService.get(id);
      setComments(response.result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const onSubmitComment = async (data) => {
    data = handleNullInputField(data);
    console.log(data);
    try {
      await CommentService.add(id, data).then(() => {
        fetchCommentList(id);
      });
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const fetchReaction = async () => {
    try {
      var response = await ReactionService.get(id);
      var result = response.result;
      setReaction(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await CommentService.delete(id, commentId).then(() => {
        fetchCommentList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
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

  const handleOpenUpdatePage = () => {
    navigate(`/manager/ticket-solution/update/${id}`);
  };

  const handleConfirmDelete = async () => {
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

  const handleLike = async () => {
    try {
      await ReactionService.like(id).then(() => {
        fetchReaction(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      await ReactionService.dislike(id).then(() => {
        fetchReaction(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    try {
      await TicketSolutionService.approve(id).then(() => {
        fetchData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await TicketSolutionService.reject(id).then(() => {
        fetchData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReaction();
    fetchCommentList();
    fetchData();
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
        {(user.role === UserRoleToEnum.MANAGER ||
          user.role === UserRoleToEnum.TECHNICIAN) && (
          <div className="ml-auto items-center gap-2 flex">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleApprove()}
            >
              Approve
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleReject()}
            >
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
        )}
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
                    onClick={() => handleLike()}
                  />
                  <p className="text-sm text-gray-600 font-semibold">
                    {reaction.count_like}
                  </p>
                </div>
                <div className="flex gap-2">
                  <ThumbsDown
                    className="h-6 w-6"
                    color={reaction.my_reaction === 0 ? "#ff0000" : "#000"}
                    onClick={() => handleDislike()}
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
              onSubmitComment={onSubmitComment}
              handleDeleteComment={handleDeleteComment}
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
              <div>{UserRoleToString[ticketSolution.owner?.role] || "-"}</div>
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
