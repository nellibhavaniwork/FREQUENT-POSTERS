import Swal from 'sweetalert2';

export const showSuccessAlert = (title, text = '') => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      popup: 'rounded-2xl shadow-2xl',
      title: 'text-lg font-black text-[#071957]',
    },
  });
};

export const showErrorAlert = (title, text = '') => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#2855CE',
    customClass: {
      popup: 'rounded-2xl shadow-2xl',
      title: 'text-lg font-black text-[#071957]',
      confirmButton: 'rounded-xl px-5 py-2.5 font-bold text-xs',
    },
  });
};

export const showConfirmAlert = async (title, text = 'This action cannot be undone.') => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Yes, proceed',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'rounded-2xl shadow-2xl',
      title: 'text-lg font-black text-[#071957]',
      confirmButton: 'rounded-xl px-5 py-2.5 font-bold text-xs shadow-md',
      cancelButton: 'rounded-xl px-5 py-2.5 font-bold text-xs',
    },
  });
  return result.isConfirmed;
};

