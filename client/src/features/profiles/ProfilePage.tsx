import { Grid2 } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import { Navigate, useParams } from "react-router";
import { useProfiles } from "../../lib/hooks/useProfiles";
import ProfileContent from "./ProfileContent";
import ProfilePageSkeleton from "../../app/shared/skeletons/ProfilePageSkeleton";

export default function ProfilePage() {
    const { id } = useParams();
    const { profile, loadingProfile } = useProfiles(id);

    if (loadingProfile) return <ProfilePageSkeleton />
    if (!profile) return <Navigate to='/not-found' />

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <ProfileHeader />
                <ProfileContent />
            </Grid2>
        </Grid2>
    )
}