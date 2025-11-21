import { MdUpload } from "react-icons/md";

const AddPicture = ({ pictureFile, id, onChange, showUploadButton }) => {
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/bmp",
    "image/webp",
  ];

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น (JPG, PNG, GIF, BMP, WEBP)");
      e.target.value = ""; // reset input
      return;
    }
    onChange(e);
  };

  const hasImage = Boolean(pictureFile);
  const triggerFileDialog = () => document.getElementById(id)?.click();

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`flex flex-col items-center justify-center w-78 h-60 border-2 border-gray-300 rounded-md bg-white transition border-dashed ${hasImage
            ? ""
            : "hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
          }`}
        onClick={hasImage ? undefined : triggerFileDialog}
        id={`picture-upload-area-${id}`}
        data-testid={`picture-upload-area-${id}`}
      >
        {hasImage ? (
          <img
            src={
              typeof pictureFile === "string"
                ? pictureFile
                : URL.createObjectURL(pictureFile)
            }
            className="w-full h-full rounded-md object-cover"
            alt="preview"
          />
        ) : (
          <>
            <MdUpload className="text-4xl text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">เพิ่มรูปภาพที่นี่</p>
            <p className="text-xs text-gray-400">
              JPG, PNG, GIF, BMP, WEBP (Max 5MB)
            </p>
          </>
        )}
      </div>

      {hasImage && (
        <button
          type="button"
          className="btn-blue"
          onClick={triggerFileDialog}
          id={`upload-image-button-${id}`}
          data-testid={`upload-image-button-${id}`}
        >
          เลือกรูปภาพใหม่
        </button>
      )}

      <input
        className="hidden"
        type="file"
        id={id}
        accept="image/jpeg, image/png, image/jpg, image/gif, image/bmp, image/webp"
        onChange={handleChange}
        name={id}
      />
    </div>
  );
};

export default AddPicture;
