import React, { useEffect, useContext, useState } from "react";

export default function FollowersInfo(followersId) {
  const [userPic, setUserPic] = useState("");
  const [userName, setUserName] = useState("");

  const followerId = followersId.followersId;

  const findUser = async () => {
    const response = await fetch(`/api/users/${followerId}`, {
      // headers: {
      //   method: "POST",
      //   //     Authorization: `Bearer ${user.token}`,
      // },
    });

    const json = await response.json();
    console.log(json);
    setUserPic(json.profilePicture);
    setUserName(json.name);
  };
  findUser();

  return (
    <div>
      <div className="flex flex-col">
        <img
          className="w-10 mx-auto  flex flex-col items-center justify-center md:mx-0 lg:mb-0 rounded-full"
          src={`http://localhost:3000/api/group/image/${userPic}`}
          alt="user pic"
        />
      </div>
    </div>
  );
}
