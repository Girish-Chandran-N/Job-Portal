import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();

  // State management
  const [searchFilter, setSearchFilter] = useState({ title: '', location: '' });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API call functions
  const fetchData = async (url, options = {}) => {
    try {
      const response = await axios.get(`${backendUrl}${url}`, options);
      if (response.data.success) {
        return response.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      throw error;
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/api/jobs');
      setJobs(data.jobs);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyData = async () => {
    if (!companyToken) return;
    try {
      const data = await fetchData('/api/company/company', {
        headers: { token: companyToken }
      });
      setCompanyData(data.company);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const data = await fetchData('/api/users/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(data.user);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      const data = await fetchData('/api/users/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserApplications(data.applications);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Effects
  useEffect(() => {
    const storedCompanyToken = localStorage.getItem('companyToken');
    if (storedCompanyToken) setCompanyToken(storedCompanyToken);
    fetchJobs();
  }, []);

  useEffect(() => {
    if (companyToken) fetchCompanyData();
  }, [companyToken]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  // Context value
  const value = {
    searchFilter, setSearchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setShowRecruiterLogin,
    companyToken, setCompanyToken,
    companyData, setCompanyData,
    userData, setUserData,
    userApplications, setUserApplications,
    fetchUserData,
    fetchUserApplications,
    backendUrl,
    loading,
    error
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};