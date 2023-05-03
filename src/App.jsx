import './App.css'
import Posts from "./Posts.jsx";

export default function App() {
  return (
    <main className="mx-auto container h-screen flex flex-col items-center gap-3">
      <h1>All posts</h1>
      <Posts />
    </main>
  )
}
