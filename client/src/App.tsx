"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  MoonIcon,
  SunIcon,
  Trash2Icon,
  EditIcon,
} from "lucide-react";
import CreatePostModal from "@/components/widgets/CreatePost/CreatePost";
import UpdatePostModal from "@/components/widgets/CreatePost/UpdatePost";
import { ICreatePost, IPost } from "@/models/post";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "./api/posts";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState<IPost | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchPosts = async () => {
    const res = await getArticles();
    setPosts(res);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addPost = (newPost: ICreatePost) => {
    createArticle(newPost);
    fetchPosts();
  };

  const updatePost = (updatedPost: IPost) => {
    updateArticle(updatedPost._id, updatedPost);
    fetchPosts();
  };

  const deletePost = (postId: string) => {
    deleteArticle(postId);
    fetchPosts();
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto">
        <motion.div
          className="fixed inset-0 z-[-1]"
          animate={{
            background: isDarkMode
              ? "linear-gradient(45deg, #1a202c 0%, #2d3748 100%)"
              : "linear-gradient(45deg, #e6f2ff 0%, #b3d9ff 100%)",
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="mb-8 flex justify-between">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <SunIcon className="h-[1.2rem] w-[1.2rem] text-white" />
            ) : (
              <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
        <motion.div layout className="grid gap-6">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-card text-card-foreground rounded-lg p-6 shadow-lg"
              >
                <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.content}</p>
                <div className="flex justify-between text-sm">
                  <span>By {post.author}</span>
                  <span>
                    {new Date(post.publishedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary text-primary-foreground mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPostToUpdate(post);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePost(post._id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Button
          className="fixed bottom-8 right-8"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Create Post
        </Button>

        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreatePost={addPost}
        />

        <UpdatePostModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setPostToUpdate(null);
          }}
          onUpdatePost={updatePost}
          post={postToUpdate}
        />
      </div>
    </div>
  );
}
