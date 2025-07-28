import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContextWrapper";
import UsersContextWrapper from "./context/UsersContextWrapper";
import IsLoggedIn from "./components/Routing/isLoggedIn";
import IsLoggedOut from "./components/Routing/isLoggedOut";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MemberUpload from "./pages/MemberUpload";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Products from "./pages/Products";
import LeaderBoard from "./pages/LeaderBoard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersTable from "./pages/AdminUsersTable";
import AdminManagePayments from "./pages/AdminManagePayments";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import AdminPaymentVerificationPage from "./pages/Admin/AdminPaymentVerification";

function App() {
  return (
    <>
      <AuthContextWrapper>
        <UsersContextWrapper>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" element={<IsLoggedOut />}>
                <Route index element={<LoginPage />} />
              </Route>
              <Route path="/signup" element={<IsLoggedOut />}>
                <Route index element={<SignupPage />} />
              </Route>
              <Route path="/profile/add" element={<IsLoggedIn />}>
                <Route index element={<MemberUpload />} />
              </Route>
              <Route path="/" element={<IsLoggedIn />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/profile" element={<IsLoggedIn />}>
                <Route index element={<Profile />} />
              </Route>
              <Route path="/profile/edit" element={<IsLoggedIn />}>
                <Route index element={<EditProfile />} />
              </Route>
              <Route path="/admin" element={<IsLoggedIn />}>
                <Route index element={<AdminDashboard />} />
              </Route>
              <Route path="/admin/manage-users" element={<IsLoggedIn />}>
                <Route index element={<AdminUsersTable />} />
              </Route>
              <Route path="/packages" element={<IsLoggedIn />}>
                <Route index element={<Packages />} />
              </Route>
              <Route path="/packages/:packageId" element={<IsLoggedIn />}>
                <Route index element={<PackageDetails />} />
              </Route>

              <Route
                path="/admin/payment/verification"
                element={<IsLoggedIn />}
              >
                <Route index element={<AdminPaymentVerificationPage />} />
              </Route>
              <Route path="/admin/manage-payments" element={<IsLoggedIn />}>
                <Route index element={<AdminManagePayments />} />
              </Route>
              <Route path="/profile/change-password" element={<IsLoggedIn />}>
                <Route index element={<ChangePassword />} />
              </Route>
              <Route path="/products" element={<IsLoggedIn />}>
                <Route index element={<Products />} />
              </Route>
              <Route path="/leaderboard" element={<IsLoggedIn />}>
                <Route index element={<LeaderBoard />} />
              </Route>

              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </UsersContextWrapper>
      </AuthContextWrapper>
    </>
  );
}

export default App;
