"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EyeIcon from "../../../../public/authIcons/eyePassword.svg";
import InputField from "@/components/InputField/InputField";
import Divider from "@/components/Divider/Divider";
import SocialLoginIcons from "@/components/SocialLoginIcons/SocialLoginIcons";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values: typeof initialValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        userName: values.username,
        password: values.password,
      });

      setLoading(false);

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="w-full max-w-sm p-6 mb-12">
            <h1 className="mb-4 text-2xl font-bold">Sign In</h1>

            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-200 border rounded">
                {error}
              </div>
            )}

            <InputField
              name="username"
              type="text"
              placeholder="Enter Email"
              error={errors.username}
              touched={touched.username}
            />

            <InputField
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
              Icon={<EyeIcon />}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />

            <Link
              href="/auth/forgetPassword"
              className="text-end block text-primary50 text-sm mb-9 select-none cursor-pointer"
            >
              Recover Password?
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full py-4 text-white bg-primary50 rounded-2xl hover:bg-primary text-sm mb-6"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <Divider text="Or Continue with" />

            <SocialLoginIcons />
          </Form>
        )}
      </Formik>
    </div>
  );
}
