import {Table} from "flowbite-react";
import {Modal as FlowbiteModal} from "flowbite";
import React from "react";
import PostViewModal from "./PostViewModal.jsx";
import PostEditModal from "./PostEditModal.jsx";

function PostsTable(props) {
  const {modals, posts, setPosts, page, perPage, users} = props;
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
                const {id, userId, title} = post;

                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={postIndex}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                      {id}
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={() => {
                        const elementId = `viewPost-${id}`;
                        let m = modals.current.get(elementId);
                        if (!m) {
                          const el = document.getElementById(elementId);
                          m = new FlowbiteModal(el, {closable: false});
                          modals.current.set(elementId, m);

                          const editEl = document.getElementById(`editPost-${id}`);
                          const editModal = new FlowbiteModal(
                            editEl, {
                              placement: "center",
                              closable: false,
                            });
                          modals.current.set(`editPost-${id}`, editModal);
                        }
                        m?.show();
                      }}>
                        {title}
                      </button>
                      <PostViewModal
                        key={`viewModal-${id}`}
                        post={post}
                        user={users?.find(({id}) => id === userId)}
                        onClose={() => {
                          modals.current.get(`viewPost-${id}`)?.hide();
                        }}
                        onClickEdit={() => {
                          modals.current.get(`viewPost-${id}`)?.hide();
                          modals.current.get(`editPost-${id}`)?.show();
                        }}
                      />
                      <PostEditModal
                        key={`editModal-${id}`}
                        elementId={`editPost-${id}`}
                        post={post}
                        users={users}
                        onClose={() => {
                          modals.current.get(`editPost-${id}`)?.hide();
                        }}
                        posts={posts}
                        setPosts={setPosts}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
      </Table.Body>
    </Table>
  </>);
}

export default React.memo(PostsTable);
