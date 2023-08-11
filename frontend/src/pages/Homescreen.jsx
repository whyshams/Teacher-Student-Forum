import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost";
import { useGetAllPostMutation } from "../slices/postSlice";
import Loading from "../components/Loading";
const Homescreen = () => {
  const [{ isLoading }] = useGetAllPostMutation();
  const { userData } = useSelector((state) => state.auth);
  console.log(userData);

  return (
    <div className="mt-5">
      <div className="">
        {userData ? (
          <div>
            <Posts />
          </div>
        ) : (
          <Card className="cardupdate p-4 m-4 rounded-full">
            <h4 className="d-flex flex-wrap">
              CRUD operation with JWT authentication using React Js for the Web
              and React Native for Android and IOS app , MongoDB as Database and
              Node js framework Express JS to create API
            </h4>
            <div className="d-flex justify-content-around homebutton">
              <div className="home-button">
                <Link to="/login">Login</Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Homescreen;
