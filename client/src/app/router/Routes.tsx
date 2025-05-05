import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../features/account/RegisterForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import RoomDashboard from "../../features/rooms/RoomDashboard";
import LaundryDashboard from "../../features/laundry/LaundryDashboard";
import RequestDashboard from "../../features/requests/RequestDashboard";
import UsersPage from "../../features/users/UsersPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'activities', element: <ActivityDashboard /> },
                    { path: 'activities/:id', element: <ActivityDetailPage /> },
                    { path: 'createActivity', element: <ActivityForm key='create' /> },
                    { path: 'register', element: <RegisterForm /> }, //Els admins registren a les persones
                    { path: 'manage/:id', element: <ActivityForm /> },
                    { path: 'profiles/:id', element: <ProfilePage /> },
                    { path: 'rooms', element: <RoomDashboard /> },
                    { path: 'laundry', element: <LaundryDashboard /> },
                    { path: 'requests', element: <RequestDashboard /> },
                    { path: 'users', element: <UsersPage /> }
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'login', element: <LoginForm /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])