import { useEffect, useState, useContext } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../slices/postSlice";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainContext from "../context/MainContext";

const CreatePost = () => {
  const { postsUpdated, setPostsUpdated } = useContext(MainContext);

  const [createPost] = useCreatePostMutation();
  const [post, setPost] = useState();
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(userData._id);
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", user);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    try {
      await createPost(formData).unwrap();
      setPostsUpdated(!postsUpdated);
      setPost("");
      setImage("");

      toast.success("Post Uploaded!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="">
      <Card className="p-4 createPost">
        <h1>Create a post </h1>
        <Card className="p-3 ">
          <div className="">
            <textarea
              placeholder="what's on your mind"
              className="postInput"
              onChange={(e) => setPost(e.target.value)}
              value={post}
            />
          </div>

          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
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

export default CreatePost;
