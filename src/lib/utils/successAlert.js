import Swal from "sweetalert2";

export const successAlert = async (title, text, icon) => {
    Swal.fire({
        confirmButtonColor: "hsl(270, 60%, 52%)",
        title,
        text,
        icon,
        allowEnterKey: true,
        confirmButtonText: "De acuerdo",
        padding: '35px',
    });
};