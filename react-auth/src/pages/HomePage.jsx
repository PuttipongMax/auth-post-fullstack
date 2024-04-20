import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/authentication";
import usePosts from '../hooks/usePosts';
import getPublishedDate from '../utils/getPublishedDate';
import DeleteButton from '../components/DeleteButton';

function HomePage() {
  const navigate = useNavigate();

  /* เรียกใช้ตัวเเปร logout จาก useAuth 
  ซึ่งเป็น context variable  */
  const { logout } = useAuth();

  /* มีการเรียกใช้ตัวเเปร จาก usePostsมาใช้ */
  const {
    posts, totalPages, getPosts, 
    deletePost, isError, isLoading
  } = usePosts();

  /* กำหนดตัวเเปร  */
  const [ page, setPage ] = useState(1);
  const [ status, setStatus ] = useState("");
  const [ keywords, setKeywords ] = useState("");

  /* คอยจับการเปลี่ยนเเปลงหน้าเว็บ  */
  useEffect(() => {
    getPosts({ status, keywords, page });
  }, [status, keywords, page]);

  return (
    <div className="w-full bg-[cornflowerblue]">
      <div className='w-full mx-auto px-12 sm:px-24'>

        <div className='flex flex-col text-center '>
          <h1 className="py-8">Blog Post App</h1>

          <div className='flex md:flex-row md:justify-between 
          md:items-center flex-col gap-4 justify-between items-start'>
            <button
            onClick={() => navigate("post/create")}
            className='py-2 px-4 bg-green-300 rounded-md text-white'
            >
              Create Post
            </button>     

            <div> 
              <label>
                Search post
                <input
                type="text"
                placeholder='Search by title'
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                View status
                <select
              
                >
                  <option>
                    -- Select a status --
                  </option>
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </label>
            </div>

            <button
            onClick={() => logout()}
            className="py-2 px-4 bg-red-300 rounded-md text-white"
            >
              Logout
            </button>
          </div>   

        </div>
        <div>
          {!posts.length && (
            <div className=''>
              <h1 className='text-center py-4'>No Blog Posts</h1>
            </div>
          )}
          {posts.map((post) => {
            return (
              <div 
              key={post._id} 
              className='flex flex-col gap-4 mt-8 bg-slate-300 rounded-2xl'
              >
                <h1>{post.title}</h1>
                <h2>Status: {post.status}</h2>
                <h2>
                  Published Time: {getPublishedDate(post.published_at)}
                </h2>
                <div className='flex justify-around'>
                  <button             
                  onClick={() => navigate(`/post/view/${post._id}`)}
                   className='py-2 px-4 bg-green-300 rounded-md text-white'
                  >
                    View post
                  </button>
                  <button         
                  onClick={() => navigate(`/post/edit/${post._id}`)}
                  className='py-2 px-4 bg-red-300 rounded-md'
                  >
                    Edit post
                  </button>
                </div>
              
                <DeleteButton
                  postId={post._id}
                  deletePost={deletePost}
                />
                
              </div>
            )
          })}
          {isError ? <h1>Request failed</h1> : null}
          {isLoading ? <h1>Loading ....</h1> : null}
        </div>
        
        <div className="pagination flex flex-row justify-center
        items-center">
          {page > 1 ? (
            <button       
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-red-300"
            >
              Previous
            </button>
          ) : null}

          {page !== totalPages ? (
            <button                 
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-red-300" 
            >
              Next
            </button>
          ) : null}
        </div>
        <div className=''>
          {page} / {totalPages}
        </div>

      </div> 
    </div>
  )
}

export default HomePage