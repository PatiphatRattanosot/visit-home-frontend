import SDQRadio from "../../components/SDQRadio";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import { useFormik } from "formik";
import { useAuthStore } from "../../stores/auth.store";
import { SDQInitValues, SDQValidations } from "../../schemas/sdq";

const SDQFormStudent = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    initialValues,
  } = useFormik({
    initialValues: SDQInitValues,
    validationSchema: SDQValidations,
  });

  const { userInfo } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <BreadcrumbsLoop
          options={[
            { link: "/student", label: "หน้าแรก" },
            { label: "แบบประเมิน SDQ ของนักเรียน" },
          ]}
        />

        <form onSubmit={handleSubmit}>
          <h3 className="text-center text-xl font-bold text-gray-600">
            แบบประเมิน SDQ ของนักเรียน
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-8">
            {/* 1 */}
            <SDQRadio
              label={"1.ฉันพยายามจะทำตัวดีกับคนอื่น ฉันใส่ใจความรู้สึกคนอื่น"}
              name={"question_1"}
              value={values.question_1}
              touched={touched.question_1}
              error={errors.question_1}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 2 */}
            <SDQRadio
              label={"2.ฉันอยู่ไม่นิ่ง ฉันนั่งนานๆ ไม่ได้"}
              name={"question_2"}
              value={values.question_2}
              touched={touched.question_2}
              error={errors.question_2}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 3 */}
            <SDQRadio
              label={"3.ฉันปวดศีรษะ ปวดท้อง หรือไม่สบายบ่อยๆ"}
              name={"question_3"}
              value={values.question_3}
              touched={touched.question_3}
              error={errors.question_3}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 4 */}
            <SDQRadio
              label={
                "4.ฉันเต็มใจแบ่งปันสิ่งของให้คนอื่น (ของกิน เกม ปากกา เป็นต้น)"
              }
              name={"question_4"}
              value={values.question_4}
              touched={touched.question_4}
              error={errors.question_4}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 5 */}
            <SDQRadio
              label={"5.ฉันโกรธแรง และมักอารมณ์เสีย"}
              name={"question_5"}
              value={values.question_5}
              touched={touched.question_5}
              error={errors.question_5}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 6 */}
            <SDQRadio
              label={"6.ฉันชอบอยู่กับตัวเอง ฉันชอบเล่นคนเดียวหรืออยู่ตามลำพัง"}
              name={"question_6"}
              value={values.question_6}
              touched={touched.question_6}
              error={errors.question_6}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 7 */}
            <SDQRadio
              label={"7.ฉันมักทำตามที่คนอื่นบอก"}
              name={"question_7"}
              value={values.question_7}
              touched={touched.question_7}
              error={errors.question_7}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["2", "1", "0"]}
            />
            {/* 8 */}
            <SDQRadio
              label={"8.ฉันขี้กังวล"}
              name={"question_8"}
              value={values.question_8}
              touched={touched.question_8}
              error={errors.question_8}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 9 */}
            <SDQRadio
              label={
                "9.ใคร ๆ ก็พึ่งฉันได้ถ้าเขาเสียใจ อารมณ์ไม่ดีหรือไม่สบายใจ"
              }
              name={"question_9"}
              value={values.question_9}
              touched={touched.question_9}
              error={errors.question_9}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 10 */}
            <SDQRadio
              label={"10.ฉันอยู่ไม่สุข วุ่นวาย"}
              name={"question_10"}
              value={values.question_10}
              touched={touched.question_10}
              error={errors.question_10}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 11 */}
            <SDQRadio
              label={"11.ฉันมีเพื่อนสนิท"}
              name={"question_11"}
              value={values.question_11}
              touched={touched.question_11}
              error={errors.question_11}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["2", "1", "0"]}
            />
            {/* 12 */}
            <SDQRadio
              label={
                "12.ฉันมีเรื่องทะเลาะวิวาทบ่อย ฉันทำให้คนอื่นทำอย่างที่ฉันต้องการได้"
              }
              name={"question_12"}
              value={values.question_12}
              touched={touched.question_12}
              error={errors.question_12}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 13 */}
            <SDQRadio
              label={"13.ฉันไม่มีความสุข ท้อแท้ ร้องไห้บ่อย"}
              name={"question_13"}
              value={values.question_13}
              touched={touched.question_13}
              error={errors.question_13}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 14 */}
            <SDQRadio
              label={"14.เพื่อนๆ ส่วนมากชอบฉัน"}
              name={"question_14"}
              value={values.question_14}
              touched={touched.question_14}
              error={errors.question_14}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["2", "1", "0"]}
            />
            {/* 15 */}
            <SDQRadio
              label={"15.ฉันวอกแวกง่าย ฉันรู้สึกว่าไม่มีสมาธิ"}
              name={"question_15"}
              value={values.question_15}
              touched={touched.question_15}
              error={errors.question_15}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 16 */}
            <SDQRadio
              label={
                "16.ฉันกังวลเวลาอยู่ในสถานการณ์ที่ไม่คุ้น และเสียความเชื่อมั่นในตนเองง่าย"
              }
              name={"question_16"}
              value={values.question_16}
              touched={touched.question_16}
              error={errors.question_16}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {/* 17 */}
            <SDQRadio
              label={"17.ฉันใจดีกับเด็กที่เล็กกว่า"}
              name={"question_17"}
              value={values.question_17}
              touched={touched.question_17}
              error={errors.question_17}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 18 */}
            <SDQRadio
              label={"18.มีคนว่าฉันโกหก หรือขี้โกงบ่อยๆ"}
              name={"question_18"}
              value={values.question_18}
              touched={touched.question_18}
              error={errors.question_18}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 19 */}
            <SDQRadio
              label={"19.เด็ก ๆ คนอื่น  ล้อเลียนหรือรังแกฉัน"}
              name={"question_19"}
              value={values.question_19}
              touched={touched.question_19}
              error={errors.question_19}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 20 */}
            <SDQRadio
              label={"20.ฉันมักจะอาสาช่วยเหลือคนอื่น (พ่อแม่, ครู, เด็กคนอื่น)"}
              name={"question_20"}
              value={values.question_20}
              touched={touched.question_20}
              error={errors.question_20}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 21 */}
            <SDQRadio
              label={"21.ฉันคิดก่อนทำ"}
              name={"question_21"}
              value={values.question_21}
              touched={touched.question_21}
              error={errors.question_21}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["2", "1", "0"]}
            />
            {/* 22 */}
            <SDQRadio
              label={"22.ฉันเอาของคนอื่นในบ้าน ที่โรงเรียน หรือที่อื่น"}
              name={"question_22"}
              value={values.question_22}
              touched={touched.question_22}
              error={errors.question_22}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 23 */}
            <SDQRadio
              label={"23.ฉันเข้ากับผู้ใหญ่ได้ดีกว่าเด็กวัยเดียวกัน"}
              name={"question_23"}
              value={values.question_23}
              touched={touched.question_23}
              error={errors.question_23}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 24 */}
            <SDQRadio
              label={"24.ฉันขี้กลัว รู้สึกหวาดกลัวได้ง่าย"}
              name={"question_24"}
              value={values.question_24}
              touched={touched.question_24}
              error={errors.question_24}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["0", "1", "2"]}
            />
            {/* 25 */}
            <SDQRadio
              label={"25.ฉันทำงานได้จนเสร็จ ความตั้งใจในการทำงานของฉันดี"}
              name={"question_25"}
              value={values.question_25}
              touched={touched.question_25}
              error={errors.question_25}
              onBlur={handleBlur}
              onChange={handleChange}
              options={["2", "1", "0"]}
            />
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-red w-1/2"
              type="button"
              onClick={() => {
                setValues(initialValues);
                navigate(`/student`);
              }}
            >
              ยกเลิก
            </button>
            <button type="submit" className="btn-green w-1/2">
              บันทึกคำตอบ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SDQFormStudent;
