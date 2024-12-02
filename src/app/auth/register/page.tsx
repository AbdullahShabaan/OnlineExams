"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EyeIcon from "../../../../public/authIcons/eyePassword.svg";
import InputField from "@/components/InputField/InputField";
import Divider from "@/components/Divider/Divider";
import SocialLoginIcons from "@/components/SocialLoginIcons/SocialLoginIcons";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    firstName: Yup.string()
      .required("Email is required")
      .matches(/^[A-Za-z]+$/, "First name must contain only letters")
      .min(4, "username must be at least 4 characters")
      .max(25, "username must be maximum 25 characters"),
    lastName: Yup.string()
      .required("Email is required")
      .matches(/^[A-Za-z]+$/, "First name must contain only letters"),
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
      const req = await axios.post(
        "https://exam.elevateegy.com/api/v1/auth/signup",

        {
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.username,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone,
        }
      );

      setLoading(false);
      if (req?.data) {
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
            <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>

            {error && (
              <div className="p-3 mb-4 text-red-700 bg-red-200 border rounded">
                {error}
              </div>
            )}

            <InputField
              name="firstName"
              type="text"
              placeholder="First Name"
              error={errors.firstName}
              touched={touched.firstName}
            />
            <InputField
              name="lastName"
              type="text"
              placeholder="Last Name"
              error={errors.lastName}
              touched={touched.lastName}
            />

            <InputField
              name="username"
              type="email"
              placeholder="Email"
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
            <InputField
              name="phone"
              type="tel"
              placeholder="Enter Your Phone Number"
              error={errors.phone}
              touched={touched.phone}
            />

            <p className="text-end  text-sm mb-9 select-none cursor-pointer">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary50">
                Login
              </Link>
            </p>

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
