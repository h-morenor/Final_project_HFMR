import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auth } from "../../context/Auth";
import PostsComponent from "../Group_profile/PostsComponent";

export default function Messages_list() {
  const { user } = useContext(Auth);
  console.log(user);
  const [msgs, setMsgs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState("");

  const { id } = useParams();
  //console.log(currentPost);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getUserMessages = async () => {
  //     const resp = await fetch(`/api/users/${user.userId}`);
  //     const json = await resp.json();
  //     console.log(json.messages);
  //     setMsgs(json.messages);
  //   };
  //   getUserMessages();
  // }, [user]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(`/api/users/${id}/msgs`);
      const json = await resp.json();
      console.log(json);
      setPosts(json);
    };
    getPosts();
  }, [user]);

  const handleChat = async (post) => {
    console.log(post);

    // const resp = await fetch(
    //   `/api/group/${post}/getpost`

    // );
    // const json = await resp.json();
    // console.log(json);
    // setCurrentPost(json);

    setCurrentPost(post);
  };

  return (
    <div className="shadow-lg rounded-lg">
      {/* Chatting */}
      <div className="flex flex-row justify-between bg-white w-screen h-[calc(100vh-136px)]">
        {/* chat list */}
        <div className="flex flex-col w-2/5 border-r-2  ">
          {/* search compt */}
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>
          {/* end search compt */}

          {/* Group list */}
          <div className=" overflow-y-auto ">
            {posts.map((post) => {
              return (
                <div
                  className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-100 rounded-xl p-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  onClick={(e) => handleChat(post)}
                >
                  <div className="w-full ">
                    <div className="text-lg font-semibold">
                      {post.postedToGroupName}
                    </div>
                    <span className="text-gray-500">{post.postTitle}</span>
                    {post.createdAt ? (
                      <div className="flex gap-2">
                        <p className="text-gray-500 text-sm">
                          {post.createdAt.split("T")[0]}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {post.createdAt.split("T")[1].split(".")[0]}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* end user list */}
        </div>
        {/* end chat list */}
        {/* message */}
        <div className="w-full p-0 flex flex-col justify-between">
          <div className="overflow-y-scroll ">
            <div className="flex flex-col  ">
              {currentPost !== "" && <PostsComponent post={currentPost} />}
            </div>
          </div>
          {/* <div className="flex py-5">
            <input
              className="w-full bg-gray-200 py-1 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
            <button>send</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
