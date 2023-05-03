import {Table} from "flowbite-react";
import React from "react";

function PostsTable(props) {
  const {posts, page, perPage} = props;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (<>
    <Table striped hoverable className="w-full">
      <Table.Head>
        <Table.HeadCell className="text-center">
          ID
        </Table.HeadCell>
        <Table.HeadCell className="min-w-[300px]">
          Name
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {posts?.filter((_, index) => index >= startIndex && index < endIndex)
              .map(({id, title}) => (
                 <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={id}>
                   <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                     {id}
                   </Table.Cell>
                   <Table.Cell>
                     {title}
                   </Table.Cell>
                 </Table.Row>
               ))}
      </Table.Body>
    </Table>
  </>);
}

export default React.memo(PostsTable);
