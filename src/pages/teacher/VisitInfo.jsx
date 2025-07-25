import { useState } from "react";
import AddPicture from "../../components/teacher/AddPicture";
import TextInput from "../../components/modals/TexInputInModal";
import TextArea from "../../components/TextArea";
import TeacherService from "../../services/teacher/teacher.service";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

const VisitResult = () => {
  const location = useLocation();
  const student = location.state?.student;
  if (!student) return null; 
  const [homepicture, setHomePicture] = useState(null);
  const [familypicture, setFamilyPicture] = useState(null);

  const handleAddHome = () => {
    const input = document.getElementById("addhomepic");
    input.click();
  };
  const handleAddFamily = () => {
    const input = document.getElementById("addfamilypic");
    input.click();
  };
  const handleSubmit = async () => {
    try {
      const response = await TeacherService.addVisitInfo({
        homePicture: homepicture,
        familyPicture: familypicture,

      });
    } catch (error) {}
  };

  return (
    <div className="section-c">
      <div className="flex justify-center items-center mt-4">
        <h5 className="font-semibold">
          ข้อมูลของ <span>{student.prefix}</span> <span>{student.first_name}</span> <span>{student.last_name}</span>
        </h5>
      </div>

      {/* ปรับแก้ตรงนี้: ลบ md:flex ออก เพื่อให้ Stack แนวตั้งบนมือถือ และเพิ่ม flex-col พร้อม justify-center, items-center */}
      <div className="flex flex-col justify-center items-center mx-auto w-8/12 md:flex-row md:justify-between">
        {/* ส่วนปุ่มเพิ่มรูปภาพบ้านกับรูปภาพนักเรียน */}
        <div className="flex flex-col justify-center items-center mt-4 space-y-4">
          <h3 className="mb-2">รูปถ่ายสภาพบ้าน</h3>
          <AddPicture
            set={setHomePicture}
            get={homepicture}
            onClick={handleAddHome}
            id={"addhomepic"}
          />
          <TextInput
            name="discription"
            placeholder="คำอธิบายภาพ"
            label="คำอธิบายภาพ"
            type="text"
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-4 space-y-4">
          <h3 className="mb-2">รูปถ่ายกับครอบครัว</h3>
          <AddPicture
            set={setFamilyPicture}
            get={familypicture}
            onClick={handleAddFamily}
            id={"addfamilypic"}
          />
          <TextInput
            name="discription"
            placeholder="คำอธิบายภาพ"
            label="คำอธิบายภาพ"
            type="text"
          />
        </div>
      </div>

      {/* เพิ่ม flex justify-center สำหรับ TextArea */}
      <div className="flex flex-col justify-center items-center mt-4 m-2 space-y-4">
        <TextArea
          label="ความคิดเห็นของอาจารย์"
          placeholder="กรอกความคิดเห็นของอาจารย์"
          name="teacherComment"
          className="w-full md:w-8/12" 
        />
      </div>

     
      <div className="flex justify-center md:justify-end mr-6 my-4">
        <button className="btn-red mr-8">ยกเลิก</button>
        <button className="btn-green">บันทึก</button>
      </div>
    </div>
  );
};

export default VisitResult;