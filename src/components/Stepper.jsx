const Stepper = ({ step, path }) => {
  return (
    <ul className="steps">
      <a className={`step ${step >= 1 && "step-warning"}`} href={path?.stepOne}>
        <p className="hidden md:block">ข้อมูลส่วนตัว</p>
      </a>
      <a className={`step ${step >= 2 && "step-warning"}`} href={path?.stepTwo}>
        <p className="hidden md:block">ความสัมพันธ์ในครอบครัว</p>
      </a>
      <a
        className={`step ${step >= 3 && "step-warning"}`}
        href={path?.stepThree}
      >
        <p className="hidden md:block">สถานะของครอบครัว</p>
      </a>
      <a
        className={`step ${step >= 4 && "step-warning"}`}
        href={path?.stepFour}
      >
        <p className="hidden md:block">พฤติกรรมและความเสี่ยง</p>
      </a>
    </ul>
  );
};

export default Stepper;
