import { Navigate, Outlet, useLocation, useParams } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";
import ActivityDetailSkeleton from "../shared/skeletons/ActivityDetailSkeleton";
import ActivitiesDashboardSkeleton from "../shared/skeletons/ActivitiesDashboardSkeleton";
import LaundrySkeleton from "../shared/skeletons/LaundrySkeleton";
import RoomsPageSkeleton from "../shared/skeletons/RoomsPageSkeleton";
import RequestPageSkeleton from "../shared/skeletons/RequestPageSkeleton";
import UsersSkeleton from "../shared/skeletons/UsersSkeleton";

export default function RequireAuth() {
  const { currentUser, loadingUserInfo } = useAccount();
  const { id } = useParams();

  const location = useLocation();

  if (loadingUserInfo)
    switch (location.pathname) {
      case '/activities':
        return <ActivitiesDashboardSkeleton />
      case `/activities/${id}`:
        return <ActivityDetailSkeleton />
      case '/laundry':
        return <LaundrySkeleton />
      case '/rooms':
        return <RoomsPageSkeleton />
      case '/users':
        return <UsersSkeleton />
      case '/requests':
        return <RequestPageSkeleton />
      default:
        return <Typography>Loading...</Typography>
    }
  
  if (!currentUser) return <Navigate to='/login' state={{ from: location }} />

  return (
    <Outlet />
  )
}