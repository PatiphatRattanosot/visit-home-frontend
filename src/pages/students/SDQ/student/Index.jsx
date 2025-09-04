import React from "react";
import { useFormik } from "formik";
import Emotional from "./Emotional";
import Behavioral from "./Behavioral";
import Hyperactivity from "./Hyperactivity";
import Friendship from "./Friendship";
import Social from "./Social";
import Additional from "./Additional";

const Index = () => {
  const [page, setPage] = React.useState(1);

  const formik = useFormik({
    initialValues: {
      // Define your initial form values here
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {page === 1 && <Emotional setPage={setPage} page={page} />}
        {page === 2 && <Behavioral setPage={setPage} page={page} />}
        {page === 3 && <Hyperactivity setPage={setPage} page={page} />}
        {page === 4 && <Friendship setPage={setPage} page={page} />}
        {page === 5 && <Social setPage={setPage} page={page} />}
        {page === 6 && <Additional setPage={setPage} page={page} />}
      </form>
    </div>
  );
};

export default Index;
