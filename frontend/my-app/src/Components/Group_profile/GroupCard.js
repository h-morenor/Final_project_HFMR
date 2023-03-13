import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auth } from "../../context/Auth";
import { NavLink } from "react-router-dom";
import pen from "../../assets/pen.png";
import trash from "../../assets/trash.svg";
import envelope from "../../assets/envelope.svg";

import DeleteGroupModal from "./DeleteGroupModal";
import JoinMessageModal from "./JoinMessageModal";
import PostsComponent from "./PostsComponent";

import FollowersInfo from "../../Components/myGroups/FollowersInfo";

export default function GroupCard() {
  const { user } = useContext(Auth);
  const [error, setError] = useState("");
  const [group, setGroup] = useState([]);
  const [groupFollowers, setGroupFollowers] = useState([]);
  const { id } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [followersArray, setFollowersArray] = [];
  const [existinGroup, setExistinGroup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalJoin, setShowModalJoin] = useState(false);
  const [posts, setPosts] = useState([""]);
  const maxImages = 3;
  const [maxFollowersImage, setMaxFollowersImage] = useState("");
  const [FollowersLenght, setFollowersLenght] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    if (!user) {
      console.log("user not found!");
      setError("User not found!");
      return;
    }

    const goGroup = async () => {
      console.log(id);
      //console.log(`/api/group/${id}`);
      const response = await fetch(`/api/group/${id}`, {
        //method: "GET",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      setGroup(json);
      setGroupFollowers(json.followers);
      setMaxFollowersImage(json.followers.slice(0, 2));
      setFollowersLenght(json.followers.length);
      //const groupTitle = json.title;
      // Get labels of ownership
      console.log(json.followers);
      const groupFollowers = json.followers;
      const existing = groupFollowers.forEach((follower) => {
        console.log("ownership");

        console.log(follower);
        console.log(user.userId);

        if (follower === user.userId) {
          setExistinGroup(true);
        }
      });
    };

    const goGroupPost = async () => {
      console.log(id);
      const resp = await fetch(
        `/api/group/${id}/getpost`
        /*, {
        //method: "GET",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }*/
      );
      const json = await resp.json();
      console.log(json);
      setPosts(json);
    };

    goGroup();
    goGroupPost();
  }, [user]);

  const handleJoinGroup = async () => {
    await fetch(`/api/group/${id}/join`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setShowModalJoin(true);
        setExistinGroup(true);
        console.log(data);
      });
  };

  //

  const handleExitGroup = async () => {
    const response = await fetch(`/api/group/${id}/exit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    navigate(`/mygroups`, { replace: true });
  };

  return (
    <div>
      <div className=" w-3/4 m-auto ">
        <div className="flex  items-center  bg-white border rounded-lg shadow-md md:flex-row   dark:border-gray-700 dark:bg-gray-800 h-72 ">
          <img
            className="object-cover w-40 rounded-t-lg h-auto  md:rounded-none md:rounded-l-lg"
            src={`http://localhost:3000/api/group/image/${group.picture}`}
            alt=""
          />

          <div className="flex flex-col p-2 w-2/3 h-full ">
            <div>
              <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {group.title}
              </h5>
              {user.userId === group.createdBy && (
                <div>
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">
                    Group owner
                  </span>{" "}
                </div>
              )}
              {user.userId !== group.createdBy && existinGroup === true && (
                <div>
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-500 text-white rounded-full">
                    Group follower
                  </span>{" "}
                </div>
              )}
            </div>

            <div>
              <h2 className="font-bold ">Address</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {group.address}
              </p>
            </div>

            <div>
              <h2 className="font-bold ">Description</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {group.description}
              </p>
            </div>

            <div>
              <h2 className="font-bold ">Members</h2>
              <div className="card-actions justify-start">
                {groupFollowers.map((followersId) => {
                  return <FollowersInfo followersId={followersId} />;
                })}
                {FollowersLenght > maxImages && (
                  <img
                    className="object-cover w-full rounded-t-lg md:h-5 md:w-5 h-full md:rounded-none md:rounded-l-lg"
                    src={`http://localhost:3000/api/group/image/plus-circle.svg`}
                    alt="addpic"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              {user.userId === group.createdBy && (
                <img
                  className="w-7"
                  src={envelope}
                  alt="message"
                  onClick={() => {
                    navigate(`/group/${group._id}/newpost`);
                  }}
                ></img>
              )}
              {user.userId === group.createdBy && (
                <img
                  className="w-7"
                  src={pen}
                  alt="pen"
                  onClick={() => {
                    navigate(`/group/edit/${group._id}`);
                  }}
                ></img>
              )}
              {user.userId === group.createdBy && (
                <div>
                  <img
                    className="w-7"
                    src={trash}
                    alt="trash"
                    onClick={() => setShowModal(true)}
                  ></img>
                  {
                    <DeleteGroupModal
                      showModal={showModal}
                      onClose={() => setShowModal(false)}
                      id={id}
                    />
                  }
                </div>
              )}
            </div>
          </div>
          <div /*className="flex flex-col p-2 w-1/3 h-full "*/>
            {existinGroup !== true && (
              <div>
                <button
                  className="p-2 border border-red-400 rounded-md w-20"
                  onClick={() => {
                    handleJoinGroup();
                  }}
                >
                  Join
                </button>
              </div>
            )}
            <JoinMessageModal
              showModalJoin={showModalJoin}
              id={id}
              groupTitle={group.title}
              onClose={() => setShowModalJoin(false)}
            />
            {user.userId !== group.createdBy && existinGroup === true && (
              <div>
                <button
                  className="p-2 border border-red-400 rounded-md w-20"
                  onClick={() => handleExitGroup()}
                >
                  {" "}
                  Exit{" "}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="flex flex-col items-center bg-white border rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 h-60  overflow-y-scroll">
          {posts === [] && (
            <div>
              <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-500 text-white rounded-full">
                Group follower
              </span>
            </div>
          )}
          {posts !== [] && (
            <div className="w-3/4">
              {posts.map((post) => {
                const postId = post._id;
                return <PostsComponent post={post} key={postId} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//<button className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded-full hover:shadow-lg"><NavLink replace to="/:id/new">Modify group</NavLink></button>
