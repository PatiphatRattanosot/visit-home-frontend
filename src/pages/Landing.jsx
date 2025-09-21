import { useEffect } from "react";
import PrivacyModal from "../components/modals/PrivacyModal";

const Landing = () => {
  useEffect(() => {
    const privacyModal = document.getElementById("privacy_modal");
    const hasAcceptedPrivacy = localStorage.getItem("hasAcceptedPrivacy");
    if (!hasAcceptedPrivacy) {
      privacyModal.showModal();
      const handleClose = () => {
        localStorage.setItem("hasAcceptedPrivacy", "true");
      };
      privacyModal.addEventListener("close", handleClose);
      return () => {
        privacyModal.removeEventListener("close", handleClose);
      };
    }
  }, []);
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/hero.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-3xl">
            <h1 className="mb-5 text-5xl font-bold">
              ระบบบันทึกการเยี่ยมบ้านโรงเรียนบางแพปฐมพิทยา
            </h1>
          </div>
        </div>
      </div>
      <PrivacyModal />
    </>
  );
};

export default Landing;
