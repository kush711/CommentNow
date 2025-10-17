// Sort replies by upvotes
export function sortCommentsByUpvotes(comments) {
  return [...comments].sort((a, b) => b.upvotes - a.upvotes);
}

// Format date string nicely
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

