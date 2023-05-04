// @ts-check
import {Table} from "flowbite-react";
import React from "react";

function PostsCards(props) {
  const {setCurrentModal, posts, page, perPage, users} = props;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (<>
    {posts?.filter((_, index) => index >= startIndex && index < endIndex)
          .map((post, postIndex) => {
            const {id: postId, title, body} = post;
            const user = users.find((u) => u.id === post.userId);

            return (
              <article
                className="flex cursor-pointer flex-col items-start justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                key={postIndex}
                onClick={() => setCurrentModal({
                  mode: 'view', post,
                })}
              >
                <div>
                <span
                  className="mr-2 rounded bg-purple-100 text-xs font-semibold text-purple-800 px-2.5 py-0.5 dark:bg-purple-200 dark:text-purple-900">
                  id: {postId}
                </span>
                </div>
                <h2 className="my-2 text-left text-2xl font-bold tracking-tight text-gray-900 line-clamp-1 balance dark:text-white">
                  {title}
                </h2>
                <p className="mb-4 text-left font-light text-gray-500 line-clamp-3 balance dark:text-gray-400">
                  {body}
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="Jese Leos avatar"
                  />
                  <div className="font-medium dark:text-white">
                    <div>{user.name}</div>
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Aug 15, 2021 · 16 min read
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
  </>);
}

export default React.memo(PostsCards);
