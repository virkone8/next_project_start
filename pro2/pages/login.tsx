import React from "react";
import styles from "@/styles/Home.module.scss";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Input,
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInputs {
  email: string;
  password: string;
}

const LoginSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  })
  .required();

const login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data));
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h2>
          <img src="./Vector.png" />
          Compsheets
        </h2>
        <div className={styles.formWrap}>
          <h1>Log in</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address*</label>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    className={styles.input}
                    placeholder="Enter Email"
                  />
                )}
                name="email"
                control={control}
                defaultValue=""
              />
              {errors.email && (
                <p className={styles.err}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password*</label>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    className={styles.input}
                    placeholder="Enter Password"
                  />
                )}
                name="password"
                control={control}
                defaultValue=""
              />
              {errors.password && (
                <p className={styles.err}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles.action}>
              <button type="submit" className="btn">
                Login
              </button>
              <span>
                or &nbsp;
                <Link className="link" href="/signup">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
