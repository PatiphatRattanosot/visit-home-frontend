import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPage from "./pages/Admin/Home";
import Personnel from "./pages/Admin/Personnel";
import ManageAdminRoles from "./pages/admin/ManageAdminRoles";
import YearManagement from "./pages/Admin/Year";
import Classroom from "./pages/Admin/Classroom";
import Status from "./pages/students/Status";
import SelfInfo from "./pages/students/self-info/SelfInfo";
import AddSelfInfoForm from "./pages/students/self-info/AddSelfInfoForm";
import UpdateSelfInfoForm from "./pages/students/self-info/UpdateSelfInfoForm";

import Relation from "./pages/students/relation/Relation";
import AddRelationForm from "./pages/students/relation/AddRelationForm";
import UpdateRelationForm from "./pages/students/relation/UpdateRelationForm";
import FamilyStatus from "./pages/students/family-status/FamilyStatus";
import AddFamilyStatusForm from "./pages/students/family-status/AddFamilyStatusForm";
import UpdateFamilyStatusForm from "./pages/students/family-status/UpdateFamilyStatusForm";
import Behavior from "./pages/students/behavior/Behavior";
import AddBehaviorForm from "./pages/students/behavior/AddBehaviorForm";
import UpdateBehaviorForm from "./pages/students/behavior/UpdateBehaviorForm";
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
            <Route path="" element={<AdminPage />} />
            <Route path="personnel" element={<Personnel />} />
            <Route path="manage-admin" element={<ManageAdminRoles />} />
            <Route path="year" element={<YearManagement />} />
            <Route
              path="year/classroom/:yearId/:year"
              element={<Classroom />}
            />
          </Route>

          {/* Student */}
          <Route
            path="student"
            element={
              !userInfo?.role.includes("Student") && <Navigate to={"/"} />
            }
          >
            <Route path="" element={<Status />} />
            <Route path="visit-info">
              <Route path="" element={<VisitInfo />} />
              <Route path=":year">
                {/* ข้อมูลส่วนตัว */}
                <Route path="self-info">
                  <Route path="" element={<SelfInfo />} />
                  <Route path="add" element={<AddSelfInfoForm />} />
                  <Route path="update" element={<UpdateSelfInfoForm />} />
                </Route>

                {/* ข้อมูลความสัมพันธ์ */}
                <Route path="relation">
                  <Route path="" element={<Relation />} />
                  <Route path="add" element={<AddRelationForm />} />
                  <Route path="update" element={<UpdateRelationForm />} />
                </Route>
                {/* ข้อมูลสถานะครัวเรือน */}
                <Route path="family-status">
                  <Route path="" element={<FamilyStatus />} />
                  <Route path="add" element={<AddFamilyStatusForm />} />
                  <Route path="update" element={<UpdateFamilyStatusForm />} />
                </Route>
                {/* ข้อมูลพฤติกรรม */}
                <Route path="behavior">
                  <Route path="" element={<Behavior />} />
                  <Route path="add" element={<AddBehaviorForm />} />
                  <Route path="update" element={<UpdateBehaviorForm />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* Teacher */}
          <Route
            path="teacher"
            // element={
            //   !userInfo?.role.includes("Teacher") && <Navigate to={"/"} />
            // }
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
