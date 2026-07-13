(function() {
  // Check localStorage for a state override first
  // If not set, we default to maintenance mode inactive (false)
  const localMaintenance = localStorage.getItem('navigo-maintenance-mode');
  const isMaintenanceMode = localMaintenance !== null ? (localMaintenance === 'true') : false;

  if (isMaintenanceMode) {
    const currentPath = window.location.pathname;
    // Prevent redirect loops on the maintenance page itself, and allow access to the admin page
    if (!currentPath.endsWith('maintenance.html') && !currentPath.endsWith('admin.html')) {
      window.location.href = 'maintenance.html';
    }
  }
})();
