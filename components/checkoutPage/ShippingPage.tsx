import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "./ShippingInput";
import { countries } from "./countries";
import SingularSelect from "./SingularSelect";
import { saveAddress } from "../../request/user";

const initialValue = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    country: "",
};

const ShippingPage = ({ user, selectedAddress, setSelectedAddress }: any) => {
    const [addresses, setAddresses] = useState(user?.addresses || []);
    const [shipping, setShipping] = useState(initialValue);

    const {
        firstName,
        lastName,
        phoneNumber,
        state,
        city,
        zipCode,
        address1,
        address2,
        country,
    } = shipping;

    const validate = Yup.object({
        firstName: Yup.string()
            .required("First Name is required.")
            .min(3, "First Name must be atleast 3 charactes")
            .max(20, "First Name must be less than 20 charactes"),
        lastName: Yup.string()
            .required("Phone Number is required")
            .min(3, "Last Name must be atleast 3 charactes")
            .max(20, "Last Name must be less than 20 charactes"),
        phoneNumber: Yup.string()
            .required("First Name is required.")
            // .phone()
            .min(3, "First Name must be atleast 3 charactes")
            .max(20, "First Name must be less than 20 charactes"),
        state: Yup.string()
            .required("State is required.")
            .min(2, "State must be atleast 2 charactes")
            .max(60, "State must be less than 60 charactes"),
        city: Yup.string()
            .required("City Name is required.")
            .min(2, "City Name must be atleast 2 charactes")
            .max(60, "City Name must be less than 60 charactes"),
        zipCode: Yup.string()
            .required("Zip Code/Postal is required.")
            .min(2, "Zip Code/Postal must be atleast 2 charactes")
            .max(30, "Zip Code/Postal must be less than 30 charactes"),
        address1: Yup.string()
            .required("Address 2 is required.")
            .min(5, "Address 2 must be atleast 5 charactes")
            .max(100, "Address 2 must be less than 100 charactes"),
        address2: Yup.string()
            .min(5, "Address 2 must be atleast 5 charactes")
            .max(100, "Address 2 must be less than 100 charactes"),
        country: Yup.string()
            .required("Country Name is required.")
            .min(2, "Country Name must be atleast 2 charactes")
            .max(30, "Country Name must be less than 30 charactes"),
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value });
    };

    const submitHandler = async () => {
        const res = await saveAddress(shipping, user._id);
        setAddresses([...addresses, res]);
        setSelectedAddress(res);
    };

    return (
        <div className="flex flex-col md:flex-row px-2 py-8 md:px-8 gap-4">
            <div className="md:w-1/2">
                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName,
                        lastName,
                        phoneNumber,
                        state,
                        city,
                        zipCode,
                        address1,
                        address2,
                        country,
                    }}
                    validationSchema={validate}
                    onSubmit={() => submitHandler()}
                >
                    {(formik) => (
                        <Form className="grid grid-cols-1 gap-6">
                            <SingularSelect
                                name="country"
                                value={country}
                                placeholder="*Country"
                                handleChange={handleChange}
                                data={countries}
                            />
                            <div className="grid md:grid-cols-2 gap-6">
                                <ShippingInput
                                    type="text"
                                    name="firstName"
                                    placeholder="*First Name"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    type="text"
                                    name="lastName"
                                    placeholder="*Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <ShippingInput
                                    type="text"
                                    name="state"
                                    placeholder="*State / Province"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    type="text"
                                    name="city"
                                    placeholder="*City"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <ShippingInput
                                    type="text"
                                    name="zipCode"
                                    placeholder="*Zip Code"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="*Phone Number"
                                    onChange={handleChange}
                                />
                            </div>
                            <ShippingInput
                                type="text"
                                name="address1"
                                placeholder="*Address 1"
                                onChange={handleChange}
                            />
                            <ShippingInput
                                type="text"
                                name="address2"
                                placeholder="*Address 2"
                                onChange={handleChange}
                            />
                            <button type="submit" className={`mb-4 mx-3 py-4 rounded-xl bg-amazon-orange text-amazon-blue_dark font-bold bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark  hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-300  `}>Save Address</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ShippingPage;
