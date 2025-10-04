import React from "react";
import "./PDFCanvas.css";

const PDFCanvas = () => {
  return (
    <div className="pdf-canvas">
      {/* Page 1 */}
      <div className="form-page">
        {/* Header */}
        <div className="form-header">
          <div className="logo-section">
            <img
              src="/pdfLogo.png"
              alt="Government Logo"
              className="government-logo"
            />
          </div>
          <div className="title-section">
            <h1 className="main-title">บันทึกการเยี่ยมบ้าน</h1>
            <div className="subtitle-box">
              <p>
                โรงเรียนประถมปูชนียศึกษา
                สำนักงานการศึกษาประถมศึกษาการดูแลช่วยเหลือเด็กนักเรียน
              </p>
              <p>ภาคเรียนที่ 1 ปีการศึกษา 2568</p>
            </div>
          </div>
          <div className="photo-section">
            <div className="photo-placeholder">{/* Photo placeholder */}</div>
            <div className="number-boxes">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="number-box"></div>
              ))}
            </div>
            <p>หมายเลขลำดับที่</p>
            <div className="number-boxes small">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="number-box"></div>
              ))}
            </div>
            <p>ระดับชั้น</p>
          </div>
        </div>

        {/* Main Form Content */}
        <div className="form-content">
          {/* Personal Information Section */}
          <div className="form-section">
            <div className="field-group">
              <label>ชื่อ-สกุล : </label>
              <div className="field-inline">
                <span>เด็กชาย/เด็กหญิง/นาย/นางสาว/นาง</span>
                <input type="text" className="underline-input" />
                <span>เชื้อชาติ</span>
                <input type="text" className="underline-input" />
                <span>สัญชาติ</span>
                <input type="text" className="underline-input" />
                <span>ศาสนา</span>
                <input type="text" className="underline-input" />
              </div>
            </div>

            <div className="field-group">
              <label>การคมนาคม : </label>
              <div className="field-inline">
                <span>รถ สอง ล้อ</span>
                <span>รถ สี่ ล้อ</span>
                <span>รถประจำทาง</span>
                <span>อื่น ๆ</span>
                <input type="text" className="underline-input" />
              </div>
            </div>

            <div className="field-group">
              <span>ชื่อ-สกุล บิดา (ผู้ปกครอง) : </span>
              <input type="text" className="underline-input long" />
              <span>อายุ</span>
              <input type="text" className="underline-input short" />
              <span>ปี อาชีพหลัก</span>
              <input type="text" className="underline-input" />
            </div>

            <div className="field-group">
              <span>ชื่อ-สกุล มารดา : </span>
              <input type="text" className="underline-input long" />
              <span>อายุ</span>
              <input type="text" className="underline-input short" />
              <span>ปี อาชีพหลัก</span>
              <input type="text" className="underline-input" />
            </div>

            <div className="field-group">
              <span>ชื่อ-สกุล ผู้ปกครอง : </span>
              <input type="text" className="underline-input long" />
              <span>อายุ</span>
              <input type="text" className="underline-input short" />
              <span>ปี อาชีพหลัก</span>
              <input type="text" className="underline-input" />
            </div>
          </div>

          {/* Address and Distance Section */}
          <div className="form-section">
            <div className="field-group">
              <span>ระยะทางจากบ้านไปโรงเรียน</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> ไม่เกิน 20 นาท
                </label>
                <label>
                  <input type="checkbox" /> 20-40 นาท
                </label>
                <label>
                  <input type="checkbox" /> 41-60 นาท
                </label>
                <label>
                  <input type="checkbox" /> 61-90 นาท
                </label>
                <label>
                  <input type="checkbox" /> 91-100 นาท
                </label>
                <label>
                  <input type="checkbox" /> มากกว่า 100 นาท
                </label>
              </div>
            </div>
          </div>

          {/* Housing and Family Information */}
          <div className="form-section">
            <div className="field-group">
              <span>ที่อยู่อาศัยในปัจจุบัน :</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> บ้าน
                </label>
                <label>
                  <input type="checkbox" /> หอพัก
                </label>
                <label>
                  <input type="checkbox" /> ที่ญาติเพื่อน (ที่พักแรก)
                </label>
                <label>
                  <input type="checkbox" /> อพาร์ตเมนต์
                </label>
                <label>
                  <input type="checkbox" /> ที่ญาติเพื่อน (ที่พักแรม)
                </label>
                <label>
                  <input type="checkbox" /> คอนโด
                </label>
                <label>
                  <input type="checkbox" /> บ้านเช่า (บ้านเดี่ยว/แถว)
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>ลักษณะครอบครัวของนักเรียน :</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> 1-10 ปี
                </label>
                <label>
                  <input type="checkbox" /> 11-20 ปี
                </label>
                <label>
                  <input type="checkbox" /> 21-30 ปี
                </label>
                <label>
                  <input type="checkbox" /> มากกว่า 30 ปี
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>
                รายได้ครอบครัวเฉลี่ยต่อเดือนของครอบครัว รวมบิดา-มารดา :
              </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> น้อยกว่า 5,000
                </label>
                <label>
                  <input type="checkbox" /> 5,001-10,000 บาท
                </label>
                <label>
                  <input type="checkbox" /> 10,001-15,000 บาท
                </label>
                <label>
                  <input type="checkbox" /> มากกว่า 15,000 บาท
                </label>
                <label>
                  <input type="checkbox" /> 701-900 บาท
                </label>
                <label>
                  <input type="checkbox" /> 901-1,100 บาท
                </label>
                <label>
                  <input type="checkbox" /> 1,101-1,500 บาท
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>การทำมาหาเศรษฐกิจใน :</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> เกษตร
                </label>
                <label>
                  <input type="checkbox" /> พาณิชย์
                </label>
              </div>
              <input type="text" className="underline-input" />
              <span>รายได้เฉลี่ย</span>
              <input type="text" className="underline-input" />
              <span>บาท</span>
            </div>

            <div className="field-group">
              <span>ผลรายการครอบครัว :</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> เอกซเรย์ปอดครอบครัว
                </label>
                <label>
                  <input type="checkbox" /> สมรสไม่จดทะเบียน
                </label>
                <label>
                  <input type="checkbox" /> สมรสไม่จดทะเบียน
                </label>
                <label>
                  <input type="checkbox" /> หย่าร้าง
                </label>
                <label>
                  <input type="checkbox" /> ป่วย
                </label>
                <label>
                  <input type="checkbox" /> เสียชีวิต
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
              </div>
            </div>
          </div>

          {/* Social Media and Contact Information */}
          <div className="form-section">
            <div className="field-group">
              <span>พฤติกรรมเชิงสื่อของครอบครัวที่ :</span>
              <input type="text" className="underline-input long" />
            </div>

            <div className="field-group">
              <span>พฤติกรรมเชิงสื่อของครอบครัวของเด็กที่ :</span>
              <input type="text" className="underline-input long" />
            </div>

            <div className="field-group">
              <span>ทำกิจกรรมครอบครัว (หากมี/ไม่มี) :</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> ดูทีวี
                </label>
                <label>
                  <input type="checkbox" /> อ่านหนังสือ
                </label>
                <label>
                  <input type="checkbox" /> เล่น Facebook
                </label>
                <label>
                  <input type="checkbox" /> เล่นเกม
                </label>
                <label>
                  <input type="checkbox" /> ใช้ Line
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>ประเภทหนี้สินที่ครอบครัวมี :</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> เงินกู้ยืม
                </label>
                <label>
                  <input type="checkbox" /> เงินกู้ธนาคาร
                </label>
                <label>
                  <input type="checkbox" /> เงินกู้
                </label>
                <label>
                  <input type="checkbox" /> เงินกู้
                </label>
                <label>
                  <input type="checkbox" /> พนัน
                </label>
                <label>
                  <input type="checkbox" /> พนัน
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>สมาชิกแต่ละคน :</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> ทำนา
                </label>
                <label>
                  <input type="checkbox" /> ทำสวน
                </label>
                <label>
                  <input type="checkbox" /> ค้าขาย
                </label>
                <label>
                  <input type="checkbox" /> รับจ้าง
                </label>
                <label>
                  <input type="checkbox" /> ขึ้นป่า/ทำไร่
                </label>
                <label>
                  <input type="checkbox" /> นาข้าว
                </label>
              </div>
            </div>
          </div>

          {/* Number of Family Members */}
          <div className="form-section">
            <div className="field-group">
              <span>จำนวนสมาชิกใครครอบครัว (รวมตัวนักเรียน) จำนวน</span>
              <input type="text" className="underline-input short" />
              <span>คน</span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> ชาย
                </label>
                <label>
                  <input type="checkbox" /> เด็กชาย
                </label>
                <label>
                  <input type="checkbox" /> หญิง เด็กหญิง/นักเรียน
                </label>
                <label>
                  <input type="checkbox" /> ชิม น ภาษ.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="form-page">
        <div className="form-header-simple">
          <img
            src="/pdfLogo.png"
            alt="Government Logo"
            className="government-logo small"
          />
          <h2 className="page-title">บันทึกการเยี่ยมบ้าน</h2>
        </div>

        <div className="form-content">
          {/* Income Details */}
          <div className="form-section">
            <div className="field-group">
              <span>ชื่อ-สกุล บิดา : </span>
              <input type="text" className="underline-input long" />
              <span>อาชีพ : </span>
              <input type="text" className="underline-input" />
              <span>รายได้/วัน : </span>
              <input type="text" className="underline-input" />
            </div>

            <div className="field-group">
              <span>ชื่อ-สกุล มารดา : </span>
              <input type="text" className="underline-input long" />
              <span>อาชีพ : </span>
              <input type="text" className="underline-input" />
              <span>รายได้/วัน : </span>
              <input type="text" className="underline-input" />
            </div>

            <div className="income-section">
              <div className="income-details">
                <div className="field-group">
                  <span>รายได้ครอบครัว : </span>
                  <div className="checkbox-group vertical">
                    <label>
                      <input type="checkbox" /> ต่ำกว่า 5,000 บาท
                    </label>
                    <label>
                      <input type="checkbox" /> 5,001-10,000 บาท
                    </label>
                    <label>
                      <input type="checkbox" /> 10,001-15,000 บาท
                    </label>
                    <label>
                      <input type="checkbox" /> มากกว่า 15,000 บาท
                    </label>
                  </div>
                </div>
              </div>

              <div className="income-details">
                <div className="field-group">
                  <span>รายได้ มารดา : </span>
                  <div className="checkbox-group vertical">
                    <label>
                      <input type="checkbox" /> ต่ำกว่า 5,000 บาท
                    </label>
                    <label>
                      <input type="checkbox" /> 5,001-10,000 บาท
                    </label>
                    <label>
                      <input type="checkbox" /> 10,001-15,000 บาท
                    </label>
                    <label>
                      <input type="checkbox" /> มากกว่า 15,000 บาท
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Family Composition Table */}
          <div className="form-section">
            <h3>ระบุจำนวนสมาชิกในครอบครัว (รวมตัวนักเรียน)</h3>
            <table className="family-table">
              <thead>
                <tr>
                  <th>ชื่อ</th>
                  <th>สมาชิก</th>
                  <th>อายุ</th>
                  <th>นำ้หนัก</th>
                  <th>ส่วนสูง</th>
                  <th>วันเกิด</th>
                  <th>โรคที่</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td>
                      <input type="text" className="table-input" />
                    </td>
                    <td>
                      <input type="text" className="table-input" />
                    </td>
                    <td>
                      <input type="text" className="table-input" />
                    </td>
                    <td>
                      <input type="text" className="table-input" />
                    </td>
                    <td>
                      <input type="text" className="table-input" />
                    </td>
                    <td>
                      <input type="text" className="table-input" />
                    </td>
                    <td>
                      <input type="text" className="table-input" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Housing and Living Conditions */}
          <div className="form-section">
            <div className="field-group">
              <span>สภาพความเป็นอยู่ของนักเรียน : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> ดีมาก
                </label>
                <label>
                  <input type="checkbox" /> ดี
                </label>
                <label>
                  <input type="checkbox" /> ปานกลาง
                </label>
                <label>
                  <input type="checkbox" /> พอใช้
                </label>
                <label>
                  <input type="checkbox" /> จำเป็น
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>โรคเครื่องดื่มแอลกอฮอล์เสพติด : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> 500 - 500 บาท
                </label>
                <label>
                  <input type="checkbox" /> 501 - 1,000 บาท
                </label>
                <label>
                  <input type="checkbox" /> 1,001 - 1,500 บาท
                </label>
                <label>
                  <input type="checkbox" /> 1,501 - 2,000 บาท
                </label>
                <label>
                  <input type="checkbox" /> 2,001 - 3,000 บาท
                </label>
                <label>
                  <input type="checkbox" /> 3,001 - 3,500 บาท
                </label>
                <label>
                  <input type="checkbox" /> มากกว่า 3,500 บาท
                </label>
                <label>
                  <input type="checkbox" /> 601 - 700 บาท
                </label>
                <label>
                  <input type="checkbox" /> 1,101-1,500 บาท
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>รายจ่ายครัวเรือนต่อเดือน : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> โลหิตจาง
                </label>
                <label>
                  <input type="checkbox" /> พิ
                </label>
                <label>
                  <input type="checkbox" /> วิตามินบี1 บี6 บี12
                </label>
              </div>
            </div>
          </div>

          {/* Health and Social Issues */}
          <div className="form-section">
            <div className="field-group">
              <span>ลักษณะครอบครัวใครครอบครัว : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> โลหิตจาง / ไขใขปัญญาอ่อน
                </label>
                <label>
                  <input type="checkbox" /> มีโรคประจำตัว
                </label>
                <label>
                  <input type="checkbox" /> โรคกาฬโรค
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
                <label>
                  <input type="checkbox" /> โลหิตจาง ไขข้อ
                </label>
                <label>
                  <input type="checkbox" /> โลหิตจาง อื่นๆ
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>พฤติกรรมเสี่ยง : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> บ้านไม่ดี
                </label>
                <label>
                  <input type="checkbox" /> บุหรี่/สิง/ยาเส
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
                <label>
                  <input type="checkbox" /> เล่นเกม
                </label>
                <label>
                  <input type="checkbox" /> โซเชียล
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>ลักษณะของการไปเรียน : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> มีเซ็นกิจ / ขาดเรียน
                </label>
                <label>
                  <input type="checkbox" /> โรคระบบทางเดิน
                </label>
                <label>
                  <input type="checkbox" /> โรคตับข้อ
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
                <label>
                  <input type="checkbox" /> โรคสง
                </label>
                <label>
                  <input type="checkbox" /> หัด
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 3 - Health and Social Assessment */}
      <div className="form-page">
        <div className="form-header-simple">
          <img
            src="/pdfLogo.png"
            alt="Government Logo"
            className="government-logo small"
          />
          <h2 className="page-title">บันทึกการเยี่ยมบ้าน</h2>
        </div>

        <div className="form-content">
          {/* Health Assessment */}
          <div className="form-section">
            <div className="field-group">
              <span>สิ่งแวดล้อมและสุขาภิบาลรอบ บ้าน : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> สิ่งแวดล้อมรอบบ้านดี
                </label>
                <label>
                  <input type="checkbox" /> มีการปรับปรุง
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>สภาพโภชนาการของครอบครัว : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> ปรกติดี
                </label>
                <label>
                  <input type="checkbox" /> มีโรค
                </label>
                <label>
                  <input type="checkbox" /> มีโรค
                </label>
                <label>
                  <input type="checkbox" /> โรค
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>
                สะสมครอบครัวที่มีอิทธิพลต่อการเรียน นักเรียนไปเรียน :{" "}
              </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> มีปัญหา / ไม่เปลี่ยนแปลง
                </label>
                <label>
                  <input type="checkbox" /> อื่นๆ.............
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>คิดประเมินผลของครอบครัวต่อการดูแลนักเรียน : </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> ดูแลดี / มีสิ่งฝึก
                </label>
                <label>
                  <input type="checkbox" /> ได้รับ.............
                </label>
              </div>
            </div>

            <div className="field-group">
              <span>
                ความสามารถของครอบครัวที่จะช่วยดูแลปรับปรุงพัฒนานักเรียน :{" "}
              </span>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" /> เชื่อมั่น
                </label>
                <label>
                  <input type="checkbox" /> ไม่แน่ใจ
                </label>
                <label>
                  <input type="checkbox" /> ไม่สามารถช่วยได้
                </label>
              </div>
            </div>
          </div>

          {/* Problem Areas Assessment */}
          <div className="form-section">
            <h3>ความผิดปกติของของนักเรียน ตามบุคลิก ( ก )</h3>
            <div className="problem-categories">
              <div className="problem-category">
                <h4>ด้านสุขภาพทางกาย :</h4>
                <div className="checkbox-list">
                  <label>
                    <input type="checkbox" /> ( ) โรคความดันโลหิตสูง/ต่ำ/หิว
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) นำ้หนักไม่เหมาะสมกับส่วนสูง
                    ทั้งน้อยและมาก
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) เป็นโรคเรื้อรัง
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) การได้ยินไม่ปกติ
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) การมองเห็น / การกิน
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) การพูด ติดอ่าง
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) การเดินไม่ปกติ / พิการ
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) มีการสั่นของกล้ามเนื้อ
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) ความผิดปกติของระบบการย่อยอาหาร
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    การขับถ่ายไม่ปกติของระบบการแบ่งของเสีย ( ตับ กด )
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) อื่น ๆ
                  </label>
                </div>
              </div>

              <div className="problem-category">
                <h4>ด้านการเลี้ยงสังคม :</h4>
                <div className="checkbox-list">
                  <label>
                    <input type="checkbox" /> ( ) พฤติกรรม
                    ไม่อนุญาตเพื่อให้ข้อมูล และแวดล้อม
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) พฤติกรรม / ป่วยต่าง
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    การแชร์สิ่งแวดล้อมกับเพื่อนมีปัญหา
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) มีความลิ้มใสพิเศษการบ้าน
                    หรือเครื่อง
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) ปรับกิจกรรมเข้าสู่เพื่อนยาว
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) มีความสัมพันธ์ / บจ.ครอบครัว
                    ลำเสียงดี
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    พิสูจน์การแสดงออกแต่ท่าทีการช่วยส่อง
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) โบโอสุรี
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) ช้อนคิดในครอบครัวให้สามี /
                    สมคิดท้อง
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    ช้อนคิดในครอบครัวให้ไนท์ำร่าให้โพเท็ง / ดคัส
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    มีความต้องการมากกว่าครอบครั้งใส
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    มีความสะวาในแิ้งฃใข้พอให้หลุดใสุ้เรียกบุคคล
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) ยุทธ์กมะชาชุ
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) ชิม ๆ ที่............
                  </label>
                </div>
              </div>

              <div className="problem-category">
                <h4>ความฉลาดสังคม :</h4>
                <div className="checkbox-list">
                  <label>
                    <input type="checkbox" /> ( )
                    เรียนใสห้ที่ใสใุ้งคั้นเชิงกรรมของครอบครัว
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    เรียนใสห้ความเห็นแก่ครอบครั้งเมื่อกลิ้งเวียกนุกคอก
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) การยื้ตาราง / ข้าง
                    โปริงกิก็งาค
                  </label>
                  <label>
                    <input type="checkbox" /> ( )
                    โรคประเสริฐในขิงให้วิทยาไส่เข่าไว้โอท่งหลิดมีบล์ว่งให้
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) ไต้ความผิหล้องใหม่หาน
                    โยคลิลการยครา เกรเงื่อนมูค
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) พยากรณ์และไลรังไร
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) อำใดเรื่องใสอิก
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) โรคมอราํดุงกง้อง มัธกดอ เสร์
                    แครโสต
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) โรคมคำตผึ้ตและหโซไกอืมา เขแบา
                  </label>
                  <label>
                    <input type="checkbox" /> ( ) ชิม ๆ
                    ที่...................................
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 4 - Continued Assessment and Intervention Plans */}
      <div className="form-page">
        <div className="form-header-simple">
          <img
            src="/pdfLogo.png"
            alt="Government Logo"
            className="government-logo small"
          />
          <h2 className="page-title">บันทึกการเยี่ยมบ้าน</h2>
        </div>

        <div className="form-content">
          <div className="form-section">
            <div className="checkbox-list">
              <label>
                <input type="checkbox" /> ( ) ชิม ๆ
                ที่...................................
              </label>
              <label>
                <input type="checkbox" /> ( ) มีการพูก ขย้าย กรีแกริ้ก
              </label>
              <label>
                <input type="checkbox" /> ( ) เป็นเชื้อโรคและใข้ในขาย
              </label>
              <label>
                <input type="checkbox" /> ( ) เป็นเชื้อโรค โซจี่ พิเป็น
                ความสำคัญศึง
              </label>
              <label>
                <input type="checkbox" /> ( ) ชิม ๆ
                ที่...................................
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>พฤติกรรมการสังเกต</h3>
            <div className="checkbox-list">
              <label>
                <input type="checkbox" /> ( )
                ความสำนวนการมองได้พ์ชิงกิจกรรมของครอบครัว
              </label>
              <label>
                <input type="checkbox" /> ( )
                พฤติกรรมขุ่นแปลหับเครื่องมีการปรัผเข้า
              </label>
              <label>
                <input type="checkbox" /> ( )
                ใส่ใส่กิล้องๆกิเรียนกับหารองมากอย่าวได้{" "}
              </label>
              <label>
                <input type="checkbox" /> ( )
                โบโคุขเรื่องดีโ้าไชั้แลเป้อให้พรูปด์ใด่เกห
              </label>
              <label>
                <input type="checkbox" /> ( ) มีการดี่เสียไปมองให้เรีมย์
              </label>
              <label>
                <input type="checkbox" /> ( ) มีหข้าหล่นสารเพี่อน
              </label>
              <label>
                <input type="checkbox" /> ( ) มีการใส่มาเสียจ / สิ่งบรรเถาเท่พ์
                / เท่เห
              </label>
              <label>
                <input type="checkbox" /> ( ) ไฉ่การได้เห
              </label>
              <label>
                <input type="checkbox" /> ( ) ชิม ๆ
                ที่...................................
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>ด้านการเรียนและ การใช้ของการสาเร</h3>
            <div className="checkbox-list">
              <label>
                <input type="checkbox" /> ( )
                เหมาะมีการไป้อรีข่ครื่งคิรเที่การใส่และไณ่คฟะเล่
                โข่ใ้การแบ่อวิ้อข่วิ้กี่ที่มิและเตื้อน
              </label>
              <label>
                <input type="checkbox" /> ( ) โรคมสารกรก่าววา
                cครื่องสี่ได้วฟาคิพรงการเรียน แค่ม่างการปฟเรีน์งักใด
              </label>
              <label>
                <input type="checkbox" /> ( )
                โรคมเารก่าควผไาคท่างปิิ้ดให้ลำเบากากข ห็อ่บีเจจและน้อเสส แค่ห์
                แิ่งำการล์โจอก
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>ด้านสนเพิมเอาอจิ:</h3>
            <div className="checkbox-list">
              <label>
                <input type="checkbox" /> ( )
                โดยมีบุเาคุการเดีืมีัก่อ้าก.ราการเม่ริานเช้
                ทีค่าดีใสลบักลิดรูปก่นหนึด
              </label>
              <label>
                <input type="checkbox" /> ( ) พฤติกรกับใช้อการครื่กรำการ
                รถอจณ่ายปราจุีกรเช้าชป่าาบบำยส
              </label>
              <label>
                <input type="checkbox" /> ( ) ที่ที่สาน่าดีเด็กเออิกักอพักก อป่ย
                างคอนร็ำคด้ิ
              </label>
              <label>
                <input type="checkbox" /> ( ) ช่วยอยี รป แิ็ก เช้อง รเโ น.ก้ เม
                + č รีอ
              </label>
              <label>
                <input type="checkbox" /> ( ) ทีความจสอนขคิแบแแ้แอำต
              </label>
              <label>
                <input type="checkbox" /> ( )
                โรคมคำผลิแใ้สร์บิ้แแลำกหาพีิ่งบ่อกเมีรมส
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>ภาคหลังหอาดิมกำค</h3>
            <div className="drawing-boxes">
              <div className="drawing-box">
                <div className="drawing-area"></div>
                <p>ภาพแสดงบ้านเข้าสิ่ำเส็อของหับ่าขจิไหม</p>
              </div>
              <div className="drawing-box">
                <div className="drawing-area"></div>
                <p>ภาพแสดงบ้านไปใข่้อาศ่อำหยุ่นขผลของขจิไหม</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Page - Signature and Assessment */}
      <div className="form-page">
        <div className="form-header-simple">
          <img
            src="/pdfLogo.png"
            alt="Government Logo"
            className="government-logo small"
          />
          <h2 className="page-title">บันทึกการเยี่ยมบ้าน</h2>
        </div>

        <div className="form-content">
          <div className="form-section">
            <div className="drawing-box large">
              <div className="drawing-area large"></div>
              <p>
                ภาพแสดงข้อมูลใช่้อในทวน้อย สำหรับ โดยเครื่อง ใน่อหยุ่นกจิไหม
              </p>
            </div>
          </div>

          <div className="form-section">
            <h3>ผู้ใชื้โปรแการสืบเสี้น</h3>
            <div className="status-group">
              <label>
                <input type="checkbox" /> นาย
              </label>
              <label>
                <input type="checkbox" /> ดำั
              </label>
              <label>
                <input type="checkbox" /> ขี่าย
              </label>
              <label>
                <input type="checkbox" /> วีโซ
              </label>
              <label>
                <input type="checkbox" /> คา
              </label>
              <label>
                <input type="checkbox" /> ห
              </label>
              <label>
                <input type="checkbox" /> พอด
              </label>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-box">
              <div className="signature-line"></div>
              <p>
                กะตึก{" "}
                <span className="underline-space">
                  ................................
                </span>{" "}
                ผู้ป่องดืไแม่เ์
              </p>
              <p>
                ({" "}
                <span className="underline-space">
                  ................................
                </span>{" "}
                )
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFCanvas;
