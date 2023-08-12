import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import MainContext from "../context/MainContext";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { useSinglePostMutation } from "../slices/postSlice";
import SinglePost from "../pages/SinglePost";
import moment from "moment";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const numberOfLikes = Object.keys(post.likes).length;
  console.log(post);
  const navigate = useNavigate();
  const [singlePost] = useSinglePostMutation();
  const { userData } = useSelector((state) => state.auth);
  const { postsUpdated, setPostsUpdated, setSinglePostData } =
    useContext(MainContext);

  const postLikeHandle = async () => {
    try {
      await axios.patch(`/api/v2/posts/${post._id}/like`, {
        userId: userData._id,
      });

      setPostsUpdated(!postsUpdated);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const singlePostReq = () => {
    setSinglePostData(post);
    navigate("/singlepost");
  };

  const orderedComments = post.comments
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <Card className="">
        <div className="d-flex flex-column p-3">
          <div className="d-flex flex-row">
            <Link to={`/user/${post.userId}`}>
              <div className="p-2">
                <img
                  className="postImage"
                  src={`/assets/${post.userPicturePath}`}
                />
                <strong className="p-3">{post.name}</strong>
              </div>
            </Link>
          </div>
          <div onClick={singlePostReq}>
            <p>{post.description}</p>
            <div className="d-center">
              {post.picturePath && (
                <img
                  className="postsImage"
                  src={`/assets/${post.picturePath}`}
                />
              )}
            </div>
            <p className="mt-3 text-muted">
              Posted {moment(post.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center p-4">
          <button className="likeButton" onClick={postLikeHandle}>
            {post.likes[userData._id] === true ? (
              <div>
                <BsHandThumbsUpFill /> {numberOfLikes}
              </div>
            ) : (
              <div>
                <BsHandThumbsUp /> {numberOfLikes}
              </div>
            )}
          </button>
          <button
            className="likeButton"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <BiComment /> {post.comments.length}
          </button>
        </div>
        {commentOpen && (
          <div className="comment ">
            <Comments post={post} />
            {orderedComments.map((data) => (
              <div className="d-flex p-3">
                <h6>{data.username}:</h6>
                <strong>"{data.text}"</strong>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
};

export default Post;
