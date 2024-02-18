import { useQuery } from "react-query";
import { fetchTodos } from "./api";
import TodoCard from "./components/TodoCard";
export default function Demo() {
  const { data: todos, isLoading } = useQuery({
    queryFn: ()=> fetchTodos(),
    queryKey:['todos']
  });

  if (isLoading) { 
    return <div>Loading...</div>
  }

  return (
    <div>
      {todos?.map(todo => {
        return <TodoCard key={todo.id} todo={todo} />
      })}
    </div>
  );
}
