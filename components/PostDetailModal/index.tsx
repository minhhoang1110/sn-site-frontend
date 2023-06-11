/* eslint-disable react-hooks/exhaustive-deps */
import { Comment, Post, User } from "@/types/DataObject";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import PostItem from "../PostItem";
import ListComment from "../ListComment";
import { usePost } from "@/hooks";
import CreateComment from "../CreateComment";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: Post;
  setSelectedPost: any;
  loadPosts: any;
}
const PostDetailModal: React.FC<Props> = ({
  open,
  selectedPost,
  setOpen,
  setSelectedPost,
  loadPosts,
}) => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { post, postLoading, loadPost } = usePost(selectedPost.id);
  const cancelButtonRef = useRef(null);
  const getUserName = () => {
    const user: User | null = post && post.user;
    return `${user?.firstName || ""} ${user?.lastName || ""}`;
  };
  useEffect(() => {
    open && loadPost(selectedPost.id);
  }, [open]);
  if (postLoading) return <></>;
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-100"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl">
                <div className="bg-white pb-4 pt-5 sm:pb-4">
                  <div>
                    <div className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-xl text-center font-bold leading-6 text-gray-900 shadow-sm border-b border-gray-300 border-solid pb-3 relative"
                      >
                        Bài viết của {getUserName()}
                      </Dialog.Title>
                    </div>
                    <div
                      className="px-4 overflow-auto"
                      style={{ maxHeight: "calc(100vh - 350px)" }}
                    >
                      <PostItem
                        canUpdatePost={false}
                        loadPosts={loadPosts}
                        post={post}
                        loadPost={loadPost}
                        commentButtonEvent={false}
                        borderRadius={false}
                        shadow={false}
                        padding={false}
                        setSelectedPost={setSelectedPost}
                      />
                      <ListComment
                        comments={post?.comments || []}
                        setSelectedComment={setSelectedComment}
                        loadPost={loadPost}
                        loadPosts={loadPosts}
                      />
                    </div>
                    <div className="shadow-sm border-t border-gray-300 border-solid p-4">
                      <CreateComment
                        postId={post?.id || 0}
                        loadPost={loadPost}
                        loadPosts={loadPosts}
                        comment={selectedComment || undefined}
                        setSelectedComment={setSelectedComment}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default PostDetailModal;
