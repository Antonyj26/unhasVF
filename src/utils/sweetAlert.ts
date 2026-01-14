import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal);

export const alertSuccess = (title: string, text?: string) =>
  MySwal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#9e737a",
  });

export const alertError = (title: string, text?: string) =>
  MySwal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: "#9e737a",
  });

export const alertConfirm = (title: string, text: string) =>
  MySwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#9e737a",
    cancelButtonColor: "#aaa",
  });

export const alertLoading = (title = "Carregando...") =>
  MySwal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      MySwal.showLoading();
    },
  });
