import { useFormik } from "formik";
import { VisitInfoSchema } from "../../schemas/visitInfo";
import AddPicture from "../../components/teacher/AddPicture";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import TextInput from "../../components/modals/TexInputInModal";
import TextArea from "../../components/TextArea";
import useYearSelectStore from "../../stores/year_select.store";
import { useAuthStore } from "../../stores/auth.store";

import { useVisitInfoStore } from "../../stores/visit.store";
import { useStudentStore } from "../../stores/student.store";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const AddVisitInfo = () => {
  const { studentId } = useParams();
  const { userInfo } = useAuthStore();
  const { years: year, selectedYear, getYearById } = useYearSelectStore();
  const { student, getStudentById } = useStudentStore();
  const { addVisitInfo } = useVisitInfoStore();
  const { pictureFile, setPictureFile } = useState(null);

  useEffect(() => {
    getStudentById(studentId);
  }, [studentId]);

  const handleChangePicture = (e) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      formik.setFieldValue(id, file);
      setPictureFile(URL.createObjectURL(file));
    }
  };

  const formik = useFormik({
    initialValues: {
      home_img: null,
      family_img: null,
      home_description: "",
      family_description: "",
      comment: "",
      student_id: studentId,
      teacher_id: userInfo._id,
      year_id: selectedYear,
    },
    validationSchema: VisitInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      await addVisitInfo(values);
      actions.resetForm();
    },
  });
  //     e.preventDefault();

  //     try {
  //       const formData = new FormData();

  //       // แนบไฟล์
  //       if (addVisitInfo.homePicture) {
  //         formData.append("home_picture", addVisitInfo.homePicture);
  //       }
  //       if (addVisitInfo.familyPicture) {
  //         formData.append("family_picture", addVisitInfo.familyPicture);
  //       }

  //       formData.append("desc_home", addVisitInfo.des_home || "");
  //       formData.append("desc_family", addVisitInfo.des_family || "");
  //       formData.append("teacher_comment", addVisitInfo.teacher_comment || "");

  //       formData.append("student_id", student._id);
  //       formData.append("teacher_id", userInfo._id);
  //       formData.append("year_id", year._id);

  //       const response = await TeacherService.addVisitInfo(formData);
  //       if (response.status === 200) {
  //         toast.success("เพิ่มข้อมูลการเยี่ยมบ้านเรียบร้อยแล้ว");
  //       }
  //     } catch (error) {
  //       console.error("Error add visit info:", error);
  //       toast.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูลการเยี่ยมบ้าน");
  //     }
  //   };

  return (
    <div className="section-container">
      <div>
        <BreadcrumbsLoop
          options={[
            { label: "หน้าหลัก", link: "/" },
            { label: "ข้อมูลการเยี่ยมบ้าน", link: "/admin/year/classroom" },
          ]}
        />
      </div>
      <div className="flex justify-center items-center mt-4">
        <h5 className="font-semibold">
          ข้อมูลของ <span>{student.prefix}</span>{" "}
          <span>{student.first_name}</span> <span>{student.last_name}</span>
        </h5>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* ปรับแก้ตรงนี้: ลบ md:flex ออก เพื่อให้ Stack แนวตั้งบนมือถือ และเพิ่ม flex-col พร้อม justify-center, items-center */}
        <div className="flex flex-col justify-center items-center mx-auto w-8/12 md:flex-row md:justify-between">
          {/* ส่วนปุ่มเพิ่มรูปภาพบ้านกับรูปภาพนักเรียน */}
          <div className="flex flex-col justify-center items-center mt-4 space-y-4">
            <h3 className="mb-2">รูปถ่ายสภาพบ้าน</h3>
            <AddPicture
              id="home_img"
              onChange={handleChangePicture}
              pictureFile={formik.values.home_img}
            />

            <TextInput
              name="home_description"
              placeholder="คำอธิบายภาพ"
              label="คำอธิบายภาพ"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.home_description}
              error={formik.errors.home_description}
              touched={formik.touched.home_description}
              onBlur={formik.handleBlur}
              id="add-home-pic-desc"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-4 space-y-4">
            <h3 className="mb-2">รูปถ่ายกับครอบครัว</h3>
            <AddPicture
              id="family_img"
              onChange={handleChangePicture}
              pictureFile={formik.values.family_img}
            />
            <TextInput
              name="family_description"
              placeholder="คำอธิบายภาพ"
              label="คำอธิบายภาพ"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.family_description}
              error={formik.errors.family_description}
              touched={formik.touched.family_description}
              onBlur={formik.handleBlur}
              id="add-family-pic-desc"
            />
          </div>
        </div>

        {/* เพิ่ม flex justify-center สำหรับ TextArea */}
        <div className="flex flex-col justify-center items-center mt-4 m-2 space-y-4">
          <TextArea
            label="ความคิดเห็นของอาจารย์"
            placeholder="กรอกความคิดเห็นของอาจารย์"
            name="comment"
            className="w-full md:w-8/12"
            onChange={formik.handleChange}
            value={formik.values.comment}
            error={formik.errors.comment}
            touched={formik.touched.comment}
            onBlur={formik.handleBlur}
            id="teacher-comment"
          />
        </div>

        <div className="flex justify-center md:justify-end ml-6 md:mx-50">
          <button type="button" className="btn-red mr-8">
            ยกเลิก
          </button>
          <button
            id="submit-visithome-button"
            type="submit"
            className="btn-green"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisitInfo;
