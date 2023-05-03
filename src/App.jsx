import './App.css'
import Posts from "./Posts.jsx";
import useSWR from "swr";
import {fetcher} from "./fetcher.js";

export default function App() {
  const {
          data: posts,
          error: postsError,
          isLoading: postsLoading
        } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

  const {
          data: users,
          error: usersError,
          isLoading: usersLoading
        } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

  return (
    <main className="mx-auto container h-screen flex flex-col items-center gap-3">
      <h1>All posts</h1>
      <Posts
        posts={posts}
        error={postsError}
        isLoading={postsLoading}
        users={users}
      />
    </main>
  )
}
