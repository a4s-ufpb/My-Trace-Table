import { createHashRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Teacher from "./routes/teacher/Teacher";
import Themes from "./routes/themes/Themes";
import TraceTable from "./routes/trace-table/TraceTable";
import NewExercise from "./routes/exercises/NewExercise";
import ShownTable from "./routes/trace-table/ShownTable";
import ExpectedTable from "./routes/trace-table/ExpectedTable";
import Exercises from "./routes/exercises/Exercices";
import ExerciseDetails from "./routes/exercises/ExerciseDetails";
import ExerciseSubmissions from "./routes/exercises/Submissions";
import NewTheme from "./routes/themes/NewTheme";
import NewProfessor from "./routes/Professors/NewProfessor/index";
import HelpPage from "./routes/HelpPage";
import Login from "./routes/Login";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ErrorPage from "./routes/error-page/ErrorPage";
import Profile from "./routes/Profile";
import Register from "./routes/Register/index";

const router = createHashRouter([
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />
    },
    {
        path: "/",
        element: (
            <RoleProtectedRoute>
                <RootLayout />
            </RoleProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [{
            index: true,
            element: <Home />
        }, {
            path: "profile",
            element: <Profile />
        },
        {
            path: "teacher",
            element: <Teacher />
        },
        {
            path: "themes/:id",
            element: <Themes />
        },
        {
            path: "exercices/:info",
            element: <Exercises />
        },
        {
            path: "trace-table",
            element: <TraceTable />
        },
        {
            path: "about",
            element: <About />
        }, {
            path: "new-exercise",
            element: <NewExercise />
        }, {
            path: "showntable",
            element: <ShownTable />
        }, {
            path: "expectedtable",
            element: <ExpectedTable />
        }, {
            path: "exercises/all",
            element: <Exercises />
        }, {
            path: "exercicio/:id",
            element: <ExerciseDetails />
        }, {
            path: "exercicio/:id/submissoes",
            element: (
                <RoleProtectedRoute allowedRoles={["admin", "professor"]}>
                    <ExerciseSubmissions />
                </RoleProtectedRoute>
            )
        }, {
            path: "new-theme",
            element: <NewTheme />
        }, {
            path: "help-page",
            element: <HelpPage />
        }, {
            path: "new-professor",
            element: (
                <RoleProtectedRoute allowedRoles={["admin"]}>
                    <NewProfessor />
                </RoleProtectedRoute>
            )
        }]
    }
]);

export default router
