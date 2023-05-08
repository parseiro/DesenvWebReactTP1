// @ts-check
import React from "react";
import {editIcon} from "./icones.jsx";
import Button from "./Button.jsx";
import * as Dialog from "@radix-ui/react-dialog";
import {VisuallyHidden} from "react-aria";

function PostViewModal(props) {
  const {post, user, onClose, onClickEdit, isOpen} = props;
  const {id, title, body} = post;

  return (
    <Dialog.Root open={isOpen}
                 modal>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"/>
        <div
          tabIndex="-1"
          className="fixed top-0 right-0 left-0 z-50 w-full items-center justify-center overflow-y-auto overflow-x-hidden h-modal md:inset-0 md:h-full">
          <div className="relative mx-auto h-full w-full max-w-md p-4 md:h-auto">
            {/* Modal content */}
            <Dialog.Content className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
              {/* Modal header */}
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5 balance">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title} - Post #{id}
                </Dialog.Title>
                <Button
                  type="button"
                  onPress={onClose}
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400 p-1.5 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <VisuallyHidden>
                    Close modal
                  </VisuallyHidden>
                </Button>
              </div>
              {/* Modal body */}
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
              <Button
                type="button"
                className="inline-flex items-center rounded-lg px-5 text-center text-sm font-medium text-white bg-primary-700 py-2.5 hover:bg-primary-800 focus:ring-primary-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onPress={onClickEdit}
              >
                {editIcon}
                Edit
              </Button>
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default React.memo(PostViewModal);
