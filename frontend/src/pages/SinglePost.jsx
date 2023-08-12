import React, { useState, useContext, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import axios from "axios";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import MainContext from "../context/MainContext";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { useSinglePostMutation } from "../slices/postSlice";

const SinglePost = () => {
  const { singlePostData, postsUpdated, setPostsUpdated, setSinglePostData } =
    useContext(MainContext);

  const backendUrl = "http://localhost:5000";
  const [commentOpen, setCommentOpen] = useState(false);
  const [isLiked, setIsLike] = useState(false);
  const [data, setData] = useState(singlePostData);
  const numberOfLikes = Object.keys(data.likes).length;
  console.log(singlePostData);
  const { userData } = useSelector((state) => state.auth);

  const [singlePost] = useSinglePostMutation();

  const postLikeHandle = async () => {
    try {
      await axios.patch(`/api/v2/posts/${data._id}/like`, {
        userId: userData._id,
      });

      setPostsUpdated(!postsUpdated);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  const orderedComments = data.comments
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const getSinglePost = async () => {
    try {
      const res = await singlePost(singlePostData._id);
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [postsUpdated]);
  return (
    <>
      <Card className="">
        <div className="d-flex flex-column p-3">
          <div className="d-flex flex-row">
            <div className="p-2">
              <img
                className="postImage"
                src={`${backendUrl}/assets/${data.userPicturePath}`}
              />
            </div>
            <p className="p-3">{data.name}</p>
          </div>
          <p>{data.description}</p>
          <div className="d-center">
            {data.picturePath && (
              <img
                className="singlepostimage "
                src={`${backendUrl}/assets/${data.picturePath}`}
              />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center p-5">
          <button className="likeButton" onClick={postLikeHandle}>
            {data.likes[userData._id] === true ? (
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
            <BiComment /> {data.comments.length}
          </button>
        </div>

        <div className="comment ">
          <Comments post={data} />
          {orderedComments.map((data) => (
            <div className="d-flex p-3">
              <h6>{data.username}:</h6>
              <strong>"{data.text}"</strong>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default SinglePost;
