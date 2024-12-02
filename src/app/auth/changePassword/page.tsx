"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField/InputField";
import Divider from "@/components/Divider/Divider";
import SocialLoginIcons from "@/components/SocialLoginIcons/SocialLoginIcons";
import axios from "axios";
import { useRouter } from "next/navigation";
import EyeIcon from "../../../../public/authIcons/eyePassword.svg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    rePassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-zA-Z]*@[0-9]+$/,
        "Password must start with a capital letter, followed by letters, an '@' symbol, and digits."
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleLogin = async (values: typeof initialValues) => {
    setLoading(true);
    setError(null);

    try {
      const req = await axios.put(
        "https://exam.elevateegy.com/api/v1/auth/resetPassword",
        {
          email: Cookies.get("email"),
          newPassword: values.password,
        }
      );

      setLoading(false);
      console.log(req);

      if (req?.data) {
        toast.success("Password updated successfully. Please login again.");
        router.push("/auth/login");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.message);
      console.log(err);
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
            <h1 className="mb-4 text-2xl font-bold">Set a Password</h1>

            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-200 border rounded">
                {error}
              </div>
            )}

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

            <InputField
              name="rePassword"
              type="password"
              placeholder="Confirm Password"
              error={errors.rePassword}
              touched={touched.rePassword}
              Icon={<EyeIcon />}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />

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
