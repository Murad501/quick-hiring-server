import Application from "../applications/application.model";
import Job from "../jobs/job.model";

const getOverviewStats = async () => {
  const [totalJobs, totalApplications, newCandidates] = await Promise.all([
    Job.countDocuments(),
    Application.countDocuments(),
    Application.countDocuments({ status: "new" }),
  ]);

  return {
    totalJobs,
    totalApplications,
    newCandidates,
  };
};

export const adminService = {
  getOverviewStats,
};
