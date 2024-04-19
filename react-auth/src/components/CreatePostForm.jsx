import { useState } from "react";
import usePosts from "../hooks/usePosts";

function CreatePostForm(){
  const { createPost } = usePosts()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const status = "published"

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      title,
      content,
      status,
    })
  }

  return (
    <div className="w-full h-screen bg-[cornflowerblue]">
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

          <div className={`bg-red-400 py-2 px-4 size-fit`}>
                <button type="submit">Create</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CreatePostForm;