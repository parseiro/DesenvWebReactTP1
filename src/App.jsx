// @ts-check
import './App.css';
import Posts from "./Posts.jsx";
import useSWR from "swr";
import {fetcher} from "./fetcher.js";
import {useAsync} from "./useAsync.js";
import React, {useEffect, useState} from "react";

export default function App() {
  const {
          execute: executePosts,
          value,
          error: postsError,
          status,
        } = useAsync(() => fetcher('https://jsonplaceholder.typicode.com/posts'), false);
  const postsLoading = status === 'pending';

  /** @type {any[], Function} */
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (value) {
      setPosts(value);
    }
  }, [value]);

  const {
          data: users,
          // error: usersError,
          // isLoading: usersLoading,
        } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

  return (
    <main className="container flex flex-col items-center h-screen gap-3 mx-auto">
      <div className="balance text-center prose prose-lg">
        <p>Hello, here I use following technologies: React, Tailwind, Flowbite,
          Radix-UI. This app uses a fake API from https://jsonplaceholder.typicode.com/,
          which means that changes aren't really recorded by the API, so changes are temporary.</p>
      </div>
      <Posts
        posts={posts}
        setPosts={setPosts}
        error={postsError}
        isLoading={postsLoading}
        users={users}
        execute={executePosts}
      />
    </main>
  );
}
