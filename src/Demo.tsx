import { useQuery ,useMutation} from "react-query";
import { addTodo, fetchTodos } from "./api";
import TodoCard from "./components/TodoCard";
import { useState } from "react";
export default function Demo() {
  // form state
  const [title, setTitle] = useState("")
  // Query todos
  const { data: todos, isLoading } = useQuery({
    queryFn: ()=> fetchTodos(),
    queryKey:['todos']
  });

// make changes to DB or object in memory
  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn:addTodo
  });

  if (isLoading) { 
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <input  type="text" name="todo" id="todo" onChange={(e) => setTitle(e.target.value)} value={title} />
        <button onClick={async () => {
          try {
            await addTodoMutation({ title });
            setTitle("")
          } catch (error) {
            console.log(error);
          }
        }}>Add Todo</button>
      </div>
      {todos?.map(todo => {
        return <TodoCard key={todo.id} todo={todo} />
      })}
    </div>
  );
}
