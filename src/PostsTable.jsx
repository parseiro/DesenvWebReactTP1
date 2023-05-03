import {Table} from "flowbite-react";
import {Modal as FlowbiteModal} from "flowbite";
import React from "react";
import PostViewModal from "./PostViewModal.jsx";

function PostsTable(props) {
  const {posts, page, perPage, users} = props;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const modals = new Map();

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
              .map(({id, userId, title, body}) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                      {id}
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={() => {
                        const elementId = `viewPost-${id}`;
                        let m = modals.get(elementId);
                        if (!m) {
                          const el = document.getElementById(elementId);
                          m = new FlowbiteModal(el, { closable: false });
                          modals.set(elementId, m);
                        }
                        m?.show();
                      }}>
                        {title}
                      </button>
                      <PostViewModal
                        key={`modal-${id}`}
                        id={id}
                        user={users?.find(({id}) => id === userId)}
                        title={title}
                        body={body}
                        onClose={() => {
                          modals.get(`viewPost-${id}`)?.hide();
                        }}
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
