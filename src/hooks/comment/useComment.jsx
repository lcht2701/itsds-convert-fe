import { useState, useEffect, useCallback } from "react";
import CommentService from "@/servers/CommentService";

const useComment = (id) => {
  const [comments, setComments] = useState([]);
  const [isOpenComment, setOpenComment] = useState(false);

  const fetchCommentList = useCallback(async () => {
    try {
      const response = await CommentService.get(id);
      setComments(response.result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchCommentList();
  }, [id]);

  const addComment = async (data) => {
    console.log(data);
    try {
      await CommentService.add(id, data).then(() => {
        fetchCommentList();
      });
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await CommentService.delete(id, commentId).then(() => {
        fetchCommentList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { comments, addComment, deleteComment, isOpenComment, setOpenComment };
};

export default useComment;
