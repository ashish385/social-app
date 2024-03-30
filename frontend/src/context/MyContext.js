import React, { createContext, useState } from "react";
import { postComments, requests,suggest } from '../assets/data'
import {NoProfile} from '../assets/index'

const PostContext = createContext();

const PostProvider = ({ children }) => {
 const [showAll, setShowAll] = useState(0);
 const [showReply, setShowReply] = useState(0);
 const [comments, setComments] = useState([]);
 const [loading, setLoading] = useState(false);
 const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [posts, setPosts] = useState(null)



 const getComments = async () => {
   setReplyComments(0);

   setComments(postComments);
   setLoading(false);
 };
    const handleLike = async () => { };
    


  const value = {
    showAll,
    setShowAll,
    showReply,
    setShowReply,
    comments,
    setComments,
    loading,
    setLoading,
    replyComments,
    setReplyComments,
    showComments,
    setShowComments,
    getComments,
    handleLike,
    friendRequest,
    setFriendRequest,
    NoProfile,
    suggestedFriends,
    setSuggestedFriends,
    posts,
    setPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostContext, PostProvider};
