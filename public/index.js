"use strict";

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");
const canvas = document.getElementById("cosmic-canvas");
const context = canvas.getContext("2d");
const engineSelect = document.getElementById("engine-select");
const settingsTrigger = document.getElementById("settings-trigger");
const settingsPanel = document.getElementById("settings-panel");
const settingsClose = document.getElementById("settings-close");
const starsToggle = document.getElementById("stars-toggle");
const motionToggle = document.getElementById("motion-toggle");
const accentSelect = document.getElementById("accent-select");
const particleSelect = document.getElementById("particle-select");
const compactToggle = document.getElementById("compact-toggle");
const privateToggle = document.getElementById("private-toggle");
const particleCountInput = document.getElementById("particle-count");
const clearSession = document.getElementById("clear-session");
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
const discordCta = document.getElementById("discord-cta");
const discordClose = document.getElementById("discord-close");
const tabs = [];
let activeTabId = null;
let tabNumber = 0;
let particleStyle = "dust";
let particleCount = 300;
const defaultQuickLinks = [
	["YouTube", "https://www.youtube.com", "/quick-icons/youtube"],
	["Monochrome", "https://lossless.wtf"],
	["TikTok", "https://www.tiktok.com", "/quick-icons/tiktok"],
	["Discord", "https://discord.com", "/quick-icons/discord"],
	["GitHub", "https://github.com", "/quick-icons/github"],
	["GeForce Now", "https://play.geforcenow.com", "/quick-icons/geforce"],
	["Cineby", "https://cineby.gd", "/quick-icons/cineby"],
	["ChatGPT", "https://chatgpt.com", "/quick-icons/chatgpt"],
];
let userQuickLinks = JSON.parse(localStorage.getItem("atlas-quick-links") || "[]");
let removedQuickLinks = JSON.parse(localStorage.getItem("atlas-removed-quick-links") || "[]");
let loadingTimer;

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
	"This site was built in 5 minutes btw...",
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
const savedStars = localStorage.getItem("atlas-cosmic-dust");
const savedMotion = localStorage.getItem("atlas-reduced-motion");
const savedAccent = localStorage.getItem("atlas-accent");
const savedParticleStyle = localStorage.getItem("atlas-particle-style");
const savedParticleCount = localStorage.getItem("atlas-particle-count");
const savedCompact = localStorage.getItem("atlas-compact");
const savedPrivate = localStorage.getItem("atlas-private");
const savedCloak = localStorage.getItem("atlas-cloak");
const savedPanicKey = localStorage.getItem("atlas-panic-key");
const savedPanicUrl = localStorage.getItem("atlas-panic-url");
if (searchEngines[savedEngine]) engineSelect.value = savedEngine;
if (savedStars !== null) starsToggle.checked = savedStars === "true";
if (savedMotion !== null) motionToggle.checked = savedMotion === "true";
if (savedAccent) accentSelect.value = savedAccent;
if (savedParticleStyle) particleStyle = savedParticleStyle;
if (savedParticleCount) particleCount = Number(savedParticleCount);
if (savedCompact !== null) compactToggle.checked = savedCompact === "true";
if (savedPrivate !== null) privateToggle.checked = savedPrivate === "true";
particleSelect.value = particleStyle;
particleCountInput.value = particleCount;
if (cloakPresets[savedCloak]) cloakSelect.value = savedCloak;
if (savedPanicKey) panicKeyInput.value = savedPanicKey;
if (savedPanicUrl) panicUrlInput.value = savedPanicUrl;
searchEngine.value = searchEngines[engineSelect.value];
document.body.classList.toggle("dust-hidden", !starsToggle.checked);
document.body.classList.toggle("reduced-motion", motionToggle.checked);
document.body.classList.toggle("compact-layout", compactToggle.checked);
document.body.classList.toggle("private-session", privateToggle.checked);

const accentColors = { silver: "#e4e5e1", cyan: "#8de7ed", amber: "#e9bd72", rose: "#ee8d9e" };
function applyAccent(name) {
	document.documentElement.style.setProperty("--accent", accentColors[name] || accentColors.silver);
	localStorage.setItem("atlas-accent", name);
}

function updateParticleSettings() {
	particleStyle = particleSelect.value;
	particleCount = Number(particleCountInput.value);
	rebuildParticles();
	localStorage.setItem("atlas-particle-style", particleStyle);
	localStorage.setItem("atlas-particle-count", String(particleCount));
}

settingsNav.forEach((button) => button.addEventListener("click", () => {
	document.getElementById(`settings-${button.dataset.settingsTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
	settingsNav.forEach((item) => item.classList.toggle("is-active", item === button));
}));
accentSelect.addEventListener("change", () => applyAccent(accentSelect.value));
particleSelect.addEventListener("change", updateParticleSettings);
particleCountInput.addEventListener("input", updateParticleSettings);
compactToggle.addEventListener("change", () => {
	document.body.classList.toggle("compact-layout", compactToggle.checked);
	localStorage.setItem("atlas-compact", String(compactToggle.checked));
});
privateToggle.addEventListener("change", () => {
	document.body.classList.toggle("private-session", privateToggle.checked);
	localStorage.setItem("atlas-private", String(privateToggle.checked));
});
clearSession.addEventListener("click", () => {
	["atlas-search-engine", "atlas-accent", "atlas-particle-style", "atlas-particle-count", "atlas-compact"].forEach((key) => localStorage.removeItem(key));
	window.location.reload();
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
starsToggle.addEventListener("change", () => {
	document.body.classList.toggle("dust-hidden", !starsToggle.checked);
	localStorage.setItem("atlas-cosmic-dust", String(starsToggle.checked));
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
				icon.removeAttribute("src");
				icon.classList.add("icon-fallback");
			}
		});
		open.append(icon);
		open.addEventListener("click", () => navigateTo(link.url));
		const remove = document.createElement("button");
		remove.type = "button";
		remove.className = "quick-link-remove";
		remove.textContent = "×";
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
		close.textContent = "×";
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

let stars = Array.from({ length: particleCount }, () => ({
	x: Math.random(), y: Math.random(), radius: Math.random() * 1.5 + 0.25,
	twinkle: Math.random() * Math.PI * 2,
}));

function rebuildParticles() {
	stars = Array.from({ length: particleCount }, () => ({
		x: Math.random(), y: Math.random(), radius: Math.random() * 1.5 + 0.25,
		twinkle: Math.random() * Math.PI * 2,
	}));
}
const pointer = { x: 0.5, y: 0.5, active: false };

function paintSky(time) {
	canvas.width = window.innerWidth * window.devicePixelRatio;
	canvas.height = window.innerHeight * window.devicePixelRatio;
	context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	const cursorX = pointer.x * window.innerWidth;
	const cursorY = pointer.y * window.innerHeight;
	const nebula = context.createRadialGradient(
		window.innerWidth * (0.45 + (pointer.x - 0.5) * 0.12),
		window.innerHeight * (0.5 + (pointer.y - 0.5) * 0.1), 0,
		window.innerWidth * 0.45, window.innerHeight * 0.7, window.innerWidth * 0.7
	);
	nebula.addColorStop(0, "rgba(186, 193, 202, 0.14)");
	nebula.addColorStop(0.35, "rgba(102, 112, 124, 0.07)");
	nebula.addColorStop(1, "rgba(0, 0, 0, 0)");
	context.fillStyle = nebula;
	context.fillRect(0, 0, window.innerWidth, window.innerHeight);
	stars.forEach((star) => {
		let x = star.x * window.innerWidth;
		let y = star.y * window.innerHeight;
		let pushX = 0;
		let pushY = 0;
		const distanceX = x - cursorX;
		const distanceY = y - cursorY;
		const distance = Math.hypot(distanceX, distanceY);
		if (pointer.active && distance < 230 && distance > 0) {
			const force = (230 - distance) / 230;
			pushX = (distanceX / distance) * force * 78;
			pushY = (distanceY / distance) * force * 78;
			x += pushX;
			y += pushY;
		}
		const alpha = 0.42 + Math.sin(star.twinkle) * 0.16;
		context.fillStyle = `rgba(235, 239, 244, ${alpha})`;
		if (pointer.active && distance < 230 && star.radius > 0.9) {
			context.strokeStyle = `rgba(190, 202, 215, ${alpha * 0.35})`;
			context.lineWidth = star.radius * 0.55;
			context.beginPath();
			context.moveTo(x - pushX * 0.08, y - pushY * 0.08);
			context.lineTo(x, y);
			context.stroke();
		}
		context.beginPath();
		if (particleStyle === "diamonds") {
			context.moveTo(x, y - star.radius * 2.2);
			context.lineTo(x + star.radius * 2.2, y);
			context.lineTo(x, y + star.radius * 2.2);
			context.lineTo(x - star.radius * 2.2, y);
			context.closePath();
			context.fill();
		} else if (particleStyle === "rings") {
			context.arc(x, y, star.radius * 1.8, 0, Math.PI * 2);
			context.strokeStyle = `rgba(235, 239, 244, ${alpha})`;
			context.stroke();
		} else {
			context.arc(x, y, star.radius, 0, Math.PI * 2);
			context.fill();
		}
		if (particleStyle === "crosses" || (particleStyle === "dust" && star.radius > 1.15)) {
			context.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
			context.lineWidth = 0.6;
			context.beginPath();
			context.moveTo(x - 7, y); context.lineTo(x + 7, y);
			context.moveTo(x, y - 7); context.lineTo(x, y + 7);
			context.stroke();
		}
	});
	if (pointer.active && !motionToggle.checked) {
		const cursorGlow = context.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 130);
		cursorGlow.addColorStop(0, "rgba(235, 239, 244, 0.12)");
		cursorGlow.addColorStop(1, "rgba(235, 239, 244, 0)");
		context.fillStyle = cursorGlow;
		context.beginPath();
		context.arc(cursorX, cursorY, 130, 0, Math.PI * 2);
		context.fill();
	}
	requestAnimationFrame(paintSky);
}

window.addEventListener("pointermove", (event) => {
	pointer.x = event.clientX / window.innerWidth;
	pointer.y = event.clientY / window.innerHeight;
	pointer.active = true;
});
window.addEventListener("pointerleave", () => { pointer.active = false; });
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

function activeFrame() {
	return tabs.find((tab) => tab.id === activeTabId)?.frame;
}

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
