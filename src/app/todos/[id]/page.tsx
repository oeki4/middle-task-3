import { TodoDetailsPage } from '@/views/todo-details';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <TodoDetailsPage id={id} />;
}
