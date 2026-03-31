import { PostDetailsPage } from '@/views/post-details';
import { getPostById } from '@/entities/post';
import { HydrateStore } from '@/shared/lib/redux/HydrateStore';

interface PageProps {
  params: Promise<{ id: string; postId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id, postId } = await params;
  
  // Серверная загрузка данных поста
  const post = await getPostById(postId);
  
  return (
    <>
      <HydrateStore post={post} />
      <PostDetailsPage post={post} todoId={id} />
    </>
  );
}

