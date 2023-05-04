import React, {useEffect, useState} from "react";
import {Pagination} from "flowbite-react";
import PostsTable from "./PostsTable.jsx";

function Posts({modals, posts, setPosts, error, isLoading, users, execute}) {

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(3);

  useEffect(() => {
    if (posts) {
      setPage(1);
      setTotalPages(Math.ceil(posts.length / perPage));
    }
  }, [posts]);

  useEffect(() => {execute()}, []);

  return <>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error fetching posts</p>}
    {posts && (<>
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
            modals={modals}
            posts={posts}
            setPosts={setPosts}
            users={users}
            page={page}
            perPage={perPage}
          />
        </div>
      </>
    )}
  </>;
}

Posts.propTypes = {};

export default React.memo(Posts);
