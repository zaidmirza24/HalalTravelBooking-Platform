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
"[project]/lib/liteapi-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * LiteAPI SDK Client Wrapper
 *
 * Centralized LiteAPI SDK instance for server-side use only.
 * Ensures API key is never exposed to the client.
 */ __turbopack_context__.s([
    "liteApiClient",
    ()=>liteApiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$liteapi$2d$node$2d$sdk$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/liteapi-node-sdk/index.js [app-route] (ecmascript)");
;
// Validate API key exists
const apiKey = process.env.LITEAPI_KEY;
if (!apiKey) {
    throw new Error('LITEAPI_KEY environment variable is not set. Please check your .env.local file.');
}
const liteApiClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$liteapi$2d$node$2d$sdk$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(apiKey);
// Log initialization in development
if ("TURBOPACK compile-time truthy", 1) {
    console.log('✅ LiteAPI SDK initialized successfully');
}
}),
"[project]/app/api/hotel/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * GET /api/hotel/[id]
 *
 * Get detailed information about a single hotel
 *
 * Path Parameters:
 * - id: string (hotel ID from LiteAPI)
 *
 * Example: /api/hotel/lp3803c
 */ __turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liteapi$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liteapi-client.ts [app-route] (ecmascript)");
;
;
async function GET(request, context) {
    try {
        // Next.js 15: params is now a Promise
        const { id } = await context.params;
        // Validate hotel ID
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Bad Request',
                message: 'Hotel ID is required'
            }, {
                status: 400
            });
        }
        // Log in development
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('🏨 Fetching hotel details for ID:', id);
        }
        // Call LiteAPI SDK
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liteapi$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["liteApiClient"].getHotelDetails(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error('❌ Error fetching hotel details:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error',
            message: error.message || 'Failed to fetch hotel details',
            details: ("TURBOPACK compile-time truthy", 1) ? error : "TURBOPACK unreachable"
        }, {
            status: error.status || 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a2b634b._.js.map