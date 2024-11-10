"use client";

import { useState, useEffect } from "react";
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
import { IPost } from "@/models/post";

interface UpdatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePost: (post: IPost) => void;
  post: IPost | null;
}

export default function UpdatePostModal({
  isOpen,
  onClose,
  onUpdatePost,
  post,
}: UpdatePostModalProps) {
  const [updatedPost, setUpdatedPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (post) {
      setUpdatedPost(post);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedPost) {
      onUpdatePost(updatedPost);
      onClose();
    }
  };

  if (!updatedPost) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Post</DialogTitle>
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
                value={updatedPost.title}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, title: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="Content"
                value={updatedPost.content}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, content: e.target.value })
                }
                required
              />
              <Input
                placeholder="Author"
                value={updatedPost.author}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, author: e.target.value })
                }
                required
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={updatedPost.tags.join(", ")}
                onChange={(e) =>
                  setUpdatedPost({
                    ...updatedPost,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />
              <Button type="submit">Update Post</Button>
            </motion.form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
