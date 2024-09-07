"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleMessage = scheduleMessage;
var express = require("express");
var next = require("next");
var Client = require("@xmtp/xmtp-js").Client;
var ethers = require("ethers");
function base64ToUint8Array(base64) {
    var binaryString = atob(base64); // Decode base64 to binary string
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i); // Convert each char to its byte
    }
    return bytes;
}
var envVars = process.env;
if (!envVars.INFURA_API_KEY || !envVars.EMITER_CONTRACT_ADDRESS) {
    throw new Error("Missing required environment variables: INFURA_API_KEY, EMITER_CONTRACT_ADDRESS");
}
var infuraApiKey = envVars.INFURA_API_KEY;
var emiterContractAddress = envVars.EMITER_CONTRACT_ADDRESS;
var provider = new ethers.InfuraProvider("sepolia", infuraApiKey);
var contractAbi = [
    "event MessageScheduled(address indexed recipient, string messageContent)",
];
var contract = new ethers.Contract(emiterContractAddress, contractAbi, provider);
var clientOptions = { env: "dev" };
function initializeXMTP(xmtpKey) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!xmtpKey) return [3 /*break*/, 2];
                    return [4 /*yield*/, Client.create(ethers.Wallet.createRandom(), clientOptions)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, Client.create(null, __assign(__assign({}, clientOptions), { privateKeyOverride: base64ToUint8Array(xmtpKey) }))];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function scheduleMessage(recipient, messageContent, xmtpKey) {
    return __awaiter(this, void 0, void 0, function () {
        var xmtpClient, conversation, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log("Scheduled message to ".concat(recipient, ": messageContent is not logged here"));
                    return [4 /*yield*/, initializeXMTP(xmtpKey)];
                case 1:
                    xmtpClient = _a.sent();
                    return [4 /*yield*/, xmtpClient.conversations.newConversation(recipient)];
                case 2:
                    conversation = _a.sent();
                    return [4 /*yield*/, conversation.send(messageContent)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.error("Error scheduling message:", e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: dev });
var handle = app.getRequestHandler();
var port = 3001;
app.prepare().then(function () {
    var server = express();
    server.use(express.json());
    server.get("/api/ping", function (req, res) {
        res.send("Pong from Express!");
    });
    contract.on("MessageScheduled", function (recipient, messageContent, xmtpKey) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, scheduleMessage(recipient, messageContent, xmtpKey)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    server.post("/api/send-message", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, recipient, messageContent, xmtpKey, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    _a = _b.sent(), recipient = _a.recipient, messageContent = _a.messageContent, xmtpKey = _a.xmtpKey;
                    return [4 /*yield*/, scheduleMessage(recipient, messageContent, xmtpKey)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    res.status(500).send("An error occurred.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Default handler to allow Next.js to handle all other routes
    server.all("*", function (req, res) {
        return handle(req, res);
    });
    server.listen(port, function (err) {
        if (err)
            throw err;
        console.log("> Ready on http://localhost:".concat(port));
    });
});
