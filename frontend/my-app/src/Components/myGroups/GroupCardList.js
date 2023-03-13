import React, { useEffect, useContext, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import GroupCard from "../Group_profile/GroupCard";
import { Auth } from "../../context/Auth";
import FollowersInfo from "./FollowersInfo";

export default function GroupCardList({ group, groupId, loading }) {
  const navigate = useNavigate();
  const { user } = useContext(Auth);
  const followers = group.followers;
  const [existinGroup, setExistinGroup] = useState(false);
  const [userPic, setUserPic] = useState("");
  const [userName, setUserName] = useState("");
  const maxImages = 2;
  const maxFollowersImage = group.followers.slice(0, maxImages);
  const FollowersLenght = group.followers.length;

  console.log(followers);

  useEffect(() => {
    const existing = followers.forEach((follower) => {
      if (follower === user.userId) {
        setExistinGroup(true);
      }
    });
  }, []);

  useEffect(() => {
    const findUser = async () => {
      const response = await fetch(`/api/users/${followers.id}`);

      console.log("test1");

      const json = await response.json();
      console.log(json);
      setUserPic(json.profilePicture);
      setUserName(json.name);
      findUser();
    };
  }, [group]);

  return (
    <div
      onClick={() => {
        navigate(`/group/${group._id}`);
      }}
      className="card w-96 bg-base-100 shadow-xl m-auto p-2"
    >
      <div className="flex justify-center gap-2  items-center h-1/4">
        <img
          className="object-cover w-full rounded-t-lg md:h-12 md:w-48 h-full md:rounded-none md:rounded-l-lg"
          src={`http://localhost:3000/api/group/image/${group.picture}`}
          alt="group pic"
        />
        <div>
          <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {group.title}
          </h5>
          <div className="">
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
        </div>
      </div>
      <div className="card-body h-2/3 m-0 p-0">
        <div className="flex ">
          <h2 className="font-bold">Members: </h2>
          <p>{group.followersCount}</p>
        </div>
        <div className="flex">
          <h2 className="font-bold">Description: </h2>
          <p>{group.description}</p>
        </div>
        <div>
          <div className="card-actions justify-end rounded-full">
            {maxFollowersImage.map((followersId) => {
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

          <div>
            <div className="badge badge-outline gap-1 ">
              {group.hashtag.map((tag) => {
                return <p>{tag}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*  
 const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  ///

  return (
    <div className="flex flex-col h-full">
      {
        <div className="flex flex-col justify-center h-full m-auto gap-2 p-1">
          {currentPosts.map((group) => {
            const groupId = group._id;
            return (
              <GroupCardList group={group} key={groupId} loading={loading} />
            );
          })}
        </div>
      }
*/
