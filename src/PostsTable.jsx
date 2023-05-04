// @ts-check
import {Table} from "flowbite-react";
import React from "react";

function PostsTable(props) {
  const {setCurrentModal, posts, page, perPage} = props;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (<>
    <Table striped
           hoverable
           className="w-full">
      <Table.Head>
        <Table.HeadCell className="text-center">
          Post ID
        </Table.HeadCell>
        <Table.HeadCell className="min-w-[300px]">
          Post title (click to show)
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {posts?.filter((_, index) => index >= startIndex && index < endIndex)
              .map((post, postIndex) => {
                const {id: postId, title} = post;

                return (<Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={postIndex}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                      {postId}
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={() => setCurrentModal({
                        mode: 'view', post,
                      })}>
                        {title}
                      </button>
                    </Table.Cell>
                  </Table.Row>);
              })}
      </Table.Body>
    </Table>
  </>);
}

export default React.memo(PostsTable);
