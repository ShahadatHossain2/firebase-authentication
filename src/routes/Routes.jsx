import { createBrowserRouter } from "react-router";
import Root from "../components/root/Root";
import Home from "../components/home/Home";
import SignUp from "../signUp/SignUp";
import EmailSignUp from "../components/emailLogin/EmailSignUp";
import EmailSignIn from "../components/emailLogin/EmailSignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "signUp",
        Component: SignUp,
      },
      {
        path: "emailSignUp",
        Component: EmailSignUp,
      },
      {
        path: "emailSignIn",
        Component: EmailSignIn,
      },
    ],
  },
]);
