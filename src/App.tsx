import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import MainPage from "./pages/main-page";
import TodoPage from "./pages/todo-page";
function App() {
 
 

  return (
   <BrowserRouter>
   <div className="container py-3">
    <Header/>
    <Routes>
    <Route index element={<MainPage />} />
    <Route path="todo" element={<TodoPage />} />
    </Routes>
    <Footer/>
   </div>
   </BrowserRouter>
  )
}

export default App
