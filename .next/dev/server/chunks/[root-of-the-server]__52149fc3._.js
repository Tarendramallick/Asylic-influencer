module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/Jay/Asylic-influencer/app/api/auth/instagram/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Jay$2f$Asylic$2d$influencer$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Jay/Asylic-influencer/node_modules/next/server.js [app-route] (ecmascript)");
;
function GET() {
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!clientId) {
        console.error("[v0] Missing NEXT_PUBLIC_INSTAGRAM_APP_ID environment variable");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Jay$2f$Asylic$2d$influencer$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Instagram app is not configured. Please add NEXT_PUBLIC_INSTAGRAM_APP_ID to environment variables."
        }, {
            status: 500
        });
    }
    if (!appUrl) {
        console.error("[v0] Missing NEXT_PUBLIC_APP_URL environment variable");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Jay$2f$Asylic$2d$influencer$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "App URL is not configured. Please add NEXT_PUBLIC_APP_URL to environment variables."
        }, {
            status: 500
        });
    }
    const redirectUri = `${appUrl}/api/auth/instagram/callback`;
    const scope = "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights";
    try {
        const authUrl = new URL("https://www.instagram.com/oauth/authorize");
        authUrl.searchParams.set("client_id", clientId);
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("scope", scope);
        authUrl.searchParams.set("response_type", "code");
        console.log("[v0] Instagram OAuth redirect URL constructed");
        console.log("[v0] App URL:", appUrl);
        console.log("[v0] Redirect URI:", redirectUri);
        console.log("[v0] Client ID:", clientId ? clientId.substring(0, 10) + "..." : "MISSING");
        console.log("[v0] Full auth URL:", authUrl.toString());
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Jay$2f$Asylic$2d$influencer$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(authUrl.toString());
    } catch (error) {
        console.error("[v0] Instagram auth route error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Jay$2f$Asylic$2d$influencer$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to initiate Instagram login"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__52149fc3._.js.map