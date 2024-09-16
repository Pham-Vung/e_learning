import multer from "multer"; // sử dụng để xử lý tập tin tải lên
import { v4 as uuid } from "uuid"; // tạo tên tập tin duy nhất khi tải lên

/**
 *  cấu hình Multer để xử lý việc tải lên
 *  file và lưu trữ chúng trong thư mục
 *  "uploads". Mỗi tệp tin được tải lên
 *  sẽ có một tên duy nhất được tạo từ UUID,
 *  với phần mở rộng được giữ nguyên từ tệp gốc.
 */
const storage = multer.diskStorage({
    /**
     * Hàm này chỉ định thư mục đích nơi các tệp tin
     * sẽ được lưu trữ
     * @param {*} request 
     * @param {*} file 
     * @param {*} cb 
     */
    destination(request, file, cb) {
        cb(null, "uploads")
    },

    /**
     * Hàm này định nghĩa tên tệp tin sẽ được lưu trữ
     * @param {*} request 
     * @param {*} file 
     * @param {*} cb 
     */
    filename(request, file, cb) {
        const id = uuid();

        /**
         * file.originalname: Đây là tên gốc của tệp tin được tải lên.
         * split(".").pop(): Lấy phần mở rộng của tệp tin từ tên gốc (ví dụ, .jpg, .png)
         */
        const extName = file.originalname.split(".").pop();

        // fileName = ${id}.${extName}: Tạo tên tệp mới bằng cách ghép UUID với phần mở rộng của tệp.
        const fileName = `${id}.${extName}`;

        cb(null, fileName);
    }
});

export const uploadFiles = multer({storage}).single("file")