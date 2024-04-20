import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import getPublishedDate from '../utils/getPublishedDate';
import usePosts from '../hooks/usePosts';

function ViewPostPage() {
  // const [post, setPost] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("")
  const [Published, setPublished] = useState("");

  const { post, getPostById } = usePosts();

  // const getPost = async () => {
  //   const results = await axios(
  //     `http://localhost:4000/posts/${params.postId}`
  //   );
  //   setPost(results.data.data);
  // }

  useEffect(() => {
    getPostById(params.postId);
  }, []);

  useEffect(() => {
    if(post){
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
      setPublished(post.published_at)
    }
  }, [post]);

  return (
    <div>
      <h1>ViewPostPage</h1>
      <div className=''>
        <h1>{title}</h1>
        <h2>Status: Published</h2>
        <h3>
          Published Time: {getPublishedDate(Published)}
        </h3>
        <p>{content}</p>
      </div>
      <button
      onClick={() => navigate("/")}
      >
        Back to Home!
      </button>
    </div>
  )
}

export default ViewPostPage