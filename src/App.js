import React from 'react';
import PostForm from "./components/posts/postform";
import PostsList from "./components/posts/postslist";

function App() {
  return (
    <div className="App">
        <PostForm />
        <PostsList/>
    </div>
  );
}

export default App;
