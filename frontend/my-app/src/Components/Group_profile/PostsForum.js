import React from "react";

export default function PostsCommentsComponent(comment, commentId) {
  return (
    <div>
      <div className="chat chat-end">
        <div className="chat-header">
          {comment.post.senderName}
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble">{comment.post.message}</div>
        <div className="chat-footer opacity-50 text-xs text-end">
          <p>{comment.post.createdAt.split("T")[0]}</p>
          <p>{comment.post.createdAt.split("T")[1].split(".")[0]}</p>
        </div>
      </div>
    </div>
  );
}
