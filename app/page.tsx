import Todos from "./todos/page";

export default function Home() {
  return (
    <div>
      Home
      <Todos title="My Todo List" initialTasks={[]} />
    </div>
  );
}
