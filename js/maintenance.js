(function() {
  // MAINTENANCE MODE CONTROL
  // Set to true to redirect all traffic to maintenance.html
  // Set to false to allow normal website access
  const isMaintenanceMode = true;

  if (isMaintenanceMode) {
    const currentPath = window.location.pathname;
    // Prevent infinite redirect loops on the maintenance page itself
    if (!currentPath.endsWith('maintenance.html')) {
      window.location.href = 'maintenance.html';
    }
  }
})();
