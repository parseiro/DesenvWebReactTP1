import React, {useState} from "react";
import {Button, Modal, Textarea} from "flowbite-react";

function PostEditModal(props) {
  const {post, users, onClose} = props;

  const [editingPost, setEditingPost] = useState(post);
  const {id, userId, title, body} = editingPost;

  const user = users?.find(({id}) => id === userId);
  const isNew = id === 0;

  const handleChange = (event) => {
    const {id, value} = event.target;
    setEditingPost((prev) => ({...prev, [id]: value}));
  }

  return (
    <Modal
      id={`editPost-${id}`}
      show={false}
      position="center"
      size="md"
      onClose={onClose}
      autofocus={false}
    >
      <Modal.Header className="balance">
        {isNew ? "Create new post" : `Edit post #${id}`}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {user && <p className="balance">{`Author: ${user.name}`}</p>}
          <Textarea
            id="body"
            placeholder="Type your post here..."
            required={true}
            rows={10}
            // value={body}
            // defaultValue={body}
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button>
          <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mr-1 -ml-1 w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Edit
        </Button>
        <Button color="red">
          <svg aria-hidden="true"
               className="w-5 h-5 mr-1.5 -ml-1"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"></path>
          </svg>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default React.memo(PostEditModal);
