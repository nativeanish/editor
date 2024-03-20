import { NextUIProvider } from "@nextui-org/react";
import WEditor from "./Page/WEditor";
import {
  // RouterProvider,
  // createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Index from "./Page/Index";
import OnBoard from "./Page/Onboard";
import Loading from "./Component/Template/Loading";
import Header from "./Component/Base/Header";
import Dashboard from "./Page/Dashboard";
import User from "./Page/User";
import Articles from "./Page/Articles";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <Header />
//         <Index />
//       </>
//     ),
//   },
//   {
//     path: "/onboard",
//     element: <OnBoard />,
//   },
//   {
//     path: "/e/@/:username/:head",
//     element: (
//       <>
//         <Header />
//         <div className="container mx-auto mt-4">
//           <WEditor />
//         </div>
//       </>
//     ),
//   },
//   {
//     path: "/@/:username",
//     element: (
//       <>
//         <Header />
//         <User />
//       </>
//     ),
//   },
//   {
//     path: "/@/:username/:title",
//     element: (
//       <>
//         <Header />
//         <Articles />
//       </>
//     ),
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <>
//         <Header />
//         <Dashboard />
//       </>
//     ),
//   },
// ]);
function App() {
  return (
    <>
      <NextUIProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Index />{" "}
                </>
              }
            />
            <Route path="/onboard" element={<OnBoard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/e/@/:username/:head"
              element={
                <>
                  <Header />
                  <div className="container mx-auto mt-4">
                    <WEditor />
                  </div>
                </>
              }
            />
            <Route
              path="/@/:username"
              element={
                <>
                  <Header />
                  <User />
                </>
              }
            />
            <Route
              path="/@/:username/:title"
              element={
                <>
                  <Header />
                  <Articles />
                </>
              }
            />
            <Route path="*" element={<h1>YOu are in 404 Page</h1>} />
          </Routes>
        </Router>
        <Loading />
      </NextUIProvider>
    </>
  );
}

export default App;
