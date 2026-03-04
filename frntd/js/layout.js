/**
 * Load HTML content from a URL
 * @param {string} url - URL to load
 * @param {string} fallbackHTML - Fallback HTML if load fails
 * @returns {Promise<string>}
 */
async function loadHTML(url, fallbackHTML = "") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (err) {
    console.error(`Failed to load: ${url}`, err);
    return fallbackHTML;
  }
}

/**
 * Get base path based on current location
 * @returns {string}
 */
function getBasePath() {
  return window.location.pathname.includes("/pages/") ? "../" : "./";
}

/**
 * Get auth component based on page type
 * @param {string} pageType - Type of page (landing, login, signup, dashboard)
 * @returns {string|null}
 */
function getAuthComponent(pageType) {
  if (pageType === "landing") return "landing";
  if (pageType === "login") return "login";
  if (pageType === "signup") return "signup";
  if (pageType.includes("dashboard")) return "dashboard";
  return null;
}

/**
 * Initialize page layout by loading header and footer
 * @param {string} pageType - Type of page
 */
export async function initLayout(pageType) {
  const header = document.querySelector('[data-layout="header"]');
  const footer = document.querySelector('[data-layout="footer"]');

  if (!header || !footer) return;

  const basePath = getBasePath();

  // Load header and footer in parallel
  const results = await Promise.allSettled([
    loadHTML(`${basePath}components/header.html`),
    loadHTML(`${basePath}components/footer.html`),
  ]);

  const headerHTML = results[0].status === "fulfilled" ? results[0].value : "";
  const footerHTML = results[1].status === "fulfilled" ? results[1].value : "";

  // Set header content
  header.innerHTML = headerHTML
    ? headerHTML.replace(/{{BASE_PATH}}/g, basePath)
    : "<div class='navbar'>Sehat</div>";

  // Set footer content
  footer.innerHTML = footerHTML
    ? footerHTML.replace("{{YEAR}}", new Date().getFullYear())
    : "<p>&copy; Sehat</p>";

  // Load auth component if applicable
  const authComponent = getAuthComponent(pageType);
  if (authComponent) {
    const authHTML = await loadHTML(
      `${basePath}components/auth/${authComponent}.html`,
    );

    const authLinksContainer = header.querySelector("[data-auth-links]");
    if (authLinksContainer) {
      authLinksContainer.innerHTML = authHTML.replace(
        /{{BASE_PATH}}/g,
        basePath,
      );
    }
  }

  // Setup logout button handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = basePath + "index.html";
    });
  }
}
