import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecuiterLogin';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJobs';
import ManageJobs from './pages/ManageJobs';
import ViewApplication from './pages/ViewApplication';

// Custom minimal Toastify styles that work with Tailwind
const toastifyClasses = {
  toast: "!bg-white !text-gray-800 !shadow-lg !rounded-lg !border !border-gray-200 !font-sans",
  progress: "!bg-blue-500",
  closeButton: "!text-gray-500 hover:!text-gray-700",
  // Add other toast classes as needed
};

function App() {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {showRecruiterLogin && <RecruiterLogin />}
      
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={toastifyClasses.toast}
        progressClassName={toastifyClasses.progress}
        closeButton={false} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        
        <Route path="/dashboard" element={<Dashboard />}>
          {companyToken && (
            <>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplication />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;