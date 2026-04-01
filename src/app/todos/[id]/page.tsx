import { TodoDetailsPage } from '@/views/todo-details';
import { getTodoById } from '@/entities/todo';
import { getUserById } from '@/entities/user';
import { HydrateStore } from '@/shared/lib/redux/HydrateStore';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  
  // Серверная загрузка данных в компоненте страницы
  const todo = await getTodoById(id);
  const user = await getUserById(todo.userId);
  
  return (
    <>
      <HydrateStore todo={todo} user={user} />
      <TodoDetailsPage todo={todo} user={user} />
    </>
  );
}



