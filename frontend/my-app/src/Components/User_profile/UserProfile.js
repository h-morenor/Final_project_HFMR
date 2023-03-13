import React, { useState, useEffect } from "react";

import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import { Auth } from "../../context/Auth";
import pen from "../../assets/pen.png";

export default function UserProfile() {
  //const { user } = useContext(Auth);
  const { id } = useParams();
  //console.log(user);

  const [user, setUser] = useState();
  const [picture, setPicture] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // setError(null);
    // if (!user) {
    //   console.log("user not found!");
    //   setError("User not found!");
    //   return;
    // }

    const findUser = async () => {
      const response = await fetch(`/api/users/${id}`, {
        // headers: {
        //   method: "POST",
        //   //     Authorization: `Bearer ${user.token}`,
        // },
      });

      console.log("test1");

      const json = await response.json();
      console.log(json);
      setUser(json);
      setPicture(json.profilePicture);
      setName(json.name);
      setAge(json.age);
      setEmail(json.email);
      setDescription(json.description);
    };

    findUser();
  }, []);

  return (
    <div>
      <div className="flex align-center text-center w-80">
        <div>
          <div className="  shadow-lg bg-white w-screen h-full">
            <div
              className="overflow-hidden rounded-t-lg h-28"
              style={{ backgroundColor: "#9d789b" }}
            />
            <img
              className="w-7"
              src={pen}
              alt="pen"
              onClick={() => {
                navigate(`/user/edit/${id}`);
              }}
            ></img>

            <div>
              <img
                className="object-cover w-24 h-24 -mt-12  border border-2 border-white rounded-full mx-auto bg-white"
                src={`http://localhost:3000/api/group/image/${picture}`}
              />
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-semibold mb-4">{name}</h4>
              <hr />
              <h2 className="text-2m font-semibold mb-4">Age: {age}</h2>
              <h2 className="text-2m font-semibold mb-4">About me:</h2>
              <p className="mt-4">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="quote-left"
                  className="w-6 pr-2 inline-block"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                  />
                </svg>
                {description}
              </p>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//onClick={handleNewGroup}
/*
{myGroups.map((group) => {
                const groupId = group._id
                return <GroupCardList group={group} key={groupId} />;
              })}
              */
