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
import PersonalInfo from "./pages/students/personal-info/PersonalInfo";
import AddPersonalInfoForm from "./pages/students/personal-info/AddPersonalInfoForm";
import UpdatePersonalInfoForm from "./pages/students/personal-info/UpdatePersonalInfoForm";
import Relation from "./pages/students/relation/Relation";
import AddRelationForm from "./pages/students/relation/AddRelationForm";
import UpdateRelationForm from "./pages/students/relation/UpdateRelationForm";
import FamilyStatus from "./pages/students/family-status/FamilyStatus";
import AddFamilyStatusForm from "./pages/students/family-status/AddFamilyStatusForm";
import UpdateFamilyStatusForm from "./pages/students/family-status/UpdateFamilyStatusForm";
import Behavior from "./pages/students/behavior/Behavior";
import AddBehaviorForm from "./pages/students/behavior/AddBehaviorForm";
import UpdateBehaviorForm from "./pages/students/behavior/UpdateBehaviorForm";
import SDQFormStudent from "./pages/students/SDQFormStudent";
import SDQFormParent from "./pages/students/SDQFormParent";

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
              path="year/classroom"
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
            {/* ข้อมูลส่วนตัว */}
            <Route path="personal-info">
              <Route path="" element={<PersonalInfo />} />
              <Route path=":year/add" element={<AddPersonalInfoForm />} />
              <Route path=":year/update" element={<UpdatePersonalInfoForm />} />
            </Route>
            {/* ข้อมูลความสัมพันธ์ */}
            <Route path="relation">
              <Route path="" element={<Relation />} />
              <Route path=":year/add" element={<AddRelationForm />} />
              <Route path=":year/update" element={<UpdateRelationForm />} />
            </Route>
            {/* ข้อมูลสถานะครัวเรือน */}
            <Route path="family-status">
              <Route path="" element={<FamilyStatus />} />
              <Route path=":year/add" element={<AddFamilyStatusForm />} />
              <Route path=":year/update" element={<UpdateFamilyStatusForm />} />
            </Route>
            {/* ข้อมูลพฤติกรรม */}
            <Route path="behavior">
              <Route path="" element={<Behavior />} />
              <Route path=":year/add" element={<AddBehaviorForm />} />
              <Route path=":year/update" element={<UpdateBehaviorForm />} />
            </Route>
            {/* ข้อมูล SDQ */}
            <Route path="sdq-student" element={<SDQFormStudent />} />
            <Route path="sdq-parent" element={<SDQFormParent />} />
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
