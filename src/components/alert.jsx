import Swal from "sweetalert2";

export const swalConfirm = (title, text, icon, confirmButtonText) => {
    return new Promise((resolve) => { 
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText
        }).then((result) => {
            resolve(result);
        });
    });
}

export const swalSucces = (title, text, icon)=>{
    Swal.fire({
        title: title,
        text: text,
        icon: icon
      });
}

