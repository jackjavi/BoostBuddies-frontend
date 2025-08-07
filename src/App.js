import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import AuthContextWrapper from "./context/AuthContextWrapper";
import UsersContextWrapper from "./context/UsersContextWrapper";
import IsLoggedIn from "./components/Routing/isLoggedIn";
import IsLoggedOut from "./components/Routing/isLoggedOut";
import IsAdmin from "./components/Routing/isAdmin";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MemberUpload from "./pages/MemberUpload";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersTable from "./pages/AdminUsersTable";
import AdminManagePayments from "./pages/AdminManagePayments";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import AdminPaymentVerificationPage from "./pages/Admin/AdminPaymentVerification";
import Payments from "./pages/Payments";
import Spinner from "./components/PageSpinner";

// Page wrapper component for consistent loading experience
const PageWrapper = ({ children, loadingMessage = "Loading page..." }) => {
  return (
    <Suspense fallback={<Spinner fullScreen={true} message={loadingMessage} />}>
      {children}
    </Suspense>
  );
};

function App() {
  return (
    <AuthContextWrapper>
      <UsersContextWrapper>
        <BrowserRouter>
          <Suspense
            fallback={
              <Spinner fullScreen={true} message="Loading application..." />
            }
          >
            <Header />
            <Routes>
              {/* Public routes (logged out users) */}
              <Route path="/login" element={<IsLoggedOut />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading login page...">
                      <LoginPage />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/signup" element={<IsLoggedOut />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading signup page...">
                      <SignupPage />
                    </PageWrapper>
                  }
                />
              </Route>

              {/* Protected routes (logged in users) */}
              <Route path="/profile/add" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading profile setup...">
                      <MemberUpload />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading dashboard...">
                      <Dashboard />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/profile" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading profile...">
                      <Profile />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/profile/edit" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading profile editor...">
                      <EditProfile />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/packages" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading packages...">
                      <Packages />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/packages/:packageId" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading package details...">
                      <PackageDetails />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/profile/change-password" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading password change...">
                      <ChangePassword />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/products" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading products...">
                      <Products />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/payments" element={<IsLoggedIn />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading payments...">
                      <Payments />
                    </PageWrapper>
                  }
                />
              </Route>

              {/* Admin-only routes */}
              <Route path="/admin" element={<IsAdmin />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading admin dashboard...">
                      <AdminDashboard />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/admin/manage-users" element={<IsAdmin />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading user management...">
                      <AdminUsersTable />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/admin/payment/verification" element={<IsAdmin />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading payment verification...">
                      <AdminPaymentVerificationPage />
                    </PageWrapper>
                  }
                />
              </Route>
              <Route path="/admin/manage-payments" element={<IsAdmin />}>
                <Route
                  index
                  element={
                    <PageWrapper loadingMessage="Loading payment management...">
                      <AdminManagePayments />
                    </PageWrapper>
                  }
                />
              </Route>

              {/* 404 route */}
              <Route
                path="*"
                element={
                  <PageWrapper loadingMessage="Loading page...">
                    <NotFound />
                  </PageWrapper>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UsersContextWrapper>
    </AuthContextWrapper>
  );
}

export default App;
