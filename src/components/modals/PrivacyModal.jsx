import React from "react";

const PrivacyModal = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <dialog id="privacy_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">ประกาศความเป็นส่วนตัว</h3>
        <p className="py-4">
          เว็บไซต์ระบบเยี่ยมบ้านนักเรียน มีความจำเป็นต้องเก็บรวบรวม ใช้
          และประมวลผลข้อมูลส่วนบุคคลของนักเรียนและผู้ปกครองเพื่อการเยี่ยมบ้าน
          การติดตามผล โดยข้อมูลที่เราจัดเก็บ ได้แก่ ชื่อ-นามสกุล,
          ข้อมูลการติดต่อ, รายละเอียดการเยี่ยมบ้าน และข้อมูลอื่น ๆ ที่เกี่ยวข้อง
          อ่านรายละเอียดได้ที่นโยบายความเป็นส่วนตัว
        </p>
        <a
          href="/privacy-policy"
          className="text-blue-500 hover:underline hover:text-blue-700 hover:cursor-pointer text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          ข้อมูลเพิ่มเติมเกี่ยวกับการเก็บรวบรวมข้อมูลส่วนบุคคลสามารถดูได้ที่นี่
        </a>
        <div className="flex items-center pt-4">
          <input
            type="checkbox"
            id="privacy_checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="privacy_checkbox" className="text-sm">
            ฉันได้อ่านและยอมรับนโยบายความเป็นส่วนตัว
          </label>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button disabled={!checked} className="btn-blue">
              เข้าใจและยอมรับ
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default PrivacyModal;
