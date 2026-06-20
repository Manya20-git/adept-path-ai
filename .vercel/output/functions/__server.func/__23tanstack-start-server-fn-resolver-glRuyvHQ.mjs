//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-glRuyvHQ.js
var manifest = { "729fe7e1bca7b53fc698f05380199640b983d62d008b2d810b401881366deb9f": {
	functionName: "analyzeResume_createServerFn_handler",
	importer: () => import("./_ssr/ai.functions-jNPTq2yy.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
