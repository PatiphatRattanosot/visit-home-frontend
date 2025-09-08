import { MdUpload } from "react-icons/md";

const AddPicture = ({ pictureFile, id, onChange }) => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-78 h-60 border-2 border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition border-dashed"
        onClick={() => document.getElementById(id)?.click()}
      >
        {pictureFile ? (
          <img
            src={
              //เช็คถ้าเป็น string หรือเปล่า ถ้าใช่ให้ใช้เลย ถ้าไม่ใช่ให้สร้างอัพโหลด object URL
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
            <p className="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
          </>
        )}
      </div>

      <input
        className="hidden"
        type="file"
        id={id}
        accept="image/jpeg, image/png"
        onChange={onChange}
        name={id}
      />
    </>
  );
};

export default AddPicture;
