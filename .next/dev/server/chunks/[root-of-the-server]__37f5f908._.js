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
"[project]/app/api/rates/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * POST /api/rates
 *
 * Get live prices & availability for hotels
 *
 * Request Body:
 * {
 *   "hotelIds": ["lp3803c", "lp24a8"],           // Array of hotel IDs
 *   "checkin": "2024-12-20",                      // Check-in date (YYYY-MM-DD)
 *   "checkout": "2024-12-22",                     // Check-out date (YYYY-MM-DD)
 *   "currency": "USD",                            // Currency code
 *   "guestNationality": "US",                     // Guest country code
 *   "occupancies": [                              // Rooms and guests
 *     {
 *       "rooms": 1,
 *       "adults": 2,
 *       "children": [5, 7]                        // Optional: children ages
 *     }
 *   ],
 *   "guestId": "guest123"                         // Optional: guest identifier
 * }
 *
 * Example: POST /api/rates
 */ __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liteapi$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/liteapi-client.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        // Validate required fields
        const requiredFields = [
            'hotelIds',
            'checkin',
            'checkout',
            'currency',
            'guestNationality',
            'occupancies'
        ];
        for (const field of requiredFields){
            if (!body[field]) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Bad Request',
                    message: `Missing required field: ${field}`
                }, {
                    status: 400
                });
            }
        }
        // Validate hotel IDs is an array
        if (!Array.isArray(body.hotelIds) || body.hotelIds.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Bad Request',
                message: 'hotelIds must be a non-empty array'
            }, {
                status: 400
            });
        }
        // Log in development
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('💰 Fetching rates for hotels:', {
                hotels: body.hotelIds,
                dates: `${body.checkin} to ${body.checkout}`,
                occupancies: body.occupancies
            });
        }
        // Call LiteAPI SDK
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$liteapi$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["liteApiClient"].getFullRates(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error('❌ Error fetching rates:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error',
            message: error.message || 'Failed to fetch rates',
            details: ("TURBOPACK compile-time truthy", 1) ? error : "TURBOPACK unreachable"
        }, {
            status: error.status || 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__37f5f908._.js.map