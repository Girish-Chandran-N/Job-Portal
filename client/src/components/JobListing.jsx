import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
    setCurrentPage(1);
  };

  const filteredJobs = jobsData.filter(job => 
    (!selectedCategories.length || selectedCategories.includes(job.category)) &&
    (!selectedLocations.length || selectedLocations.includes(job.location)) &&
    (!searchFilter.title || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())) &&
    (!searchFilter.location || job.location.toLowerCase().includes(searchFilter.location.toLowerCase()))
  );

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white rounded-lg shadow-sm p-6">
          {/* Current Search */}
          {isSearched && (searchFilter.title || searchFilter.location) && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Current Search</h3>
              <div className="flex flex-wrap gap-2">
                {searchFilter.title && (
                  <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {searchFilter.title}
                    <button
                      onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    {searchFilter.location}
                    <button
                      onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                      className="ml-2 text-green-500 hover:text-green-700"
                    >
                      &times;
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-full lg:hidden mb-4 flex items-center justify-between py-2 px-4 bg-gray-100 rounded-lg"
          >
            <span>{showFilter ? 'Hide Filters' : 'Show Filters'}</span>
            <svg
              className={`w-5 h-5 transition-transform ${showFilter ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Filters Container */}
          <div className={`${showFilter ? 'block' : 'hidden'} lg:block space-y-8`}>
            {/* Categories Filter */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Categories</h4>
              <ul className="space-y-2">
                {JobCategories.map((category) => (
                  <li key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`category-${category}`} className="ml-3 text-gray-700">
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations Filter */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Locations</h4>
              <ul className="space-y-2">
                {JobLocations.map((location) => (
                  <li key={location} className="flex items-center">
                    <input
                      id={`location-${location}`}
                      type="checkbox"
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`location-${location}`} className="ml-3 text-gray-700">
                      {location}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Latest Job Opportunities</h1>
            <p className="text-gray-600 mt-2">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
          </header>

          {/* Jobs Grid */}
          {paginatedJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedJobs.map((job) => (
                  <JobCard key={job._id || job.id} job={job} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchFilter({ title: '', location: '' });
                  setSelectedCategories([]);
                  setSelectedLocations([]);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobListing;