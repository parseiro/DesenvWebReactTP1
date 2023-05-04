// @ts-check
import React, {useEffect, useState} from "react";
import {Button} from "flowbite-react";
import {useAsync} from "./useAsync.js";
import {deleter, patcher} from "./fetcher.js";
import {deleteSymbol, editSymbol, loadingCircle} from "./icones.jsx";

function PostEditModal(props) {
  const {post, setPost, users, onClose} = props;

  const isNew = !!props.isNew;

  const [editingPost, setEditingPost] = useState(post);
  const {id, userId, title, body} = editingPost;

  const user = users?.find(({id}) => id === userId);

  const isValid = title?.length > 0 && body?.length > 0;

  const address = `https://jsonplaceholder.typicode.com/posts/${post.id}`;
  const {
          execute: executePatch,
          status: statusPatch,
          value: valuePatch,
          error: errorPatch
        } =
          useAsync(() => patcher(address, editingPost), false);

  const {
          execute: executeCreate,
          status: statusCreate,
          value: valueCreate,
          error: errorCreate
        } =
          useAsync(() => patcher(address, editingPost), false);

  const savedPost = valuePatch || valueCreate;

  const {execute: executeDelete, status: statusDelete, error: errorDelete} =
          useAsync(() => deleter(address), false);

  let feedback = "";
  if (statusPatch === "pending" || statusDelete === "pending" || statusCreate === "pending") {
    feedback = "Saving...";
  } else if (statusCreate === "error" || statusPatch === "error" || statusDelete === "error") {
    const error = errorCreate || errorPatch || errorDelete;
    feedback = `Error!: ${error}`;
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
    <>
      {/* Main modal */}
      <div
        // tabIndex={-1}
        // aria-hidden="false"
        className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isNew ? "Create new post" : `Edit post #${id}`}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
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
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={title}
                    required={true}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="body"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Content
                  </label>
                  <textarea
                    id="body"
                    required={true}
                    rows={10}
                    value={body}
                    // defaultValue={body}
                    onChange={handleChange}
                    // autoFocus={true}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                {user && <p className="balance">{`Author: ${user.name}`}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {statusPatch === "pending" && loadingCircle}
                  {statusPatch !== "pending" && editSymbol}
                  Save
                </button>
                <p>{feedback}</p>
                <Button color="red"
                        onClick={onDelete}>
                  {statusDelete === "pending" && loadingCircle}
                  {statusDelete !== "pending" && deleteSymbol}
                  Delete
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(PostEditModal);
