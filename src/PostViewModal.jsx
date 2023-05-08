// @ts-check
import React from "react";
import {Modal} from "flowbite-react";
import {editIcon} from "./icones.jsx";
import Button from "./Button.jsx";

function PostViewModal(props) {
  const {post, user, onClose, onClickEdit} = props;
  const {id, title, body} = post;

  return (
    <Modal
      id={`viewPost-${id}`}
      show
      position="center"
      size="md"
      onClose={onClose}
    >
      <Modal.Header className="balance">
        {title} - Post #{id}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {user && <p className="balance">{`Author: ${user.name}`}</p>}
          {body.split(/\r?\n/).map((paragraph, index) => (
            <p
              key={index}
              className={`text-base leading-relaxed text-gray-500 
              dark:text-gray-400 balance`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          className="inline-flex items-center rounded-lg px-5 text-center text-sm font-medium text-white bg-primary-700 py-2.5 hover:bg-primary-800 focus:ring-primary-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onPress={onClickEdit}
        >
          {editIcon}
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default React.memo(PostViewModal);
