import { useFormik } from "formik";
import { VisitInfoSchema } from "../../schemas/visitInfo";
import AddPicture from "../../components/teacher/AddPicture";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import TextArea from "../../components/Textarea";
import useYearSelectStore from "../../stores/year_select.store";
import { useAuthStore } from "../../stores/auth.store";
import { useNavigate } from "react-router";
import { useVisitInfoStore } from "../../stores/visit.store";
import { useStudentStore } from "../../stores/student.store";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const AddVisitInfo = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { userInfo } = useAuthStore();
  const { selectedYear } = useYearSelectStore();
  const { student, getStudentById } = useStudentStore();

  const { visitInfo, addVisitInfo, getVisitInfoByStudentId, updateVisitInfo } =
    useVisitInfoStore();
  const [pictureFile, setPictureFile] = useState({
    home_img: null,
    family_img: null,
  });

  const handleChangePicture = (e) => {
    const file = e.target.files[0];
    const field = e.target.id; // ใช้ id เพื่อรู้ว่าเป็น home_img หรือ family_img
    if (file) {
      setPictureFile((prev) => ({
        ...prev,
        [field]: file,
      }));
      // set ค่าใน formik ด้วย
      formik.setFieldValue(field, file);
    } else {
      setPictureFile((prev) => ({
        ...prev,
        [field]: null,
      }));
      formik.setFieldValue(field, null);
    }
    if (file && file.size > 5 * 1024 * 1024) {
      alert("ไฟล์เกิน 5MB");
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      home_img: null,
      family_img: null,
      home_description: visitInfo?.home_description || "",
      family_description: visitInfo?.family_description || "",
      comment: visitInfo?.comment || "",
      student_id: studentId,
      teacher_id: userInfo._id,
      year_id: selectedYear,
    },
    validationSchema: VisitInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      console.log("values:", values);
      
      const formData = new FormData();
      if (pictureFile.home_img) {
        formData.append("home_img", pictureFile.home_img); // ไฟล์
      }
      if (pictureFile.family_img) {
        formData.append("family_img", pictureFile.family_img); // ไฟล์
      }
      formData.append("home_description", values.home_description);
      formData.append("family_description", values.family_description);
      formData.append("comment", values.comment);
      formData.append("student_id", values.student_id);
      formData.append("teacher_id", values.teacher_id);
      formData.append("year_id", values.year_id);

      if (visitInfo) {
        formData.append("visit_info_id", visitInfo._id);
        await updateVisitInfo(formData);
   } else {
    console.log(formData);
    
        await addVisitInfo(formData).then(() => {
          setTimeout(() => {
            // window.location.reload();
          }, 2600);
        });
      }
    },
  });

  useEffect(() => {
    // รีเซ็ตค่า formik ทุกครั้งเพราะว่า ต้องการโหลดข้อมูลใหม่ เพราะ state มันยังไม่เปลี่ยน ตามปีที่เราเลือก
    formik.setValues(formik.initialValues);
    const fetchData = async () => {
      const res = await getVisitInfoByStudentId(studentId, selectedYear);
      if (res) {
        formik.setValues({
          home_img: res.home_img || null,
          family_img: res.family_img || null,
          home_description: res.home_description || "",
          family_description: res.family_description || "",
          comment: res.comment || "",
          student_id: studentId,
          teacher_id: userInfo._id,
          year_id: selectedYear,
        });
      }
      getStudentById(studentId);
    };

    fetchData();
  }, [studentId, selectedYear]);

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
              pictureFile={pictureFile.home_img || visitInfo?.home_img}
              file={pictureFile.home_img}
              setPictureFile={setPictureFile}
            />

            <TextArea
              name="home_description"
              placeholder="คำอธิบายภาพ"
              label="คำอธิบายภาพ"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.home_description}
              error={formik.errors.home_description}
              touched={formik.touched.home_description}
              className="w-full"
              onBlur={formik.handleBlur}
              id="add-home-pic-desc"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-4 space-y-4">
            <h3 className="mb-2">รูปถ่ายกับครอบครัว</h3>
            <AddPicture
              id="family_img"
              onChange={handleChangePicture}
              pictureFile={pictureFile.family_img || visitInfo?.family_img}
              setPictureFile={setPictureFile}
              file={pictureFile.family_img}
            />
            <TextArea
              name="family_description"
              placeholder="คำอธิบายภาพ"
              label="คำอธิบายภาพ"
              type="text"
              className="w-full"
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
          <button
            type="button"
            onClick={() => navigate("/teacher/students")}
            className={visitInfo ? "hidden" : "btn-red mr-4"}
          >
            ยกเลิก
          </button>
          <button
            id="submit-visithome-button"
            type="submit"
            className={visitInfo ? "btn-yellow" : "btn-green"}
          >
            {visitInfo ? "แก้ไขข้อมูล" : "บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisitInfo;
