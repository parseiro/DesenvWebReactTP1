import './App.css';
import Posts from "./Posts.jsx";
import useSWR from "swr";
import {fetcher} from "./fetcher.js";
import {useAsync} from "./useAsync.js";
import React, {useEffect, useRef, useState} from "react";
import {editSymbol} from "./icones.jsx";
import PostEditModal from "./PostEditModal.jsx";
import {Modal as FlowbiteModal} from "flowbite";

export default function App() {
  const modals = useRef(new Map());

  const {
          execute: executePosts,
          value,
          error: postsError,
          status,
        } = useAsync(() => fetcher('https://jsonplaceholder.typicode.com/posts'), false);
  const postsLoading = status === 'pending';

  const [posts, setPosts] = useState(null);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    if (value) {
      setPosts(value);
    }
  }, [value]);

  useEffect(() => {
    if (posts) {
      let lastId = 0;
      posts.forEach((p) => {
        if (p.id > lastId) lastId = p.id;
      });
      setNextId(lastId + 1);
    }
  }, [posts]);

  const {
          data: users,
          // error: usersError,
          // isLoading: usersLoading,
        } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

  return (
    <main className="mx-auto container h-screen flex flex-col items-center gap-3">
      <h1>All posts</h1>
      <button
        type="submit"
        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={() => {
          const editEl = document.getElementById(`editPost-${nextId}`);
          const editModal = new FlowbiteModal(
            editEl, {
              placement: "center",
              closable: false,
            });
          modals.current.set(`newPost`, editModal);
          editModal.show();
        }}
      >
        {editSymbol}
        New post
      </button>
      <PostEditModal
        // key={`editModal-${nextId}`}
        elementId={`editPost-${nextId}`}
        isNew={true}
        post={{
          userId: 1,
          id: nextId,
          title: "",
          body: ""
        }}
        users={users}
        onClose={() => {
          modals.current.get(`newPost`)?.hide();
        }}
        posts={posts}
        setPosts={setPosts}
      />
      <Posts
        modals={modals}
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
