import { useState } from "react";
import usePosts from "../hooks/usePosts";
import { Link } from 'react-router-dom'

function CreatePostForm(){
  const { createPost, errorMessage } = usePosts()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const status = "published"

  const handleSubmit = (event) => {
    event.preventDefault();
    if(title !== "" && content !== ""){
      createPost({
        title,
        content,
        status,
      })
    }
    else{
      return errorMessage
    }
  }

  return (
    <div className="w-full bg-[cornflowerblue]">
      <form
      onSubmit={handleSubmit}
      className="w-full mx-auto px-12 sm:px-24"
      >
        <div className="flex flex-col gap-4 ">
          <h1 className="text-center mt-12 mb-8">
            Create Post Form
          </h1>

          <div>
            <label>
              Title
            </label>  
            <input
              placeholder="Enter title here"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />       
          </div>

          <div className="flex">
            <label>
              Content
            </label>
            <textarea
              type="text"
              placeholder="Enter Content here"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              rows={4}
              cols={30}
            />      
          </div>

          <div className={`flex justify-around items-center`}>
              <button 
              type="submit"
              className="bg-red-400 py-2 px-4 size-fit"
              >
                Create
              </button>
              <Link
              to="/"
              className='py-2 px-4 bg-green-400'
              >
                Back to Home
              </Link>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CreatePostForm;