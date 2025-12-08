import Swal from 'sweetalert2';

// Success Alert
export const showSuccess = (message, title = 'สำเร็จ!') => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        confirmButtonColor: '#D4AF37',
        confirmButtonText: 'ตกลง'
    });
};

// Error Alert
export const showError = (message, title = 'เกิดข้อผิดพลาด!') => {
    return Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        confirmButtonColor: '#D4AF37',
        confirmButtonText: 'ตกลง'
    });
};

// Confirm Dialog
export const showConfirm = async (message, title = 'คุณแน่ใจหรือไม่?') => {
    const result = await Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        showCancelButton: true,
        confirmButtonColor: '#D4AF37',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    });
    return result.isConfirmed;
};

// Info Alert
export const showInfo = (message, title = 'แจ้งเตือน') => {
    return Swal.fire({
        icon: 'info',
        title: title,
        text: message,
        confirmButtonColor: '#D4AF37',
        confirmButtonText: 'ตกลง'
    });
};

// Loading Alert
export const showLoading = (message = 'กำลังดำเนินการ...') => {
    return Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

// Close Loading
export const closeLoading = () => {
    Swal.close();
};
