"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField/InputField";
import Divider from "@/components/Divider/Divider";
import SocialLoginIcons from "@/components/SocialLoginIcons/SocialLoginIcons";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleLogin = async (values: typeof initialValues) => {
    setLoading(true);
    setError(null);

    try {
      const req = await axios.post(
        "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
        {
          email: values.username,
        }
      );

      setLoading(false);
      console.log(req);

      if (req?.data) {
        Cookies.set("email", values.username, { expires: 1 }); // Cookie expires in 7 days
        Cookies.set("fromChangePassword", "true", { expires: 1 }); // Cookie expires in 7 days
        router.push("/auth/verifyCode");
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
            <h1 className="mb-4 text-2xl font-bold">Forgot your password?</h1>

            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-200 border rounded">
                {error}
              </div>
            )}

            <InputField
              name="username"
              type="email"
              placeholder="Enter Email"
              error={errors.username}
              touched={touched.username}
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
