import { useState, useEffect } from "react";
import ReactionService from "@/servers/ReactionService";

const useReaction = (id) => {
  const [reaction, setReaction] = useState(null);

  const fetchReaction = async () => {
    try {
      var response = await ReactionService.get(id);
      var result = response.result;
      setReaction(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReaction();
    }
  }, [id]);

  const likeReaction = async () => {
    try {
      await ReactionService.like(id).then(() => {
        fetchReaction(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dislikeReaction = async () => {
    try {
      await ReactionService.dislike(id).then(() => {
        fetchReaction(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { reaction, likeReaction, dislikeReaction };
};

export default useReaction;
