import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import usePosts from "../hooks/usePosts";

function EditPostForm(){
  const params = useParams();

  const { post, getPostById, updatePostById } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");

  useEffect(() => {
    getPostById(params.postId);    
  }, []);

  useEffect(() => {
    if(post){
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostById(params.postId, {
      title,
      content,
      status,
    })
  }

  return (
    <div className="w-full h-screen bg-[cornflowerblue]">
      <form 
      onSubmit={handleSubmit}
      className="w-full mx-auto px-8 sm:px-24"
      >

        <div className="flex flex-col justify-center">
          <h1>Edit Post Form</h1>

          <div>
            <label>Title</label>
            <input 
            type="text"
            placeholder="Enter title here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />
          </div>

          <div>
            <label>Content</label>
            <textarea
            type="text"
            placeholder="Enter content here"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            rows={4}
            cols={30}
            />
          </div>

        </div>

        <div className={`flex justify-between items-center`}>
          <button type="submit">
            Update
          </button>
          <Link
          to="/"
          >
            Back to Home
          </Link>
        </div>
        

      </form>
    </div>
    
  )
}

export default EditPostForm;