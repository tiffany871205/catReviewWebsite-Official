function openModal(modalId) {
  try {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      console.log(`找不到 ID 為 ${modalId} 的 Modal`);
      return;
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    } else {
      modalElement.classList.add("show");
      modalElement.style.display = "block";
      document.body.classList.add("modal-open");
      document.body.classList.remove("overflow-auto");
      document.body.classList.add("overflow-hidden");
      document.body.style.overflow("hidden");

      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);
    }
  } catch (err) {
    console.log(`開啟 Modal (${modalId}) 時發生錯誤:`, err);
  }
}

export default openModal;
