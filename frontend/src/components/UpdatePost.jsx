import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useUpdatePostMutation } from "../slices/postSlice";
import MainContext from "../context/MainContext";
import { toast } from "react-toastify";

const UpdatePost = ({ Post, setEditClicked }) => {
  const [post, setPost] = useState(Post.description);
  const [image, setImage] = useState(Post.picturePath);
  const [newImage, setNewImage] = useState(false);
  const [updatePost] = useUpdatePostMutation();
  const { postsUpdated, setPostsUpdated } = useContext(MainContext);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("postId", Post._id);
    formData.append("description", post);
    if (image === Post.picturePath) {
      formData.append("picturePath", image);
    }
    if (newImage) {
      formData.append("picturePath", image.name);
    }
    if (!image) {
      formData.append("picturePath", "");
    }
    try {
      await updatePost(formData).unwrap();
      setPostsUpdated(!postsUpdated);
      setEditClicked(false);
      toast.success("Post Updated!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="updatePost">
      <Card className="p-4 d-center">
        <h1>Update post </h1>
        <Card className="p-4 ">
          <div className="">
            <textarea
              className=""
              onChange={(e) => setPost(e.target.value)}
              value={post}
            />
          </div>

          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
              setNewImage(true);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!image ? <p>Add Image Here</p> : <p>{image.name}</p>}
                </div>
                {image && (
                  <div onClick={() => setImage(null)}>Remove Image</div>
                )}
              </div>
            )}
          </Dropzone>
          <button
            className="postButton"
            disabled={!post}
            onClick={handleSubmit}
          >
            Post
          </button>
        </Card>
      </Card>
    </div>
  );
};

export default UpdatePost;
