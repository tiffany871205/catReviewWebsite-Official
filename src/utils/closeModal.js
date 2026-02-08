// 通用的 Modal 關閉函數
function closeModal(modalId) {
  try {
    const modalElement = document.getElementById(modalId);

    if (!modalElement) {
      console.log(`找不到 ID 為 ${modalId} 的 Modal`);
      return;
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    } else {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.querySelector(".modal-backdrop")?.remove();
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("padding-right");
      document.body.classList.add("overflow-auto");
    }
  } catch (err) {
    console.log(`關閉 Modal (${modalId}) 時發生錯誤:`, err);
  }
}

export default closeModal;
