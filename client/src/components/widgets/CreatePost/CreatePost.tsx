"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICreatePost } from "@/models/post";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: ICreatePost) => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  onCreatePost,
}: CreatePostModalProps) {
  const [newPost, setNewPost] = useState<ICreatePost>({
    title: "",
    content: "",
    author: "",
    tags: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onCreatePost(newPost);
    onClose();
    setNewPost({ title: "", content: "", author: "", tags: [] });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <Input
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                required
              />
              <Input
                placeholder="Author"
                value={newPost.author}
                onChange={(e) =>
                  setNewPost({ ...newPost, author: e.target.value })
                }
                required
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={newPost.tags.join(", ")}
                onChange={(e) =>
                  setNewPost({
                    ...newPost,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />
              <Button type="submit">Create Post</Button>
            </motion.form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
