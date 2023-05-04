// @ts-check
import React, {useEffect, useState} from "react";
import {Button} from "flowbite-react";
import {useAsync} from "./useAsync.js";
import {creator, deleter, patcher} from "./fetcher.js";
import {deleteSymbol, createSymbol, loadingCircle} from "./icones.jsx";
import * as Dialog from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';

function PostEditModal(props) {
  const {post, setPost, users, onClose} = props;

  const isNew = !!props.isNew;

  const [editingPost, setEditingPost] = useState(post);
  const {id, userId, title, body} = editingPost;

  const user = users?.find(({id}) => id === userId);

  const isValid = title?.length > 0 && body?.length > 0;

  const address = `https://jsonplaceholder.typicode.com/posts`;
  const {
          execute: executePatch,
          status: statusPatch,
          value: valuePatch,
          error: errorPatch
        } =
          useAsync(() => patcher(`${address}/${post.id}`, editingPost), false);

  const {
          execute: executeCreate,
          status: statusCreate,
          value: valueCreate,
          error: errorCreate
        } =
          useAsync(() => creator(address, editingPost), false);

  const savedPost = valuePatch || valueCreate;

  const {execute: executeDelete, status: statusDelete, error: errorDelete} =
          useAsync(() => deleter(`${address}/${post.id}`), false);

  let feedback = "";
  if (statusPatch === "pending" || statusDelete === "pending" || statusCreate === "pending") {
    feedback = "Please wait...";
  } else if (statusCreate === "error" || statusPatch === "error" || statusDelete === "error") {
    const error = errorCreate || errorPatch || errorDelete;
    feedback = `Error!: ${error}`;
  } else if (statusPatch === "success" || statusCreate === "success") {
    feedback = "Success, you may close";
  }

  const handleChange = (event) => {
    const {id, value} = event.target;
    setEditingPost((prev) => ({...prev, [id]: value}));
  };

  function onSubmit(e) {
    e.preventDefault();
    if (isValid && !isNew) executePatch();
    if (isValid && isNew) executeCreate();
  }

  function onDelete() {
    // console.log("onDelete");
    executeDelete();
  }

  useEffect(() => {
    if (savedPost) {
      setPost(savedPost);
    }
  }, [savedPost]);

  useEffect(() => {
    // if (statusDelete) console.log('statusDelete: ', statusDelete);
    if (statusDelete === "success") {
      setPost(null);
      onClose();
    }
  }, [statusDelete]);

  return (
    <Dialog.Root open
                 modal>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"/>
        <div
          tabIndex="-1"
          className="fixed top-0 right-0 left-0 z-50 w-full items-center justify-center overflow-y-auto overflow-x-hidden h-modal md:inset-0 md:h-full">
          <div className="relative h-full w-full p-4 md:h-auto max-w-md mx-auto">
            {/* Modal content */}
            <Dialog.Content className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
              {/* Modal header */}
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isNew ? `Create new post (id ${id})` : `Edit post (id ${id})`}
                </Dialog.Title>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400 p-1.5 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form
                action="#"
                onSubmit={onSubmit}
              >
                <div className="mb-4 flex flex-col gap-4">
                  <div>
                    <Label.Root
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </Label.Root>
                    <input
                      type="text"
                      id="title"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={title}
                      required={true}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label.Root
                      htmlFor="body"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content
                    </Label.Root>
                    <textarea
                      id="body"
                      required={true}
                      rows={10}
                      value={body}
                      // defaultValue={body}
                      onChange={handleChange}
                      // autoFocus={true}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:ring-primary-500 focus:border-primary-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  {user && <p className="balance">{`Author: ${user.name}`}</p>}
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className={`inline-flex items-center rounded-lg px-5 text-center text-sm font-medium text-white bg-primary-700 py-2.5 hover:bg-primary-800 focus:ring-primary-300 focus:outline-none focus:ring-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                     ${!isValid && "opacity-50 cursor-not-allowed"}`}
                    disabled={!isValid}
                  >
                    {statusPatch === "pending" && loadingCircle}
                    {statusPatch !== "pending" && createSymbol}
                    Save
                  </button>
                  <p>{feedback}</p>
                  {!isNew && (
                    <Button color="red"
                            onClick={onDelete}>
                      {statusDelete === "pending" && loadingCircle}
                      {statusDelete !== "pending" && deleteSymbol}
                      Delete
                    </Button>
                  )}
                </div>
              </form>
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default React.memo(PostEditModal);
