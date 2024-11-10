import axios from "axios";
import { ICreatePost, IPost } from "@/models/post";

const API_URL = import.meta.env.VITE_API_URL;

// Get all posts
export const getArticles = async (): Promise<IPost[]> => {
  try {
    const response = await axios.get<IPost[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

// Get a single post by ID
export const getArticle = async (id: string): Promise<IPost | null> => {
  try {
    const response = await axios.get<IPost>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

// Create a new post
export const createArticle = async (
  postData: ICreatePost,
): Promise<IPost | null> => {
  try {
    const response = await axios.post<IPost>(API_URL, postData);
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    return null;
  }
};

// Update a post
export const updateArticle = async (
  id: string,
  postData: IPost,
): Promise<IPost | null> => {
  try {
    const response = await axios.put<IPost>(`${API_URL}/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    return null;
  }
};

// Delete a post
export const deleteArticle = async (
  id: string,
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(
      `${API_URL}/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    return { message: "Error occurred while deleting" };
  }
};
