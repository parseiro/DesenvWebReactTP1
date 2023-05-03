import React from "react";
import {Button, Modal} from "flowbite-react";

function PostViewModal(props) {
  const {id, title, body, onClose, user} = props;

  return (
    <Modal
      id={`post-${id}`}
      show={false}
      dismissible={false}
      position="center"
      size="md"
      onClose={onClose}
    >
      <Modal.Header className="balance">
        {title}
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
        <Button>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default React.memo(PostViewModal);
