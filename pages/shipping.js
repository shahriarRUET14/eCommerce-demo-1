import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: { fullName, address, city, postalCode, country },
      })
    );
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>

        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            className="w-full"
            autoFocus
            {...register("fullName", { required: "Please enter full name" })}
          ></input>
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            className="w-full"
            autoFocus
            {...register("address", {
              required: "Please enter Address",
              minLength: {
                value: 3,
                message: "Address is more than 3 characters long",
              },
            })}
          ></input>
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            className="w-full"
            autoFocus
            {...register("city", { required: "Please enter City" })}
          ></input>
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            className="w-full"
            autoFocus
            {...register("postalCode", {
              required: "Please enter Postal Code",
            })}
          ></input>
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Coutnry</label>
          <input
            id="country"
            className="w-full"
            autoFocus
            {...register("country", { required: "Please enter Coutnry" })}
          ></input>
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
