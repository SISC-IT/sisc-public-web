import { apiGet } from "./client";

export function getPublicPosts({
  page = 0,
  size = 8,
  keyword = "",
} = {}) {
  return apiGet("/api/public/posts", { page, size, keyword });
}

export function getPublicPost(postId) {
  return apiGet(`/api/public/posts/${postId}`);
}

export function getClubPage() {
  return apiGet("/api/public/club");
}

export function getExecutivePage() {
  return apiGet("/api/public/executives");
}
