import React from "react";
import { useFormik } from "formik";
import Personal from "./Personal";
import Relation from "./Relation";
import Family from "./Family";
import Behavior from "./Behavior";
import Risk from "./Risk";
import Other from "./Other";
import {
  initialFormValues,
  formValidation,
} from "../../../schemas/form.schema";
import { useParams } from "react-router";
import { useStudentFormStore } from "../../../stores/form.store";
import { useAuthStore } from "../../../stores/auth.store";

const Index = () => {
  const [page, setPage] = React.useState(1);
  const [image, setImage] = React.useState(null);

  const handleSetImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const { yearId } = useParams();
  const { setFormData, submitForm } = useStudentFormStore();
  const { userInfo } = useAuthStore();

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: formValidation,
    onSubmit: (values) => {
      console.log(values);
      submitForm(userInfo?._id, yearId, values);
    },
  });

  React.useEffect(() => {
    setFormData(formik?.values, yearId);
  }, [formik?.values, yearId]);

  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {page === 1 ? (
          <Personal
            page={page}
            setPage={setPage}
            formik={formik}
            image={image}
            handleSetImage={handleSetImage}
          />
        ) : page === 2 ? (
          <Relation page={page} setPage={setPage} formik={formik} />
        ) : page === 3 ? (
          <Family page={page} setPage={setPage} formik={formik} />
        ) : page === 4 ? (
          <Behavior page={page} setPage={setPage} formik={formik} />
        ) : page === 5 ? (
          <Risk page={page} setPage={setPage} formik={formik} />
        ) : (
          <Other page={page} setPage={setPage} formik={formik} />
        )}
      </form>
    </div>
  );
};

export default Index;
