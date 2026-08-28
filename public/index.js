"use strict";

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");
const canvas = document.getElementById("cosmic-canvas");
const context = canvas.getContext("2d");
const title = document.querySelector("h1");
const titleSampler = document.createElement("canvas");
const titleSamplerContext = titleSampler.getContext("2d", { willReadFrequently: true });
const engineSelect = document.getElementById("engine-select");
const settingsTrigger = document.getElementById("settings-trigger");
const dockBrowser = document.getElementById("dock-browser");
const dockApps = document.getElementById("dock-apps");
const dockGames = document.getElementById("dock-games");
const dockAi = document.getElementById("dock-ai");
const aiClose = document.getElementById("ai-close");
const appsPanel = document.getElementById("apps-panel");
const appsGrid = document.getElementById("apps-grid");
const appsClose = document.getElementById("apps-close");
const themeSelect = document.getElementById("theme-select");
const backgroundUpload = document.getElementById("background-upload");
const backgroundReset = document.getElementById("background-reset");
const studentClock = document.getElementById("student-clock");
const studentDate = document.getElementById("student-date");
const pomodoroTime = document.getElementById("pomodoro-time");
const pomodoroStart = document.getElementById("pomodoro-start");
const pomodoroReset = document.getElementById("pomodoro-reset");
const studentNotes = document.getElementById("student-notes");
const calculatorInput = document.getElementById("calculator-input");
const calculatorResult = document.getElementById("calculator-result");
const homeClock = document.getElementById("home-clock");
const homeDate = document.getElementById("home-date");
const homeWeather = document.getElementById("home-weather");
const settingsClock = document.getElementById("settings-clock");
const settingsTimezone = document.getElementById("settings-timezone");
const settingsPanel = document.getElementById("settings-panel");
const settingsClose = document.getElementById("settings-close");
const motionToggle = document.getElementById("motion-toggle");
const accentSelect = document.getElementById("accent-select");
const titleSizeSelect = document.getElementById("title-size-select");
const gridToggle = document.getElementById("grid-toggle");
const shortcutLabelsToggle = document.getElementById("shortcut-labels-toggle");
const compactToggle = document.getElementById("compact-toggle");
const privateToggle = document.getElementById("private-toggle");
const clearSession = document.getElementById("clear-session");
const openAboutBlank = document.getElementById("open-about-blank");
const settingsNav = document.querySelectorAll("[data-settings-target]");
const cloakSelect = document.getElementById("cloak-select");
const panicKeyInput = document.getElementById("panic-key");
const panicUrlInput = document.getElementById("panic-url");
const loadingScreen = document.getElementById("loading-screen");
const loadingMessage = document.getElementById("loading-message");
const tabList = document.getElementById("tab-list");
const newTabButton = document.getElementById("new-tab");
const sidebarCollapse = document.getElementById("sidebar-collapse");
const quickLinks = document.getElementById("quick-links");
const quickLinkAdd = document.getElementById("quick-link-add");
const quickLinkForm = document.getElementById("quick-link-form");
const quickLinkName = document.getElementById("quick-link-name");
const quickLinkUrl = document.getElementById("quick-link-url");
const quickLinkCancel = document.getElementById("quick-link-cancel");
const navAddress = document.getElementById("nav-address");
const navForm = document.getElementById("nav-form");
const navBack = document.getElementById("nav-back");
const navForward = document.getElementById("nav-forward");
const navReload = document.getElementById("nav-reload");
const navHome = document.getElementById("nav-home");
const navFullscreen = document.getElementById("nav-fullscreen");
const discordCta = document.getElementById("discord-cta");
const discordClose = document.getElementById("discord-close");
const atlasKicker = document.getElementById("atlas-kicker");
const tabs = [];
let activeTabId = null;
let tabNumber = 0;
let titleParticles = [];
const defaultQuickLinks = [
	["YouTube", "https://www.youtube.com", "/quick-icons/youtube"],
	["Monochrome", "https://lossless.wtf"],
	["TikTok", "https://www.tiktok.com", "/quick-icons/tiktok"],
	["Discord", "https://discord.com", "/quick-icons/discord"],
	["GitHub", "https://github.com", "/quick-icons/github"],
	["GeForce Now", "https://play.geforcenow.com", "/quick-icons/geforce"],
	["Toustream", "https://toustream.xyz"],
	["ChatGPT", "https://chatgpt.com", "/quick-icons/chatgpt"],
];
const apps = [
	["Amazon", "https://www.amazon.com"],
	["Apple Music", "https://music.apple.com"],
	["Bing", "https://www.bing.com"],
	["Toustream", "https://toustream.xyz"],
	["CrazyGames", "https://www.crazygames.com"],
	["Disney+", "https://www.disneyplus.com"],
	["DuckDuckGo", "https://duckduckgo.com"],
	["YouTube", "https://www.youtube.com", "/quick-icons/youtube"],
	["TikTok", "https://www.tiktok.com", "/quick-icons/tiktok"],
	["Discord", "https://discord.com", "/quick-icons/discord"],
	["GitHub", "https://github.com", "/quick-icons/github"],
	["GitLab", "https://gitlab.com"],
	["Google", "https://www.google.com"],
	["ChatGPT", "https://chatgpt.com", "/quick-icons/chatgpt"],
	["GeForce Now", "https://play.geforcenow.com", "/quick-icons/geforce"],
	["Reddit", "https://www.reddit.com"],
	["Spotify", "https://open.spotify.com"],
	["Twitch", "https://www.twitch.tv"],
	["X", "https://x.com"],
	["YouTube Music", "https://music.youtube.com"],
];
let userQuickLinks = JSON.parse(localStorage.getItem("atlas-quick-links") || "[]");
let removedQuickLinks = JSON.parse(localStorage.getItem("atlas-removed-quick-links") || "[]");
let loadingTimer;

const kickerMessages = [
	"Boxed is OUR daddy btw",
	"The Cake is a Lie",
	"better than fern",
	"better than lucide",
	"better than cherry",
	"grass grows, birds fly, sun shines",
	"this site is NOT vibecoded - Claude",
	"print(\"hello\")",
	"the F students btw",
	"did you finsih your work?",
	":3",
	"I think oliver tree made that song",
	"It's not diamonds, its La peace",
	"watch ntts on yotube, he cool",
	"\"Why ts got ads bruh\"",
	"Message could not load, try again....bruh",
	"this site was made in 2 days",
];
atlasKicker.textContent = kickerMessages[Math.floor(Math.random() * kickerMessages.length)];

discordClose.addEventListener("click", (event) => {
	event.preventDefault();
	event.stopPropagation();
	discordCta.classList.add("is-dismissed");
});
const loadingMessages = [
	"Finding your page...",
	"Warming up the wormhole...",
	"Asking the internet nicely...",
	"Charting a course through the open sky...",
	"Dusting off the cosmic bookmarks...",
	"Checking if the page remembered its password...",
	"Aligning the stars with your URL...",
	"Almost there. Probably.",
	"Preparing your workspace...",
];
const cloakPresets = {
	atlas: { title: "Atlas -Simple History", icon: "/favicon.svg", type: "image/svg+xml" },
	dashboard: { title: "Dashboard", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/canvas-lms.svg", type: "image/svg+xml" },
	google: { title: "Google", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google.svg", type: "image/svg+xml" },
	drive: { title: "Drive", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google-drive.svg", type: "image/svg+xml" },
	classroom: { title: "Google Classroom", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google-classroom.svg", type: "image/svg+xml" },
	classlink: { title: "ClassLink", icon: "https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1754430588/irvingisdnet/xrkyyzsceg7augnqbvc6/Classlink.png", type: "image/png" },
	schoology: { title: "Schoology", icon: "https://cdn.jsdelivr.net/gh/selfhst/icons/svg/powerschool.svg", type: "image/svg+xml" },
	teams: { title: "Microsoft Teams", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-teams.svg", type: "image/svg+xml" },
	khan: { title: "Khan Academy", icon: "https://img.icons8.com/color/512/khan-academy.png", type: "image/png" },
	"infinite-campus": { title: "Infinite Campus", icon: "https://play-lh.googleusercontent.com/vpeVtG8j59HK8eL61PZYyHQQSBsjmuK53TFYXSVB8qlDelslYC_v5-hASVrOlmKQrfgoHF9ToHOSsEgM9G-Ghw=s0-br30", type: "image/png" },
	waygrounds: { title: "Waygrounds", icon: "https://play-lh.googleusercontent.com/YjmAyuvS6sE_A84W6xMebT9ytjrL-hp61VAMSGsgs81z5l6Kj7d8uOIBBDLjVxO3jgyR2KQbwI8IRdH2T-Ft3A=w600-h300-pc0xffffff-pd", type: "image/png" },
};

const searchEngines = {
	duckduckgo: "https://duckduckgo.com/?q=%s",
	bing: "https://www.bing.com/search?q=%s",
	google: "https://www.google.com/search?q=%s",
	brave: "https://search.brave.com/search?q=%s",
	startpage: "https://www.startpage.com/sp/search?query=%s",
};
const savedEngine = localStorage.getItem("atlas-search-engine");
const savedMotion = localStorage.getItem("atlas-reduced-motion");
const savedAccent = { silver: "white", cyan: "blue", amber: "orange", rose: "pink" }[localStorage.getItem("atlas-accent")] || localStorage.getItem("atlas-accent");
const savedTitleSize = localStorage.getItem("atlas-title-size");
const savedGrid = localStorage.getItem("atlas-grid");
const savedShortcutLabels = localStorage.getItem("atlas-shortcut-labels");
const savedTheme = localStorage.getItem("atlas-theme") || "black";
const savedBackground = localStorage.getItem("atlas-background");
const savedCompact = localStorage.getItem("atlas-compact");
const savedPrivate = localStorage.getItem("atlas-private");
const savedCloak = localStorage.getItem("atlas-cloak");
const savedPanicKey = localStorage.getItem("atlas-panic-key");
const savedPanicUrl = localStorage.getItem("atlas-panic-url");
if (searchEngines[savedEngine]) engineSelect.value = savedEngine;
if (savedMotion !== null) motionToggle.checked = savedMotion === "true";
if (savedAccent) accentSelect.value = savedAccent;
if (savedTitleSize) titleSizeSelect.value = savedTitleSize;
if (savedGrid !== null) gridToggle.checked = savedGrid === "true";
if (savedShortcutLabels !== null) shortcutLabelsToggle.checked = savedShortcutLabels === "true";
themeSelect.value = savedTheme;
studentNotes.value = localStorage.getItem("atlas-notes") || "";
if (savedCompact !== null) compactToggle.checked = savedCompact === "true";
if (savedPrivate !== null) privateToggle.checked = savedPrivate === "true";
if (cloakPresets[savedCloak]) cloakSelect.value = savedCloak;
if (savedPanicKey) panicKeyInput.value = savedPanicKey;
if (savedPanicUrl) panicUrlInput.value = savedPanicUrl;
searchEngine.value = searchEngines[engineSelect.value];
document.body.classList.toggle("reduced-motion", motionToggle.checked);
document.body.classList.toggle("compact-layout", compactToggle.checked);
document.body.classList.toggle("private-session", privateToggle.checked);
document.body.classList.toggle("grid-hidden", !gridToggle.checked);
document.body.classList.toggle("hide-shortcut-labels", !shortcutLabelsToggle.checked);
document.body.classList.add(`theme-${themeSelect.value}`);
if (savedBackground) document.body.style.setProperty("--custom-background", `url(${savedBackground})`);

const accentColors = { white: "#e4e5e1", red: "#ef6b6b", green: "#82c98b", blue: "#78a9e8", orange: "#e8a15b", pink: "#e48bb7" };
const titleSizes = { small: [4, 1.0], medium: [3.4, 1.2], large: [2.8, 1.45] };
function applyAccent(name) {
	const color = accentColors[name] || accentColors.white;
	document.documentElement.style.setProperty("--accent", color);
	document.documentElement.style.setProperty("--accent-soft", `${color}33`);
	document.documentElement.style.setProperty("--accent-faint", `${color}18`);
	localStorage.setItem("atlas-accent", name);
}

function rebuildTitleParticleSize() {
	titleParticles = [];
	rebuildTitleParticles();
}

settingsNav.forEach((button) => button.addEventListener("click", () => {
	document.getElementById(`settings-${button.dataset.settingsTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
	settingsNav.forEach((item) => item.classList.toggle("is-active", item === button));
}));
accentSelect.addEventListener("change", () => applyAccent(accentSelect.value));
titleSizeSelect.addEventListener("change", () => {
	localStorage.setItem("atlas-title-size", titleSizeSelect.value);
	rebuildTitleParticleSize();
});
gridToggle.addEventListener("change", () => {
	document.body.classList.toggle("grid-hidden", !gridToggle.checked);
	localStorage.setItem("atlas-grid", String(gridToggle.checked));
});
shortcutLabelsToggle.addEventListener("change", () => {
	document.body.classList.toggle("hide-shortcut-labels", !shortcutLabelsToggle.checked);
	localStorage.setItem("atlas-shortcut-labels", String(shortcutLabelsToggle.checked));
});
themeSelect.addEventListener("change", () => {
	document.body.classList.remove("theme-black", "theme-blue", "theme-violet", "theme-sunset");
	document.body.classList.add(`theme-${themeSelect.value}`);
	localStorage.setItem("atlas-theme", themeSelect.value);
});
backgroundUpload.addEventListener("change", () => {
	const [file] = backgroundUpload.files;
	if (!file || !file.type.startsWith("image/")) return;
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		try {
			localStorage.setItem("atlas-background", reader.result);
			document.body.style.setProperty("--custom-background", `url(${reader.result})`);
		} catch (error) {
			backgroundUpload.setCustomValidity("This image is too large to save locally");
		}
	});
	reader.readAsDataURL(file);
});
backgroundReset.addEventListener("click", () => {
	localStorage.removeItem("atlas-background");
	document.body.style.removeProperty("--custom-background");
	backgroundUpload.value = "";
});
compactToggle.addEventListener("change", () => {
	document.body.classList.toggle("compact-layout", compactToggle.checked);
	localStorage.setItem("atlas-compact", String(compactToggle.checked));
});
privateToggle.addEventListener("change", () => {
	document.body.classList.toggle("private-session", privateToggle.checked);
	localStorage.setItem("atlas-private", String(privateToggle.checked));
});
clearSession.addEventListener("click", () => {
	["atlas-search-engine", "atlas-accent", "atlas-title-size", "atlas-grid", "atlas-shortcut-labels", "atlas-theme", "atlas-background", "atlas-notes", "atlas-compact"].forEach((key) => localStorage.removeItem(key));
	window.location.reload();
});
openAboutBlank.addEventListener("click", () => {
	const blankWindow = window.open("about:blank", "_blank");
	if (!blankWindow) return;
	const base = blankWindow.document.createElement("base");
	base.href = window.location.href;
	blankWindow.document.head.append(base);
	blankWindow.document.title = document.title;
	blankWindow.document.body.innerHTML = document.body.innerHTML;
	Array.from(document.querySelectorAll("style, link[rel='stylesheet'], script")).forEach((source) => {
		const copy = blankWindow.document.importNode(source, true);
		if (source.tagName === "SCRIPT") copy.removeAttribute("defer");
		blankWindow.document.head.append(copy);
	});
	setSettingsOpen(false);
});
applyAccent(accentSelect.value);

function applyCloak(presetName) {
	const preset = cloakPresets[presetName] || cloakPresets.atlas;
	document.title = preset.title;
	let favicon = document.querySelector("link[rel='icon']");
	if (!favicon) {
		favicon = document.createElement("link");
		favicon.rel = "icon";
		document.head.append(favicon);
	}
	favicon.type = preset.type;
	favicon.href = preset.icon;
	localStorage.setItem("atlas-cloak", presetName);
}

function setSettingsOpen(isOpen) {
	settingsPanel.setAttribute("aria-hidden", String(!isOpen));
	settingsTrigger.setAttribute("aria-expanded", String(isOpen));
	settingsPanel.classList.toggle("is-open", isOpen);
}

settingsTrigger.addEventListener("click", () => setSettingsOpen(!settingsPanel.classList.contains("is-open")));
dockBrowser.addEventListener("click", () => {
		document.body.classList.remove("apps-open");
		dockApps.setAttribute("aria-expanded", "false");
		appsPanel.setAttribute("aria-hidden", "true");
		showNewTab();
});
dockApps.addEventListener("click", () => {
		const isOpen = document.body.classList.toggle("apps-open");
		dockApps.setAttribute("aria-expanded", String(isOpen));
		appsPanel.setAttribute("aria-hidden", String(!isOpen));
});
dockGames.addEventListener("click", () => navigateTo("https://ofogames.com/"));
dockAi.addEventListener("click", () => {
	document.body.classList.remove("apps-open");
	dockApps.setAttribute("aria-expanded", "false");
	appsPanel.setAttribute("aria-hidden", "true");
	document.body.classList.add("ai-open");
	navigateTo("https://venice.ai/chat/agent");
});
aiClose.addEventListener("click", () => {
	document.body.classList.remove("ai-open");
	showNewTab();
});
appsClose.addEventListener("click", () => {
		document.body.classList.remove("apps-open");
	dockApps.setAttribute("aria-expanded", "false");
	appsPanel.setAttribute("aria-hidden", "true");
});

function renderApps() {
	appsGrid.replaceChildren();
	apps.forEach(([name, url, iconUrl]) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "app-shortcut";
		button.title = name;
		const icon = document.createElement("img");
		icon.src = iconUrl || `https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`;
		icon.alt = "";
		icon.addEventListener("error", () => {
			const fallback = document.createElement("span");
			fallback.className = "app-logo-fallback";
			fallback.textContent = name.slice(0, 1).toUpperCase();
			icon.replaceWith(fallback);
		}, { once: true });
		const label = document.createElement("span");
		label.textContent = name;
		button.append(icon, label);
		button.addEventListener("click", () => {
			document.body.classList.remove("apps-open");
			dockApps.setAttribute("aria-expanded", "false");
			appsPanel.setAttribute("aria-hidden", "true");
			navigateTo(url);
		});
		appsGrid.append(button);
	});
}
renderApps();

let pomodoroSeconds = 25 * 60;
let pomodoroTimer = null;
function updatePomodoro() {
	pomodoroTime.textContent = `${String(Math.floor(pomodoroSeconds / 60)).padStart(2, "0")}:${String(pomodoroSeconds % 60).padStart(2, "0")}`;
}
pomodoroStart.addEventListener("click", () => {
	if (pomodoroTimer) {
		clearInterval(pomodoroTimer);
		pomodoroTimer = null;
		pomodoroStart.textContent = "Start";
		return;
	}
	pomodoroStart.textContent = "Pause";
	pomodoroTimer = setInterval(() => {
		pomodoroSeconds = Math.max(0, pomodoroSeconds - 1);
		updatePomodoro();
		if (!pomodoroSeconds) {
			clearInterval(pomodoroTimer);
			pomodoroTimer = null;
			pomodoroStart.textContent = "Start";
		}
	}, 1000);
});
pomodoroReset.addEventListener("click", () => {
	clearInterval(pomodoroTimer);
	pomodoroTimer = null;
	pomodoroSeconds = 25 * 60;
	pomodoroStart.textContent = "Start";
	updatePomodoro();
});
studentNotes.addEventListener("input", () => localStorage.setItem("atlas-notes", studentNotes.value));
calculatorInput.addEventListener("input", () => {
	try {
		const expression = calculatorInput.value.replace(/[^0-9+\-*/().% ]/g, "").trim();
		const result = expression ? Function(`"use strict"; return (${expression})`)() : 0;
		calculatorResult.textContent = `= ${Number.isFinite(result) ? result : "?"}`;
	} catch (error) {
		calculatorResult.textContent = "= ?";
	}
});
function updateStudentClock() {
	const now = new Date();
	studentClock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	studentDate.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}
updateStudentClock();
setInterval(updateStudentClock, 1000);

function updateClocks() {
	const now = new Date();
	const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
	const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
	homeClock.textContent = time;
	homeDate.textContent = date;
	settingsClock.textContent = time;
	settingsTimezone.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}
updateClocks();
setInterval(updateClocks, 1000);

async function loadWeather() {
	if (!navigator.geolocation) return;
	try {
		const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 }));
		const { latitude, longitude } = position.coords;
		const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`);
		if (!response.ok) throw new Error("Weather request failed");
		const data = await response.json();
		const weatherNames = { 0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Cloudy", 45: "Foggy", 51: "Drizzle", 61: "Rain", 71: "Snow", 80: "Showers", 95: "Storm" };
		homeWeather.textContent = `${Math.round(data.current.temperature_2m)}°F · ${weatherNames[data.current.weather_code] || "Weather"}`;
	} catch (error) {
		homeWeather.textContent = "Weather unavailable";
	}
}
loadWeather();
settingsClose.addEventListener("click", () => setSettingsOpen(false));
settingsPanel.addEventListener("click", (event) => {
	if (event.target === settingsPanel) setSettingsOpen(false);
});
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") setSettingsOpen(false);
	const panicKey = panicKeyInput.value.trim().toLowerCase();
	const isEditing = ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName);
	if (panicKey && event.key.toLowerCase() === panicKey && !isEditing) {
		const fallback = panicUrlInput.value.trim();
		if (/^https?:\/\//i.test(fallback)) window.location.assign(fallback);
	}
});
engineSelect.addEventListener("change", () => {
	searchEngine.value = searchEngines[engineSelect.value];
	localStorage.setItem("atlas-search-engine", engineSelect.value);
});
motionToggle.addEventListener("change", () => {
	document.body.classList.toggle("reduced-motion", motionToggle.checked);
	localStorage.setItem("atlas-reduced-motion", String(motionToggle.checked));
});

cloakSelect.addEventListener("change", () => applyCloak(cloakSelect.value));
panicKeyInput.addEventListener("input", () => {
	panicKeyInput.value = panicKeyInput.value.slice(-1).toUpperCase();
	localStorage.setItem("atlas-panic-key", panicKeyInput.value);
});
panicUrlInput.addEventListener("change", () => {
	try {
		const url = new URL(panicUrlInput.value);
		if (!/^https?:$/.test(url.protocol)) throw new Error("Only web URLs are supported");
		panicUrlInput.value = url.toString();
		localStorage.setItem("atlas-panic-url", panicUrlInput.value);
	} catch (err) {
		panicUrlInput.setCustomValidity("Enter a valid http or https URL");
	}
});
panicUrlInput.addEventListener("input", () => panicUrlInput.setCustomValidity(""));
applyCloak(cloakSelect.value);

function tabName(url) {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch (err) {
		return `Tab ${tabNumber}`;
	}
}

function renderQuickLinks() {
	quickLinks.replaceChildren();
	const availableDefaults = defaultQuickLinks.map(([name, url, icon]) => ({ name, url, icon, defaultKey: name })).filter((link) => !removedQuickLinks.includes(link.defaultKey));
	[...availableDefaults, ...userQuickLinks].forEach((link, index) => {
		const item = document.createElement("div");
		item.className = "quick-link-item";
		const open = document.createElement("button");
		open.type = "button";
		open.className = "quick-link-open";
		open.setAttribute("aria-label", link.name);
		open.title = link.name;
		open.dataset.label = link.name;
		const icon = document.createElement("img");
		const hostname = new URL(link.url).hostname;
		icon.src = link.icon || `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
		icon.alt = "";
		icon.loading = "lazy";
		icon.addEventListener("error", () => {
			if (link.icon && !icon.dataset.retried) {
				icon.dataset.retried = "true";
				icon.src = `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
			} else if (!icon.src.includes("google.com/s2")) {
				icon.src = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
			} else {
				const fallback = document.createElement("span");
				fallback.className = "app-logo-fallback";
				fallback.textContent = link.name.slice(0, 1).toUpperCase();
				icon.replaceWith(fallback);
			}
		});
		const label = document.createElement("span");
		label.className = "quick-link-label";
		label.textContent = link.name;
		open.append(icon, label);
		open.addEventListener("click", () => navigateTo(link.url));
		const remove = document.createElement("button");
		remove.type = "button";
		remove.className = "quick-link-remove";
		remove.innerHTML = '<img class="control-icon png-icon" src="/ui-icons/close.png" alt="" />';
		remove.setAttribute("aria-label", `Remove ${link.name}`);
		remove.addEventListener("click", () => {
			if (link.defaultKey) removedQuickLinks.push(link.defaultKey);
			else userQuickLinks.splice(index - availableDefaults.length, 1);
			localStorage.setItem("atlas-quick-links", JSON.stringify(userQuickLinks));
			localStorage.setItem("atlas-removed-quick-links", JSON.stringify(removedQuickLinks));
			renderQuickLinks();
		});
		item.append(open, remove);
		quickLinks.append(item);
	});
}

function setQuickLinkFormOpen(isOpen) {
	quickLinkForm.setAttribute("aria-hidden", String(!isOpen));
	quickLinkForm.classList.toggle("is-open", isOpen);
	if (isOpen) quickLinkName.focus();
}

quickLinkAdd.addEventListener("click", () => setQuickLinkFormOpen(true));
quickLinkCancel.addEventListener("click", () => setQuickLinkFormOpen(false));
quickLinkForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const url = new URL(quickLinkUrl.value).toString();
	userQuickLinks.push({ name: quickLinkName.value.trim(), url, removable: true });
	localStorage.setItem("atlas-quick-links", JSON.stringify(userQuickLinks));
	quickLinkForm.reset();
	setQuickLinkFormOpen(false);
	renderQuickLinks();
});

renderQuickLinks();

function renderTabs() {
	tabList.replaceChildren();
	tabs.forEach((tab) => {
		const item = document.createElement("div");
		item.className = `tab-item${tab.id === activeTabId ? " is-active" : ""}`;
		item.setAttribute("role", "presentation");
		const button = document.createElement("button");
		button.className = "tab-select";
		button.type = "button";
		button.setAttribute("role", "tab");
		button.setAttribute("aria-selected", String(tab.id === activeTabId));
		button.title = tab.url || "New tab";
		button.innerHTML = `<span class="tab-dot"></span><span class="tab-title sidebar-label">${tab.title}</span>`;
		button.addEventListener("click", () => activateTab(tab.id));
		const close = document.createElement("button");
		close.className = "tab-close";
		close.type = "button";
		close.setAttribute("aria-label", `Close ${tab.title}`);
		close.innerHTML = '<img class="control-icon png-icon" src="/ui-icons/close.png" alt="" />';
		close.addEventListener("click", (event) => {
			event.stopPropagation();
			closeTab(tab.id);
		});
		item.append(button, close);
		tabList.append(item);
	});
}

function updateNavAddress() {
	const activeTab = tabs.find((tab) => tab.id === activeTabId);
	navAddress.value = activeTab?.url || "";
}

function activateTab(tabId) {
	const tab = tabs.find((entry) => entry.id === tabId);
	if (!tab) return;
	activeTabId = tabId;
	tabs.forEach((entry) => {
		if (entry.frame) entry.frame.style.display = entry.id === tabId ? "block" : "none";
	});
	if (tab.isNewTab) {
		document.body.classList.remove("browsing");
		document.body.classList.add("new-tab-open");
		renderTabs();
		updateNavAddress();
		address.focus();
		return;
	}
	document.body.classList.remove("new-tab-open");
	document.body.classList.add("browsing");
	renderTabs();
	updateNavAddress();
}

function createTab(url) {
	tabNumber += 1;
	const tab = { id: `tab-${tabNumber}`, title: tabName(url), url, frame: null, isNewTab: false };
	tabs.push(tab);
	activateTab(tab.id);
	return tab;
}

function createNewTabPage() {
	tabNumber += 1;
	const tab = { id: `tab-${tabNumber}`, title: "New tab", url: "", frame: null, isNewTab: true };
	tabs.push(tab);
	activeTabId = tab.id;
	tabs.forEach((entry) => { if (entry.frame) entry.frame.style.display = "none"; });
	document.body.classList.remove("browsing");
	document.body.classList.add("new-tab-open");
	address.value = "";
	renderTabs();
	address.focus();
	return tab;
}

function openUrlInTab(tab, url) {
	if (!tab.frame) {
		tab.frame = document.createElement("iframe");
		tab.frame.className = "tab-frame";
		tab.frame.title = `Atlas tab ${tabNumber}`;
		tab.frame.loading = "eager";
		tab.frame.onload = stopLoading;
		document.body.append(tab.frame);
	}
	tab.title = tabName(url);
	tab.url = url;
	tab.isNewTab = false;
	renderTabs();
	activateTab(tab.id);
	return tab;
}

function activeFrame() {
	return tabs.find((tab) => tab.id === activeTabId)?.frame;
}

async function toggleFullscreen() {
	const frame = activeFrame();
	if (!frame) return;
	if (document.fullscreenElement) await document.exitFullscreen();
	else await frame.requestFullscreen();
}

navFullscreen.addEventListener("click", () => toggleFullscreen().catch(() => {}));
document.addEventListener("fullscreenchange", () => {
	const isFullscreen = Boolean(document.fullscreenElement);
	navFullscreen.setAttribute("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
	navFullscreen.title = isFullscreen ? "Exit fullscreen" : "Fullscreen";
});

function closeTab(tabId) {
	const tabIndex = tabs.findIndex((entry) => entry.id === tabId);
	if (tabIndex === -1) return;
	const [tab] = tabs.splice(tabIndex, 1);
	if (tab.frame) tab.frame.remove();
	if (activeTabId !== tabId) {
		renderTabs();
		return;
	}
	const nextTab = tabs[tabIndex] || tabs[tabIndex - 1];
	if (nextTab) activateTab(nextTab.id);
	else showNewTab();
}

function showNewTab() {
	createNewTabPage();
}

sidebarCollapse.addEventListener("click", () => {
	const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
	sidebarCollapse.setAttribute("aria-expanded", String(!isCollapsed));
	sidebarCollapse.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
});
newTabButton.addEventListener("click", showNewTab);
createNewTabPage();

function startLoading() {
	let messageIndex = 0;
	loadingMessage.textContent = loadingMessages[messageIndex];
	loadingScreen.setAttribute("aria-hidden", "false");
	loadingScreen.classList.add("is-visible");
	clearInterval(loadingTimer);
	loadingTimer = setInterval(() => {
		messageIndex = (messageIndex + 1) % loadingMessages.length;
		loadingMessage.classList.add("is-changing");
		setTimeout(() => {
			loadingMessage.textContent = loadingMessages[messageIndex];
			loadingMessage.classList.remove("is-changing");
		}, 420);
	}, 3600);
}

function stopLoading() {
	clearInterval(loadingTimer);
	loadingScreen.setAttribute("aria-hidden", "true");
	loadingScreen.classList.remove("is-visible");
}

function rebuildTitleParticles() {
	const bounds = title.getBoundingClientRect();
	const fontSize = Number.parseFloat(getComputedStyle(title).fontSize);
	const sampleScale = 2;
	titleSampler.width = Math.max(1, Math.floor(bounds.width * sampleScale));
	titleSampler.height = Math.max(1, Math.floor(bounds.height * sampleScale));
	titleSamplerContext.clearRect(0, 0, titleSampler.width, titleSampler.height);
	titleSamplerContext.fillStyle = "#fff";
	titleSamplerContext.font = `900 ${fontSize * sampleScale}px "Archivo Black"`;
	titleSamplerContext.textAlign = "center";
	titleSamplerContext.textBaseline = "middle";
	titleSamplerContext.fillText(title.textContent, titleSampler.width / 2, titleSampler.height / 2);
	const pixels = titleSamplerContext.getImageData(0, 0, titleSampler.width, titleSampler.height).data;
	const points = [];
	for (let y = 0; y < titleSampler.height; y += 16) {
		for (let x = 0; x < titleSampler.width; x += 16) {
			if (pixels[(y * titleSampler.width + x) * 4 + 3] > 120) {
				const index = points.length;
				points.push({
					homeX: x / sampleScale,
					homeY: y / sampleScale,
					x: x / sampleScale,
					y: y / sampleScale,
					velocityX: 0,
					velocityY: 0,
					size: titleSizes[titleSizeSelect.value]?.[0] + (index % 3) * titleSizes[titleSizeSelect.value]?.[1],
				});
			}
		}
	}
	titleParticles = points;
}

function paintTitleParticles() {
	if (!titleParticles.length) rebuildTitleParticles();
	const bounds = title.getBoundingClientRect();
	const cursorX = pointer.x * window.innerWidth;
	const cursorY = pointer.y * window.innerHeight;
	const now = performance.now();
	const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#e4e5e1";
	titleParticles.forEach((particle, index) => {
		const homeX = bounds.left + particle.homeX;
		const homeY = bounds.top + particle.homeY;
		const distanceX = homeX - cursorX;
		const distanceY = homeY - cursorY;
		const distance = Math.hypot(distanceX, distanceY);
		let forceX = 0;
		let forceY = 0;
		if (pointer.active && distance < 150 && distance > 0) {
			const force = ((150 - distance) / 150) * 2.8;
			forceX = (distanceX / distance) * force;
			forceY = (distanceY / distance) * force;
		}
		const springForce = 0.075;
		const damping = 0.82;
		particle.velocityX = (particle.velocityX + (homeX - (bounds.left + particle.x)) * springForce + forceX) * damping;
		particle.velocityY = (particle.velocityY + (homeY - (bounds.top + particle.y)) * springForce + forceY) * damping;
		particle.x += particle.velocityX;
		particle.y += particle.velocityY;
		const x = bounds.left + particle.x;
		const y = bounds.top + particle.y;
		const shimmer = 0.86 + Math.sin(now * 0.0015 + index) * 0.1;
		context.fillStyle = accent;
		context.globalAlpha = shimmer;
		context.shadowColor = accent;
		context.shadowBlur = 13;
		context.beginPath();
		context.arc(x, y, particle.size / 2, 0, Math.PI * 2);
		context.fill();
		context.shadowBlur = 0;
		context.globalAlpha = 1;
	});
}
const pointer = { x: 0.5, y: 0.5, active: false };

function paintSky(time) {
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	if (!document.body.classList.contains("browsing")) paintTitleParticles();
	requestAnimationFrame(paintSky);
}

window.addEventListener("pointermove", (event) => {
	pointer.x = event.clientX / window.innerWidth;
	pointer.y = event.clientY / window.innerHeight;
	pointer.active = true;
});
window.addEventListener("pointerleave", () => { pointer.active = false; });
function resizeCanvas() {
	const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
	canvas.width = window.innerWidth * pixelRatio;
	canvas.height = window.innerHeight * pixelRatio;
	context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	titleParticles = [];
	rebuildTitleParticles();
}
window.addEventListener("resize", resizeCanvas);
document.fonts?.ready.then(rebuildTitleParticles);
resizeCanvas();
requestAnimationFrame(paintSky);

const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	files: {
		wasm: '/scram/scramjet.wasm.wasm',
		all: '/scram/scramjet.all.js',
		sync: '/scram/scramjet.sync.js',
	},
});

scramjet.init();

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

async function navigateTo(url) {
	startLoading();
	try {
		await registerSW();
	} catch (err) {
		stopLoading();
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		return;
	}
	let wispUrl =
		(location.protocol === "https:" ? "wss" : "ws") +
		"://" +
		location.host +
		"/wisp/";
	if ((await connection.getTransport()) !== "/epoxy/index.mjs") {
		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
	const sjEncode = scramjet.encodeUrl.bind(scramjet);
	let tab = tabs.find((entry) => entry.id === activeTabId);
	if (!tab || !tab.isNewTab) tab = createTab(url);
	openUrlInTab(tab, url).frame.src = sjEncode(url);
	navAddress.value = url;
	error.textContent = "";
	errorCode.textContent = "";
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	navigateTo(search(address.value, searchEngine.value));
});

navForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const frame = activeFrame();
	if (!navAddress.value.trim()) return;
	const url = search(navAddress.value, searchEngine.value);
	if (!frame) {
		navigateTo(url);
		return;
	}
	startLoading();
	const tab = tabs.find((entry) => entry.id === activeTabId);
	tab.url = url;
	tab.title = tabName(url);
	renderTabs();
	frame.src = scramjet.encodeUrl(url);
});
navBack.addEventListener("click", () => {
	try { activeFrame()?.contentWindow.history.back(); } catch (err) {}
});
navForward.addEventListener("click", () => {
	try { activeFrame()?.contentWindow.history.forward(); } catch (err) {}
});
navReload.addEventListener("click", () => {
	const frame = activeFrame();
	if (frame) { startLoading(); frame.contentWindow.location.reload(); }
});
navHome.addEventListener("click", showNewTab);
