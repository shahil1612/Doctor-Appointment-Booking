/**
 * Toast notification manager for displaying success/error messages
 */
export default class ToastManager {
  constructor(containerId = "toastContainer") {
    this.container = document.getElementById(containerId);

    if (!this.container) {
      console.log("⚠️ Toast container not found, creating one");
      this.container = document.createElement("div");
      this.container.id = containerId;
      document.body.appendChild(this.container);
    }
  }

  /**
   * Show a toast notification
   * @param {string} msg - Message to display
   * @param {string} type - Toast type (success or error)
   * @param {number} timeout - Auto-dismiss timeout in milliseconds
   */
  show(msg, type = "success", timeout = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;

    const span = document.createElement("span");
    span.textContent = msg;
    toast.appendChild(span);

    this.container.appendChild(toast);

    // Auto dismiss
    const dismissToast = () => {
      toast.classList.add("fade-out");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    const autoDissmissTimeout = setTimeout(dismissToast, timeout);

    // Click to dismiss
    toast.addEventListener("click", () => {
      clearTimeout(autoDissmissTimeout);
      dismissToast();
    });
  }

  success(msg) {
    this.show(msg, "success");
  }

  error(msg) {
    this.show(msg, "error");
  }
}
