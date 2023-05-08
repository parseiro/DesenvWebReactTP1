// @ts-check
import React, {useEffect, useState} from "react";
import {Pagination} from "flowbite-react";
import {createSymbol} from "./icones.jsx";
import PostEditModal from "./PostEditModal.jsx";
import PostViewModal from "./PostViewModal.jsx";
import PostsCards from "./PostsCards.jsx";
import Button from "./Button.jsx";

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

  function showCreatePostModal() {
    const nextId = posts?.reduce((acc, {id}) => Math.max(acc, id), 0) + 1;
    setCurrentModal({
      mode: 'new', post: {id: nextId, userId: 1, title: "", body: ""}
    });
  }

  function showViewPostModal(post) {
    return setCurrentModal({...currentModal, mode: 'view', post});
  }

  function showEditPostModal(post) {
    return setCurrentModal({...currentModal, mode: 'edit', post});
  }

  return <>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error fetching posts</p>}
    {posts && (<>

      <Button
        type="submit"
        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onPress={() => showCreatePostModal()}
      >
        {createSymbol}
        New post
      </Button>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          {/*          <div className="mx-auto max-w-screen-sm text-center mb-6 lg:mb-8">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Blog
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              We use an agile approach to test assumptions and connect with the needs
              of your audience early and often.
            </p>
          </div>*/}

          <div className="flex flex-col items-center justify-center text-center mb-6">
            <p>Page {page} of {totalPages}</p>
            <Pagination
              currentPage={page}
              layout="navigation"
              onPageChange={setPage}
              showIcons={true}
              totalPages={totalPages}
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <PostsCards
              showViewPostModal={showViewPostModal}
              posts={posts}
              users={users}
              page={page}
              perPage={perPage}
            />
          </div>
        </div>
      </section>

      {currentModal && currentModal.mode === "view" && (<PostViewModal
        // key={`viewModal-${id}`}
        post={currentModal.post}
        user={users?.find((u) => u.id === currentModal.post.userId)}
        onClose={() => setCurrentModal(null)}
        onClickEdit={() => showEditPostModal(currentModal.post)}
      />)}
      {currentModal && (currentModal.mode === "edit" || currentModal.mode === "new") && (
        <PostEditModal
          key={`editModal-${currentModal.post.postId}`}
          showViewPostModal={showViewPostModal}
          post={currentModal.post}
          isNew={currentModal.mode === "new"}
          users={users}
          onClose={() => setCurrentModal(null)}
          setPost={(savedPost) => {
            if (savedPost === null) {
              setPosts((prev) => prev.filter((p) => p.id !== currentModal.post.id));
            } else if (currentModal.mode === 'new') {
              setPosts((prev) => [
                ...prev.filter((p) => p.id !== savedPost.id),
                savedPost,
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
