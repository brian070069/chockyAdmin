import { Suspense, lazy } from "react";
import Nav from "./components/Nav";
import { Route, Routes, useLocation } from "react-router-dom";
import LazyLoading from "./components/LazyLoading";
import AddCourse from "./Pages/AddCourses/AddCourse";
import Register from "./Pages/Register/Register";


// Lazy load page components
const Login = lazy(() => import("./Pages/Login/Login"));
const Home = lazy(() => import("./Pages/Home/Home"));
const AddTool = lazy(() => import("./Pages/AddTool/AddTool"));
const UpdateTool = lazy(() => import("./Pages/UpdateTool/UpdateTools"));
const UpdateCourse = lazy(() => import("./Pages/UpdateCourse/UpdateCourse"));

function App() {
  return (
    <>
      <RouteNavigation />
      <Suspense fallback={<LazyLoading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/addtool" element={<AddTool />} />
          <Route path="/tools/:id" element={<UpdateTool />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/course/:id" element={<UpdateCourse />} />
        </Routes>
      </Suspense>
    </>
  );
}

const RouteNavigation = () => {
  const location = useLocation();

  return (
    location.pathname !== "/login" &&
    location.pathname !== "/register" && <Nav />
  );
};

export default App;
