// @ts-check
import React, {useEffect, useState} from "react";
import {Pagination} from "flowbite-react";
import PostsTable from "./PostsTable.jsx";
import {createSymbol} from "./icones.jsx";
import PostEditModal from "./PostEditModal.jsx";
import PostViewModal from "./PostViewModal.jsx";

function Posts({posts, setPosts, error, isLoading, users, execute}) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(3);

  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const newTotalPages = Math.ceil(posts.length / perPage);
      setTotalPages(newTotalPages);

      if (page > newTotalPages) {
        setPage(newTotalPages);
      }
    } else {
      if (page !== 1) setPage(1);
      if (totalPages !== 1) setTotalPages(1);
    }
  }, [posts]);

  useEffect(() => {
    execute();
  }, []);

    // console.log('currentModal', currentModal);

  return <>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error fetching posts</p>}
    {posts && (<>
      <h1>All posts</h1>

      <button
        type="submit"
        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={() => {
          // if (currentModal) throw new Error('I already have an open modal');
          const nextId = posts?.reduce((acc, {id}) => Math.max(acc, id), 0) + 1;
          setCurrentModal({
            mode: 'new', post: {id: nextId, userId: 1, title: "", body: ""}
          });
        }}
      >
        {createSymbol}
        New post
      </button>

      <div className="flex flex-col items-center justify-center text-center">
        <p>Page {page} of {totalPages}</p>
        <Pagination
          currentPage={page}
          layout="navigation"
          onPageChange={setPage}
          showIcons={true}
          totalPages={totalPages}
        />
      </div>

      <div className="flex flex-col items-center justify-center text-center min-w-full">
        <PostsTable
          setCurrentModal={setCurrentModal}
          posts={posts}
          users={users}
          page={page}
          perPage={perPage}
        />
      </div>
      {currentModal && currentModal.mode === "view" && (<PostViewModal
        // key={`viewModal-${id}`}
        post={currentModal.post}
        user={users?.find((u) => u.id === currentModal.post.userId)}
        onClose={() => setCurrentModal(null)}
        onClickEdit={() => setCurrentModal(prev => ({...prev, mode: "edit"}))}
      />)}
      {currentModal && (currentModal.mode === "edit" || currentModal.mode === "new") && (
        <PostEditModal
          key={`editModal-${currentModal.post.postId}`}
          post={currentModal.post}
          isNew={currentModal.mode === "new"}
          users={users}
          onClose={() => setCurrentModal(null)}
          setPost={(savedPost) => {
            if (savedPost === null) {
              setPosts((prev) => prev.filter((p) => p.id !== currentModal.post.id));
            } else if (currentModal.mode === 'new') {
              setPosts((prev) => [
                savedPost, ...prev.filter((p) => p.id !== savedPost.id)
              ]);
            } else {
              setPosts((prev) => prev.map((p) => p.id === savedPost.id ? savedPost : p));
            }
          }}
        />)}
    </>)}
  </>;
}

Posts.propTypes = {};

export default React.memo(Posts);
