import React, {useEffect, useState} from "react";
import {Pagination} from "flowbite-react";
import PostsTable from "./PostsTable.jsx";
import useSWR from 'swr';
import {fetcher} from "./fetcher.js";

function Posts({posts, error, isLoading, users}) {

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    if (posts) {
      setPage(1);
      setTotalPages(Math.ceil(posts.length / perPage));
    }
  }, [posts]);

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
            posts={posts}
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
