import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostsForum from "./PostsForum";
import { Auth } from "../../context/Auth";

export default function PostsComponent(post, postId) {
  console.log(post.post);
  const postIdCode = post.post._id;

  //const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState("false");
  const [singlePost, setSinglePost] = useState(post.post);
  const [attend, setAttend] = useState();
  const [attending, setAttending] = useState("false");
  const [commentsCount, setCommentsCount] = useState(post.post.commentsCount);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  console.log(commentsCount);
  const { user } = useContext(Auth);
  //group.venueLocation[0].split(" ")[0],
  //let dateModif = post.post.createdAt.split("T")[0];
  //console.log(dateModif);
  useEffect(() => {
    try {
      const getComments = async () => {
        if (post.post._id) {
          fetch(`/api/group/${post.post._id}/getgroupcomments/`)
            .then((response) => response.json())
            .then((data) => {
              setComments(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };

      getComments();
    } catch {
      console.log("error");
    }
  }, [post]);

  /* Comments handle*/

  const handleNewComment = async () => {
    const newCommentInfo = {
      message: newComment,
    };
    try {
      const response = await fetch(`/api/group/${postIdCode}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newCommentInfo),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json);
        throw console.log("Error! please rectify");
      }
      if (response.ok) {
        setIsLoading(false);
        setError(null);

        const getComments = async () => {
          const response = await fetch(
            `/api/group/${postIdCode}/getgroupcomments/`
          );
          const json = await response.json();
          setComments(json);
        };

        getComments();
        getpost();
        setNewComment("");
      }
    } catch {
      console.log("error");
    }
  };

  //////

  useEffect(() => {
    try {
      const checkLike = () => {
        // let likedbyuser = false;
        const liked = post.post.likes.map((likedby) => {
          if (likedby === user.userId) {
            setLiked(true);
          }
        });
      };

      const checkAttend = () => {
        //let attendbyuser = false;
        const att = post.post.attending.map((attendby) => {
          if (attendby === user.userId) {
            setAttending(true);
          }
        });
      };

      checkLike();
      checkAttend();
    } catch {
      setError(error);
    }
  }, []);

  /////

  const getpost = async () => {
    try {
      console.log(postIdCode);
      const response = await fetch(`/api/group/${postIdCode}/get1post`);

      const json = await response.json();
      console.log(json);
      setSinglePost(json);
      setCommentsCount(json.commentsCount);
    } catch {
      console.log("error");
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/group/${postIdCode}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      setLikes(json);
      setLiked(true);
      getpost();
    } catch {
      console.log("error");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`/api/group/${postIdCode}/unlike`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      setLikes(json);
      setLiked(false);
      getpost();
    } catch {
      console.log("error");
    }
  };

  const handleAttend = async () => {
    try {
      const response = await fetch(`/api/group/${postIdCode}/attend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      console.log(json);
      setAttend(json);
      setAttending(true);
      getpost();
    } catch {
      console.log("error");
    }
  };

  const handleUnattend = async () => {
    try {
      const response = await fetch(`/api/group/${postIdCode}/unattend`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      console.log(json);
      setAttend(json);
      setAttending(false);
      getpost();
    } catch {
      console.log("error");
    }
  };

  return (
    <div>
      <div className="flex justify-center ">
        <div className="w-full ">
          <div className="m-0 block rounded-lg bg-white p-3 shadow-lg dark:bg-neutral-800 dark:shadow-black/20  ">
            <div className="md:flex md:flex-row border border-2">
              <div className=" w-20 mx-auto  flex flex-col items-center justify-center md:mx-0 lg:mb-0">
                <img
                  src={`http://localhost:3000/api/group/image/${post.post.postedByProfilePicture}`}
                  className="rounded-full shadow-md dark:shadow-black/30"
                  alt={`${post.post.postedByName}`}
                />

                <p className="mb-2 text-center text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {post.post.postedByName}
                </p>
              </div>
              <div className="md:ml-6 w-full">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-4/5 text-center flex justify-center">
                    <p className="font-bold mb-1 text-neutral-500 dark:text-neutral-300 text-center text-xl">
                      {post.post.post}
                    </p>
                  </div>
                  <div className="sm:w-1/5 text-xs w-full">
                    {post.post.createdAt ? (
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col text-center ">
                          <h6 className="font-bold">Posted on:</h6>
                          <p>{post.post.createdAt.split("T")[0]}</p>
                          <p>
                            {post.post.createdAt.split("T")[1].split(".")[0]}
                          </p>
                        </div>

                        {post.post.postedBy === user.userId && (
                          <p
                            className="text-blue-500 cursor-pointer"
                            onClick={(e) => {
                              console.log(post);
                              navigate(`/group/${post.post._id}/editpost`);
                            }}
                          >
                            Edit
                          </p>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <h2 className="font-bold">Address: </h2>
                  <p className="text-sm">{post.post.address}</p>
                </div>
                <div className="flex items-center gap-1">
                  <h2 className="font-bold w-[64.44px]">Date: </h2>
                  <p className="text-sm">{post.post.date}</p>
                </div>
                <div className="flex justify-center gap-1 space-x-5 text-sm pt-1">
                  <hr />
                  {/* Functions for like and unlike */}
                  <div className="flex justify-center gap-1 items-center">
                    {liked === true ? (
                      <div className="flex justify-center gap-1">
                        <p>{singlePost.likesCount}</p>
                        <a
                          className="align-middle cursor-pointer"
                          onClick={handleUnlike}
                        >
                          Unlike{" "}
                        </a>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-1 cursor-pointer">
                        <p>{singlePost.likesCount}</p>
                        <a onClick={handleLike}>Like</a>
                      </div>
                    )}
                  </div>
                  {/* Functions for attend and unattend */}
                  <div className="flex flex-col">
                    <div className="flex justify-center gap-1">
                      <p>{singlePost.attendingCount}</p>
                      <p>Joining event</p>
                    </div>
                    <div className="flex justify-center gap-1">
                      {attending === true ? (
                        <div className="flex justify-center gap-1">
                          <p className="text-white bg-green-500 p-0.5 cursor-pointer">
                            Yes
                          </p>
                          <a
                            className=" p-0.5 cursor-pointer"
                            onClick={handleUnattend}
                          >
                            No{" "}
                          </a>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-1">
                          <a className=" p-0.5" onClick={handleAttend}>
                            Yes
                          </a>
                          <p className="text-white bg-red-500 p-0.5">No</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Functions for comments */}
                  <div className="flex  gap-1 items-center">
                    <p>{commentsCount}</p>
                    <p>Comments</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="collapse ">
                <input type="checkbox" />
                <div className="collapse-title font-medium text-sm p-0 m-0">
                  See comments
                </div>
                <div className="collapse-content">
                  {comments !== []
                    ? comments.map((comment) => {
                        const commentId = post._id;
                        return <PostsForum post={comment} key={commentId} />;
                      })
                    : []}
                </div>
              </div>

              <div className="collapse">
                <input type="checkbox" />
                <div className="collapse-title font-medium text-sm p-0 m-0 ">
                  Add a comment
                </div>
                <div className="collapse-content h-full p-0 m-0">
                  <textarea
                    id="newComment"
                    value={newComment}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                    className=" bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10"
                    placeholder="Write your thoughts here..."
                    defaultValue={""}
                  />
                  <button
                    onClick={handleNewComment}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
<div tabIndex={0} className="collapse border border-base-300 bg-base-100 rounded-box"> 
  <div className="collapse-title text-xl font-medium">
    Focus me to see content
  </div>
  <div className="collapse-content"> 
    <p>tabIndex={0} attribute is necessary to make the div focusable</p>
  </div>
</div> */

/* {user.userId === group.createdBy && (
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
              )}*/
