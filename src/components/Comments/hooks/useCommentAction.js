import { useState } from "react";

export default function useCommentActions(comment, currentUser) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0);
  const [replying, setReplying] = useState(false);
  const [childComments, setChildComments] = useState([]);
  const [childrenOpen, setChildrenOpen] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setUpvotes(p => p - 1);
    } else {
      setLiked(true);
      setUpvotes(p => p + 1);
      if (disliked) {
        setDisliked(false);
        setUpvotes(p => p + 1);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setUpvotes(p => p + 1);
    } else {
      setDisliked(true);
      setUpvotes(p => p - 1);
      if (liked) {
        setLiked(false);
        setUpvotes(p => p - 1);
      }
    }
  };

  const handleReplySubmit = (text) => {
    const newChild = {
      id: Math.floor(Math.random() * 1000000),
      parent_id: comment.id,
      text,
      upvotes: 0,
      created_at: new Date().toISOString(),
      user_id: currentUser.id,
    };
    setChildComments(prev => [newChild, ...prev]);
    setChildrenOpen(true);
    setReplying(false);
  };

  return {
    liked,
    disliked,
    upvotes,
    replying,
    childComments,
    childrenOpen,
    setReplying,
    setChildrenOpen,
    setChildComments,
    handleLike,
    handleDislike,
    handleReplySubmit
  };
}
