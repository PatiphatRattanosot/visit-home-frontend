import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPage from "./pages/Admin/Home";
import Personnel from "./pages/Admin/Personnel";
import ManageAdminRoles from "./pages/Admin/ManageAdminRoles";
import YearManagement from "./pages/Admin/Year";
import Classroom from "./pages/Admin/Classroom";
import Status from "./pages/students/Status";
import AddFormPages from "./pages/students/AddVisitData/Index";
import UpdateFormPages from "./pages/students/UpdateVisitData/Index";
import ViewVisitData from "./pages/students/ViewVisitData/Index";
import SDQFormStudent from "./pages/students/SDQ/student/Index";
import SDQFormParent from "./pages/students/SDQ/parent/Index";
import ClassroomDetail from "./pages/Admin/ClassroomDetail";
import StudentList from "./pages/teacher/StudentList";
import VisitInfo from "./pages/teacher/VisitInfo";

function App() {
  const { user, userInfo, isLoading, signInSystem, signOutSystem } =
    useAuthStore();

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <>
      <Navbar
        user={user}
        userInfo={userInfo}
        googleSignIn={signInSystem}
        logout={signOutSystem}
      />
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              userInfo?.role.includes("Admin") ? (
                <Navigate to={"/admin"} />
              ) : userInfo?.role.includes("Student") ? (
                <Navigate to={"/student"} />
              ) : userInfo?.role.includes("Teacher") &&
                userInfo?.role.length === 1 ? (
                <Navigate to={"/teacher"} />
              ) : (
                <Landing />
              )
            }
          />
          {/* Admin */}
          <Route
            path="admin"
            element={!userInfo?.role.includes("Admin") && <Navigate to={"/"} />}
          >
            <Route path="" element={<Personnel />} />
            <Route path="dashboard" element={<AdminPage />} />
            <Route path="manage-admin" element={<ManageAdminRoles />} />
            <Route path="year" element={<YearManagement />} />
            <Route path="year/classroom">
              <Route path="" element={<Classroom />} />
              <Route path=":classroomId" element={<ClassroomDetail />} />
              <Route path=":yearId/:year" element={<Classroom />} />
            </Route>
          </Route>

          {/* Student */}
          <Route
            path="student"
            element={
              !userInfo?.role.includes("Student") && <Navigate to={"/"} />
            }
          >
            <Route path="" element={<Status />} />
            {/* Visit Data */}
            <Route path="visiting-info">
              <Route path="" element={<ViewVisitData />} />
              <Route path="add/:yearId" element={<AddFormPages />} />
              <Route path="update/:yearId" element={<UpdateFormPages />} />
            </Route>
            {/* ข้อมูล SDQ */}
            <Route path="sdq-student" element={<SDQFormStudent />} />
            <Route path="sdq-parent" element={<SDQFormParent />} />
          </Route>

          {/* Teacher */}
          <Route
            path="teacher"
            element={
              !userInfo?.role.includes("Teacher") && <Navigate to={"/"} />
            }
          >
            <Route
              path=""
              element={<div className="text-xl">Teacher Page</div>}
            />
            <Route path="students" element={<StudentList />} />
            <Route path="visit-info" element={<VisitInfo />} />
          </Route>
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
