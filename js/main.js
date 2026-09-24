/* =========================================================
   个人作品集 · 页面逻辑
   数据来自 js/data.js（PROFILE / PROJECTS），本文件只负责渲染与交互。
   ========================================================= */

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

/* ---------- 渲染：基本信息 / 技能 / 联系方式 ---------- */
function renderProfile() {
  $$(".js-name").forEach((el) => (el.textContent = PROFILE.name));
  $$(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));
  $(".js-role").textContent = PROFILE.role;
  $(".js-bio").textContent = PROFILE.bio;

  const avatar = $(".js-avatar");
  avatar.src = PROFILE.avatar;
  avatar.alt = `${PROFILE.name} 的头像`;

  // 首屏标题与简介
  const t = PROFILE.heroTitle;
  $(".hero-title").innerHTML = `${t.before}<em>${t.em}</em>${t.after}`;
  $(".js-hero-lead").textContent = PROFILE.heroLead;
  $(".js-kicker").textContent = `${PROFILE.nameEn} · PORTFOLIO ${new Date().getFullYear()}`;

  // 侧栏技能分组
  $("#skills").innerHTML = Object.entries(PROFILE.skills)
    .map(
      ([group, items]) => `
      <div class="skill-group">
        <h3 class="skill-title">${group}</h3>
        <ul class="skill-tags">
          ${items.map((item) => `<li class="skill-tag">${item}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");

  // 基本信息（首屏 meta 与基本信息区共用同一批 class）
  $$(".js-major").forEach((el) => (el.textContent = PROFILE.major));
  $$(".js-location").forEach((el) => (el.textContent = PROFILE.location));
  $$(".js-status").forEach((el) => (el.textContent = PROFILE.status));

  document.title = `${PROFILE.name} · 个人作品集`;
}

/* ---------- 渲染：关于我 ---------- */
function renderAbout() {
  $(".js-about-text").innerHTML = PROFILE.about.map((p) => `<p>${p}</p>`).join("");
}

/* ---------- 渲染：项目列表与分类筛选器 ---------- */
function projectTemplate(project, index) {
  const num = String(index + 1).padStart(2, "0");
  return `
    <article class="project reveal" data-category="${project.category}">
      <figure class="project-media">
        <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" />
      </figure>
      <div class="project-body">
        <div class="project-meta">
          <span class="project-num">${num}</span>
          <span class="project-date">${project.date}</span>
        </div>
        <div class="project-name-row">
          <h3 class="project-name">${project.name}</h3>
          <span class="project-tag">${project.category}</span>
        </div>
        <p class="project-desc">${project.description}</p>
        <ul class="project-highlights">
          ${project.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
        <ul class="project-stack">
          ${project.stack.map((s) => `<li>${s}</li>`).join("")}
        </ul>
        <div class="project-links">
          <a class="text-link" href="${project.link}" target="_blank" rel="noopener">查看演示 <span>→</span></a>
          <a class="text-link ghost" href="${project.repo}" target="_blank" rel="noopener">查看源码</a>
        </div>
      </div>
    </article>`;
}

function renderProjects() {
  $("#projectList").innerHTML = PROJECTS.map(projectTemplate).join("");
}

// 分类由项目数据自动汇总，新增项目后无需手动维护
function renderFilters() {
  const categories = ["全部", ...new Set(PROJECTS.map((p) => p.category))];
  $("#filters").innerHTML = categories
    .map((cat) => {
      const count =
        cat === "全部" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
      return `<button type="button" class="filter-btn" data-filter="${cat}">${cat}<sup>${count}</sup></button>`;
    })
    .join("");
  $("#filters").querySelector(".filter-btn").classList.add("is-active");
}

/* ---------- 交互：分类筛选 ---------- */
function initFilter() {
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    $$(".filter-btn").forEach((b) => b.classList.toggle("is-active", b === btn));
    const target = btn.dataset.filter;
    $$(".project").forEach((item) => {
      item.hidden = target !== "全部" && item.dataset.category !== target;
    });
  });
}

/* ---------- 交互：导航随滚动高亮 ---------- */
function initScrollSpy() {
  const links = $$(".nav-link");
  const sectionMap = new Map();
  links.forEach((link) => {
    const section = $(link.getAttribute("href"));
    if (section) sectionMap.set(section, link);
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        sectionMap.get(entry.target)?.classList.add("is-active");
      });
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );
  sectionMap.forEach((_link, section) => observer.observe(section));
}

/* ---------- 交互：进入视口时轻微渐显 ---------- */
function initReveal() {
  const els = $$(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduceMotion) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => observer.observe(el));
}

/* ---------- 交互：浅色 / 深色主题切换 ---------- */
const THEME_KEY = "preferred-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = $("#themeToggle");
  if (!btn) return;
  const isDark = theme === "dark";
  btn.setAttribute("aria-pressed", String(isDark));
  btn.setAttribute("aria-label", isDark ? "切换到浅色主题" : "切换到深色主题");
}

function initTheme() {
  // 优先使用用户上次的选择，否则跟随系统偏好
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved === "dark" || saved === "light" ? saved : prefersDark ? "dark" : "light");

  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

/* ---------- 启动 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProfile();
  renderAbout();
  renderFilters();
  renderProjects();
  initFilter();
  initScrollSpy();
  initReveal();
});
