import { useState } from "react";
import AddPicture from "../../components/teacher/AddPicture";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import TextInput from "../../components/modals/TexInputInModal";
import Textarea from "../../components/Textarea";
import TeacherService from "../../services/teacher/teacher.service";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const VisitResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;
  if (!student) return null;
  const [addVisitInfo, setAddVisitInfo] = useState({
    homePicture: null,
    familyPicture: null,
    des_home: "",
    des_family: "",
    teacher_comment: "",
  });

  const handleChangeHomePicture = (e) => {
    const file = e.target.files[0];
    setAddVisitInfo((prev) => ({ ...prev, homePicture: file }));
  };
  const handleChangeFamilyPicture = (e) => {
    const file = e.target.files[0];
    setAddVisitInfo((prev) => ({ ...prev, familyPicture: file }));
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setAddVisitInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", addVisitInfo.homePicture);
      const res = await TeacherService.addVisitInfo(formData);
      // const response = await TeacherService.addVisitInfo({
      //   home_Picture: addVisitInfo.homePicture,
      //   family_Picture: addVisitInfo.familyPicture,
      //   desc_home: addVisitInfo.des_home,
      //   desc_family: addVisitInfo.des_family,
      //   teacher_comment: addVisitInfo.teacher_comment,
      // });
      toast.success("เพิ่มข้อมูลการเยี่ยมบ้านเรียบร้อยแล้ว");
      window.location.reload();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูลการเยี่ยมบ้าน");
    }
  };

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
      <form onSubmit={handleSubmit}>
        {/* ปรับแก้ตรงนี้: ลบ md:flex ออก เพื่อให้ Stack แนวตั้งบนมือถือ และเพิ่ม flex-col พร้อม justify-center, items-center */}
        <div className="flex flex-col justify-center items-center mx-auto w-8/12 md:flex-row md:justify-between">
          {/* ส่วนปุ่มเพิ่มรูปภาพบ้านกับรูปภาพนักเรียน */}
          <div className="flex flex-col justify-center items-center mt-4 space-y-4">
            <h3 className="mb-2">รูปถ่ายสภาพบ้าน</h3>
            <AddPicture
              onChange={handleChangeHomePicture}
              get={addVisitInfo.homePicture}
              id={"addhomepic"}
            />

            <TextInput
              name="des_home"
              placeholder="คำอธิบายภาพ"
              label="คำอธิบายภาพ"
              type="text"
              onChange={handleChangeDescription}
              value={addVisitInfo.des_home}
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-4 space-y-4">
            <h3 className="mb-2">รูปถ่ายกับครอบครัว</h3>
            <AddPicture
              onChange={handleChangeFamilyPicture}
              get={addVisitInfo.familyPicture}
              id={"addfamilypic"}
            />
            <TextInput
              name="des_family"
              placeholder="คำอธิบายภาพ"
              label="คำอธิบายภาพ"
              type="text"
              onChange={handleChangeDescription}
              value={addVisitInfo.des_family}
            />
          </div>
        </div>

        {/* เพิ่ม flex justify-center สำหรับ TextArea */}
        <div className="flex flex-col justify-center items-center mt-4 m-2 space-y-4">
          <Textarea
            label="ความคิดเห็นของอาจารย์"
            placeholder="กรอกความคิดเห็นของอาจารย์"
            name="teacher_comment"
            className="w-full md:w-8/12"
            onChange={handleChangeDescription}
            value={addVisitInfo.teacher_comment}
          />
        </div>

        <div className="flex justify-center md:justify-end ml-6 md:mx-50">
          <button type="button" onClick={() => navigate(-1)} className="btn-red mr-8">ยกเลิก</button>
          <button type="submit" className="btn-green">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitResult;
