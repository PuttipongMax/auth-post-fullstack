import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CreatePostPage from "../pages/CreatePostPage";
import ViewPostPage from "../pages/ViewPostPage";
import EditPostPage from "../pages/EditPostPage";
import NotFoundPage from "../pages/NotFoundPage";

function Authenticated() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/create" element={<CreatePostPage />} />
                <Route path="/post/view/:postId" element={<ViewPostPage />} />
                <Route path="/post/edit/:postId" element={<EditPostPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default Authenticated;