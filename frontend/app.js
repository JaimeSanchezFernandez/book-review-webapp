// ===== CONFIGURACIÓN =====
const API_BASE_URL = "http://localhost:5000/api"; // Ajusta si despliegas
const TOKEN_KEY = "bookverse_token";
const USER_EMAIL_KEY = "bookverse_user_email";
const USER_NAME_KEY = "bookverse_user_name";


// ===== UTILIDADES AUTH =====
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function setUserEmail(email) {
  localStorage.setItem(USER_EMAIL_KEY, email || "");
}

function getUserEmail() {
  return localStorage.getItem(USER_EMAIL_KEY);
}

function setUserName(name) {
  localStorage.setItem(USER_NAME_KEY, name || "");
}

function getUserName() {
  return localStorage.getItem(USER_NAME_KEY);
}

// ===== FETCH ENVUELTO =====
async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const token = getToken();

  const defaultHeaders = {
    Accept: "application/json",
  };

  if (options.body && !(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.body);
  }

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  let data = null;
  const contentType = response.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
  }

  if (!response.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Error HTTP ${response.status}`;
    throw new Error(msg);
  }

  return data;
}

// ===== UI ELEMENTOS =====
const el = {
  globalMessage: document.getElementById("global-message"),

  // Auth
  tabLogin: document.getElementById("tab-login"),
  tabRegister: document.getElementById("tab-register"),
  loginForm: document.getElementById("login-form"),
  registerForm: document.getElementById("register-form"),
  authCard: document.getElementById("auth-card"),

  // Nuevo libro
  newBookSection: document.getElementById("new-book-section"),
  newBookForm: document.getElementById("new-book-form"),

  // Libros
  booksSection: document.getElementById("books-section"),
  booksList: document.getElementById("books-list"),
  booksCount: document.getElementById("books-count"),
  bookCardTemplate: document.getElementById("book-card-template"),

  // Detalle de libro
  bookDetailSection: document.getElementById("book-detail-section"),
  btnCloseDetail: document.getElementById("btn-close-detail"),
  detailTitle: document.getElementById("detail-title"),
  detailAuthor: document.getElementById("detail-author"),
  detailMeta: document.getElementById("detail-meta"),
  detailDescription: document.getElementById("detail-description"),
  detailCover: document.getElementById("detail-cover"),

  // Reseñas
  reviewFormWrapper: document.getElementById("review-form-wrapper"),
  reviewForm: document.getElementById("review-form"),
  reviewRating: document.getElementById("review-rating"),
  reviewComment: document.getElementById("review-comment"),
  reviewLoginHint: document.getElementById("review-login-hint"),
  reviewsList: document.getElementById("reviews-list"),

  // Usuario / navbar
  userInfo: document.getElementById("user-info"),
  userEmail: document.getElementById("user-email"),
  btnLogout: document.getElementById("btn-logout"),
  btnNavHome: document.getElementById("btn-nav-home"),
  btnNavLogin: document.getElementById("btn-nav-login"),

  // Panel de cuenta
  accountSection: document.getElementById("account-section"),
  accountUsername: document.getElementById("account-username"),
  accountEmail: document.getElementById("account-email"),
  accountBooksCount: document.getElementById("account-books-count"),
};

// Estado global sencillo
let state = {
  books: [],
  currentBookId: null,
};

// ===== UI HELPERS =====
function showMessage(text, type = "success", timeoutMs = 3000) {
  if (!text) return;
  el.globalMessage.textContent = text;
  el.globalMessage.classList.remove("hidden", "alert--success", "alert--error");
  el.globalMessage.classList.add(
    "alert",
    type === "success" ? "alert--success" : "alert--error"
  );

  if (timeoutMs > 0) {
    setTimeout(() => {
      el.globalMessage.classList.add("hidden");
    }, timeoutMs);
  }
}

function setAuthTab(tab) {
  const isLogin = tab === "login";
  el.tabLogin.classList.toggle("tab--active", isLogin);
  el.tabRegister.classList.toggle("tab--active", !isLogin);

  el.loginForm.classList.toggle("hidden", !isLogin);
  el.registerForm.classList.toggle("hidden", isLogin);
}

function isLoggedIn() {
  return Boolean(getToken());
}

// ===== VISTAS: HOME / CUENTA =====
function updateAccountPanel() {
  if (!el.accountSection) return;

  if (!isLoggedIn()) {
    el.accountSection.classList.add("hidden");
    return;
  }

  const email = getUserEmail();
  const username = getUserName();

  el.accountUsername.textContent = username || "—";
  el.accountEmail.textContent = email || "—";

  // Contar libros creados por este usuario (comparando por email)
  const count = state.books.filter((book) => {
    return book.user && book.user.email === email;
  }).length;

  el.accountBooksCount.textContent = count.toString();
}

function showHomeView() {
  if (el.booksSection) el.booksSection.classList.remove("hidden");
  if (el.bookDetailSection) el.bookDetailSection.classList.add("hidden");
  if (el.accountSection) el.accountSection.classList.add("hidden");
}

function showAccountView() {
  if (!isLoggedIn()) return;

  if (el.booksSection) el.booksSection.classList.add("hidden");
  if (el.bookDetailSection) el.bookDetailSection.classList.add("hidden");
  if (el.accountSection) {
    updateAccountPanel();
    el.accountSection.classList.remove("hidden");
    el.accountSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ===== AUTH UI =====
function updateAuthUI() {
  const loggedIn = isLoggedIn();
  const email = getUserEmail();

  // Mostrar/ocultar sección de nuevo libro
  el.newBookSection.classList.toggle("hidden", !loggedIn);

  // Ocultar/mostrar la tarjeta de login/registro del sidebar
  el.authCard.classList.toggle("hidden", loggedIn);

  // Gestionar la info del usuario en el navbar
  if (loggedIn) {
    el.userInfo.classList.remove("hidden");
    el.userEmail.textContent = email || "Usuario conectado";

    el.btnNavLogin.classList.remove("hidden");
    el.btnNavLogin.textContent = "Mi cuenta";
  } else {
    el.userInfo.classList.add("hidden");
    el.userEmail.textContent = "";

    el.btnNavLogin.classList.remove("hidden");
    el.btnNavLogin.textContent = "Entrar / Registrarse";

    if (el.accountSection) el.accountSection.classList.add("hidden");
    if (el.booksSection) el.booksSection.classList.remove("hidden");
  }

  // En detalle, mostrar formulario de reseña o mensaje según login
  if (
    el.bookDetailSection &&
    !el.bookDetailSection.classList.contains("hidden")
  ) {
    el.reviewFormWrapper.classList.toggle("hidden", !loggedIn);
    el.reviewLoginHint.classList.toggle("hidden", loggedIn);
  }

  updateAccountPanel();
}

// ===== LIBROS =====
async function loadBooks() {
  try {
    const books = await apiFetch("/books", {
      method: "GET",
    });
    state.books = Array.isArray(books) ? books : [];
    renderBooks();
  } catch (err) {
    console.error(err);
    showMessage("No se pudieron cargar los libros.", "error");
  }
}

function renderBooks() {
  el.booksList.innerHTML = "";
  el.booksCount.textContent = state.books.length.toString();

  if (state.books.length === 0) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "Todavía no hay libros. Inicia sesión y crea el primero.";
    el.booksList.appendChild(p);
    updateAccountPanel();
    return;
  }

  state.books.forEach((book) => {
    const card = createBookCard(book);
    el.booksList.appendChild(card);
  });

  updateAccountPanel();
}

function createBookCard(book) {
  const template = el.bookCardTemplate;
  const card = template.content.firstElementChild.cloneNode(true);

  const cover = card.querySelector(".book-card__cover");
  const title = card.querySelector(".book-card__title");
  const author = card.querySelector(".book-card__author");
  const desc = card.querySelector(".book-card__description");
  const meta = card.querySelector(".book-card__meta");
  const btnDetail = card.querySelector(".book-card__btn-detail");

  const coverUrl = book.coverImage || "https://via.placeholder.com/150";
  cover.src = coverUrl;
  cover.alt = `Portada de ${book.title || "libro"}`;

  title.textContent = book.title || "Título desconocido";
  author.textContent = book.author ? `de ${book.author}` : "Autor desconocido";

  const description = book.description || "Sin descripción.";
  desc.textContent =
    description.length > 140
      ? description.slice(0, 137).trimEnd() + "..."
      : description;

  let createdBy = "Usuario desconocido";
  if (book.user && (book.user.username || book.user.email)) {
    createdBy = book.user.username || book.user.email;
  }

  const createdAt = book.createdAt ? new Date(book.createdAt) : null;
  const dateStr = createdAt
    ? createdAt.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "fecha desconocida";

  meta.textContent = `Añadido por ${createdBy} · ${dateStr}`;

  card.addEventListener("click", () => {
    openBookDetail(book._id);
  });

  btnDetail.addEventListener("click", (e) => {
    e.stopPropagation();
    openBookDetail(book._id);
  });

  return card;
}

async function openBookDetail(bookId) {
  try {
    state.currentBookId = bookId;

    const book = await apiFetch(`/books/${encodeURIComponent(bookId)}`, {
      method: "GET",
    });

    fillBookDetail(book);
    el.bookDetailSection.classList.remove("hidden");
    if (el.booksSection) el.booksSection.classList.add("hidden");
    if (el.accountSection) el.accountSection.classList.add("hidden");

    await loadReviewsForBook(bookId);

    updateAuthUI();
  } catch (err) {
    console.error(err);
    showMessage("No se pudo cargar el detalle del libro.", "error");
  }
}

function fillBookDetail(book) {
  el.detailTitle.textContent = book.title || "Título desconocido";
  el.detailAuthor.textContent = book.author ? `de ${book.author}` : "";

  let createdBy = "Usuario desconocido";
  if (book.user && (book.user.username || book.user.email)) {
    createdBy = book.user.username || book.user.email;
  }

  const createdAt = book.createdAt ? new Date(book.createdAt) : null;
  const dateStr = createdAt
    ? createdAt.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "fecha desconocida";

  el.detailMeta.textContent = `Añadido por ${createdBy} el ${dateStr}`;

  el.detailDescription.textContent =
    book.description || "Sin descripción disponible.";

  const coverUrl = book.coverImage || "https://via.placeholder.com/200";
  el.detailCover.src = coverUrl;
  el.detailCover.alt = `Portada de ${book.title || "libro"}`;
}

function closeBookDetail() {
  state.currentBookId = null;
  el.bookDetailSection.classList.add("hidden");
  if (el.booksSection) el.booksSection.classList.remove("hidden");
}

// ===== RESEÑAS (lectura) =====
async function loadReviewsForBook(bookId) {
  try {
    const reviews = await apiFetch(
      `/reviews/book/${encodeURIComponent(bookId)}`,
      { method: "GET" }
    );
    renderReviews(Array.isArray(reviews) ? reviews : []);
  } catch (err) {
    console.error("Error cargando reseñas:", err);
    renderReviews([]);
  }
}

function renderReviews(reviews) {
  el.reviewsList.innerHTML = "";

  if (!reviews.length) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "Todavía no hay reseñas para este libro.";
    el.reviewsList.appendChild(p);
    return;
  }

  reviews.forEach((review) => {
    const card = document.createElement("article");
    card.className = "review-card";

    const rating = Number(review.rating) || 0;
    const stars = "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating); // decorativo

    const header = document.createElement("div");
    header.className = "review-card__header";

    const userSpan = document.createElement("span");
    userSpan.className = "review-card__user";
    userSpan.textContent =
      (review.user && (review.user.username || review.user.email)) ||
      "Usuario anónimo";

    const ratingSpan = document.createElement("span");
    ratingSpan.className = "review-card__rating";
    ratingSpan.textContent = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;

    header.appendChild(userSpan);
    header.appendChild(ratingSpan);

    const commentP = document.createElement("p");
    commentP.className = "review-card__comment";
    commentP.textContent = review.comment || "";

    card.appendChild(header);
    card.appendChild(commentP);

    el.reviewsList.appendChild(card);
  });
}

// ===== HANDLERS: AUTH =====
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showMessage("Rellena email y contraseña.", "error");
    return;
  }

  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    if (!data || !data.token) {
      throw new Error("Respuesta de login inesperada.");
    }

    setToken(data.token);
    setUserEmail(email);

    if (data.user && data.user.username) {
      setUserName(data.user.username);
    } else {
      setUserName("");
    }

    updateAuthUI();
    showMessage("Sesión iniciada correctamente.");
  } catch (err) {
    console.error(err);
    showMessage(err.message || "No se pudo iniciar sesión.", "error");
  }
}

async function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;
  const password2 = document.getElementById("register-password2").value;

  if (!username || !email || !password || !password2) {
    showMessage("Rellena todos los campos.", "error");
    return;
  }

  if (password !== password2) {
    showMessage("Las contraseñas no coinciden.", "error");
    return;
  }

  try {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: { username, email, password },
    });

    if (!data || !data.token) {
      throw new Error("Respuesta de registro inesperada.");
    }

    setToken(data.token);
    setUserEmail(email);
    setUserName(username);

    updateAuthUI();
    showMessage("Cuenta creada e inicio de sesión correcto.");
    setAuthTab("login");
  } catch (err) {
    console.error(err);
    showMessage(err.message || "No se pudo registrar el usuario.", "error");
  }
}

function handleLogout() {
  clearToken();
  setUserEmail("");
  setUserName("");
  updateAuthUI();
  showHomeView();
  showMessage("Sesión cerrada.");
}

// ===== HANDLERS: LIBROS / RESEÑAS =====
async function handleNewBook(event) {
  event.preventDefault();

  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  const description = document
    .getElementById("book-description")
    .value.trim();
  const coverImage = document.getElementById("book-cover").value.trim();

  if (!title || !author || !description) {
    showMessage("Título, autor y descripción son obligatorios.", "error");
    return;
  }

  const payload = {
    title,
    author,
    description,
  };

  if (coverImage) {
    payload.coverImage = coverImage;
  }

  try {
    const newBook = await apiFetch("/books", {
      method: "POST",
      body: payload,
    });

    state.books.unshift(newBook);
    renderBooks();
    showMessage("Libro creado correctamente.");

    el.newBookForm.reset();
  } catch (err) {
    console.error(err);
    showMessage(err.message || "No se pudo crear el libro.", "error");
  }
}

async function handleNewReview(event) {
  event.preventDefault();

  if (!state.currentBookId) {
    showMessage("No hay libro seleccionado.", "error");
    return;
  }

  const rating = Number(el.reviewRating.value);
  const comment = el.reviewComment.value.trim();

  if (!rating || !comment) {
    showMessage("Puntuación y comentario son obligatorios.", "error");
    return;
  }

  const payload = {
    bookId: state.currentBookId,
    rating,
    comment,
  };

  try {
    await apiFetch("/reviews", {
      method: "POST",
      body: payload,
    });

    el.reviewForm.reset();
    showMessage("Reseña publicada correctamente.");
    await loadReviewsForBook(state.currentBookId);
  } catch (err) {
    console.error(err);
    showMessage(err.message || "No se pudo publicar la reseña.", "error");
  }
}

// ===== EVENTOS =====
function initEventListeners() {
  // Tabs auth
  el.tabLogin.addEventListener("click", () => setAuthTab("login"));
  el.tabRegister.addEventListener("click", () => setAuthTab("register"));

  // Formularios auth
  el.loginForm.addEventListener("submit", handleLogin);
  el.registerForm.addEventListener("submit", handleRegister);

  // Nav superior
  el.btnNavHome.addEventListener("click", () => {
    showHomeView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  el.btnNavLogin.addEventListener("click", () => {
    if (isLoggedIn()) {
      showAccountView();
    } else {
      document.querySelector(".sidebar").scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  // Logout (en panel de cuenta)
  el.btnLogout.addEventListener("click", handleLogout);

  // Libro nuevo
  el.newBookForm.addEventListener("submit", handleNewBook);

  // Detalle
  el.btnCloseDetail.addEventListener("click", () => {
    closeBookDetail();
  });

  // Reseña
  el.reviewForm.addEventListener("submit", handleNewReview);
}

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  setAuthTab("login");
  updateAuthUI();
  showHomeView();
  loadBooks();
});
