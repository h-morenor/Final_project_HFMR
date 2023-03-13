import React from "react";
import { useState, useEffect, useContext } from "react";
import { Auth } from "../../context/Auth";
import GroupCardList from "./GroupCardList";
import Pagination from "./Pagination";

export default function MyGroups() {
  const { user } = useContext(Auth);
  const [error, setError] = useState("");
  const [myGroups, setMyGroups] = useState([]);

  //Pagination
  //const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  ///

  useEffect(() => {
    setError(null);
    if (!user) {
      console.log("user not found!");
      setError("User not found!");
      return;
    }

    const fetchGroups = async () => {
      const response = await fetch("/api/group/mygroups", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (!json) {
        setMyGroups([]);
      } else {
        setMyGroups(json);
      }
      console.log(json);

      setLoading(false);
    };

    fetchGroups();
  }, [user]);

  //Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myGroups.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  ///

  return (
    <div className="flex flex-col h-[calc(100vh-136px)]">
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

      <div className="btn-group justify-center align-center m-2">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={myGroups.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

/*




<div>
        {groups.map((group) => {
          return <GroupCard group={group} key={group._id} />;
        })}
      </div>
*/
