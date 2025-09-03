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
      const personal_info = {
        phone: values.phone,
        father_prefix: values.father_prefix,
        father_name: values.father_name,
        father_last_name: values.father_last_name,
        father_phone: values.father_phone,
        father_job: values.father_job,
        mother_prefix: values.mother_prefix,
        mother_name: values.mother_name,
        mother_last_name: values.mother_last_name,
        mother_phone: values.mother_phone,
        mother_job: values.mother_job,
        parent_prefix: values.parent_prefix,
        parent_name: values.parent_name,
        parent_last_name: values.parent_last_name,
        parent_phone: values.parent_phone,
        parent_job: values.parent_job,
        lat: values.lat,
        lng: values.lng,
      };
      const relationship_info = {
        family_relation_status: values.family_relation_status,
        family_member: values.family_member,
        family_time: values.family_time,
        father_relation: values.father_relation,
        mother_relation: values.mother_relation,
        big_brother_relation: values.big_brother_relation,
        lil_brother_relation: values.lil_brother_relation,
        big_sister_relation: values.big_sister_relation,
        lil_sister_relation: values.lil_sister_relation,
        grandparent_relation: values.grandparent_relation,
        relative_relation: values.relative_relation,
      };
      const family_info = {
        total_household_income: values.total_household_income,
        received_daily_from: values.received_daily_from,
        daily_total_to_school: values.daily_total_to_school,
        student_part_time: values.student_part_time,
        student_income: values.student_income,
        household_burdens: values.household_burdens,
        housing_type: values.housing_type,
        housing_condition: values.housing_condition,
        family_vehicles: values.family_vehicles,
        owned_land: values.owned_land,
        rented_land: values.rented_land,
      };
      const behavior_info = {
        student_resp: values.student_resp,
        other_student_resp: values.other_student_resp,
        hobbies: values.hobbies,
        other_hobbies: values.other_hobbies,
        drugs_behav: values.drugs_behav,
        violent_behav: values.violent_behav,
        other_violent_behav: values.other_violent_behav,
        sexual_behav: values.sexual_behav,
        computer_internet_access: values.computer_internet_access,
        tech_use_behav: values.tech_use_behav,
        gaming_behav: values.gaming_behav,
        other_gaming_behav: values.other_gaming_behav,
      };
      const risk_info = {
        when_student_alone: values.when_student_alone,
        health_risk: values.health_risk,
        welfare_and_safety: values.welfare_and_safety,
        distance_to_school: values.distance_to_school,
        time_used: values.time_used,
        school_transport: values.school_transport,
      };
      const additional_info = {
        support_from_organize: values.support_from_organize,
        support_from_school: values.support_from_school,
        parent_concern: values.parent_concern,
      };
      submitForm(userInfo?._id, yearId, {
        personal_info,
        relationship_info,
        family_info,
        behavior_info,
        risk_info,
        additional_info,
      });
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
