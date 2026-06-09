import { getPosts, type Post } from '@/lib/posts';
import KnowledgeBaseClient from './KnowledgeBaseClient';

export default async function KnowledgeBasePage() {
  const posts = await getPosts();
  const postsByCategory = posts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
  const categories = Object.keys(postsByCategory).sort();

  return <KnowledgeBaseClient postsByCategory={postsByCategory} categories={categories} />;
}
