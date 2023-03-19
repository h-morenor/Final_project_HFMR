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

  //h-[calc((100vh-136px)/2.5)]
  return (
    <div
      onClick={() => {
        navigate(`/group/${group._id}`);
      }}
      className="card  bg-base-100 shadow-xl p-2  h-[calc((100vh-220px)/2)] w-[360px] sm:w-[500px] cursor-pointer"
    >
      <div className="flex  gap-1 items-center content-center h-1/3">
        <div className="object-cover w-1/4">
          {group.picture !== "" && (
            <img
              //w-10 rounded-full bg-white
              //object-cover w-full rounded-lg h-12 w-48 h-full
              className="object-cover w-[60px] rounded-full items-center content-center"
              src={`http://localhost:3000/api/group/image/${group.picture}`}
              alt="group pic"
            />
          )}
        </div>
        <div className="w-3/4">
          <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
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
      <div className=" m-0 p-0">
        <div className="flex   gap-1">
          <h2 className="font-bold w-1/4 ">Members: </h2>
          <p className=" w-3/4 "> {group.followersCount}</p>
        </div>
        <div className="flex  gap-1">
          <h2 className="font-bold w-1/4">Description: </h2>
          <p className="text-ellipsis overflow-hidden h-[70px] text-sm pt-0.5 w-3/4">
            {group.description}
          </p>
        </div>
        <div className="flex w-full">
          <div className="card-actions w-2/4 flex justify-start items-center  ">
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

          <div className="flex w-2/4 justify-end">
            <div className="badge badge-outline gap-1 justify-end">
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
