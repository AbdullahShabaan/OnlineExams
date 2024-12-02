"use client";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField/InputField";
import Divider from "@/components/Divider/Divider";
import SocialLoginIcons from "@/components/SocialLoginIcons/SocialLoginIcons";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const fromChangePassword = Cookies.get("fromChangePassword");

    if (fromChangePassword !== "true") {
      router.replace("/auth/forgetPassword"); // Redirect to Change Password
    }
  }, [router]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const reSendCode = async () => {
    try {
      const req = await axios.post(
        "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
        {
          email: Cookies.get("email"),
        }
      );

      setLoading(false);
      console.log(req);

      if (req?.data) {
        toast.success("code resend successfully");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.message);
      console.log(err);
    }
  };
  const initialValues = {
    resetCode: "",
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^\d+$/, "Reset code must contain only numbers")
      .length(6, "Reset code must be exactly 6 digits")
      .required("Reset code is required"),
  });

  const handleLogin = async (values: typeof initialValues) => {
    setLoading(true);
    setError(null);

    try {
      const req = await axios.post(
        "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
        {
          resetCode: values.resetCode,
        }
      );

      setLoading(false);
      console.log(req);

      if (req?.data) {
        Cookies.set("fromResetCode", "true");
        router.push("/auth/changePassword");
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
            <h1 className="mb-4 text-2xl font-bold">Verify code</h1>

            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-200 border rounded">
                {error}
              </div>
            )}

            <InputField
              name="resetCode"
              type="text"
              placeholder="Enter code"
              error={errors.resetCode}
              touched={touched.resetCode}
            />

            <p
              className="text-end  text-sm mb-9 select-none cursor-pointer"
              onClick={() => {
                reSendCode();
              }}
            >
              Didn’t receive a code?{" "}
              <span className="text-primary50">Resend</span>
            </p>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full py-4 text-white bg-primary50 rounded-2xl hover:bg-primary text-sm mb-6"
            >
              {loading ? "Verifying ..." : "Verify"}
            </button>

            <Divider text="Or Continue with" />

            <SocialLoginIcons />
          </Form>
        )}
      </Formik>
    </div>
  );
}
