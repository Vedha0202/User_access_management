"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStatus = exports.getPendingRequests = exports.submitRequest = void 0;
const ormconfig_1 = require("../ormconfig");
const Request_1 = require("../entities/Request");
const User_1 = require("../entities/User");
const Software_1 = require("../entities/Software");
const requestRepo = ormconfig_1.AppDataSource.getRepository(Request_1.Request);
const softwareRepo = ormconfig_1.AppDataSource.getRepository(Software_1.Software);
const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
const submitRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { softwareId, accessType, reason } = req.body;
    try {
        const software = yield softwareRepo.findOneBy({ id: softwareId });
        if (!software) {
            res.status(404).json({ message: "Software not found" });
            return;
        }
        const user = yield userRepo.findOneBy({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const newRequest = requestRepo.create({
            software,
            user,
            accessType,
            reason,
            status: "Pending",
        });
        yield requestRepo.save(newRequest);
        res.status(201).json(newRequest);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to submit request" });
    }
});
exports.submitRequest = submitRequest;
const getPendingRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield requestRepo.find({
            where: { status: "Pending" },
            relations: ["user", "software"],
        });
        res.json(requests);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch requests" });
    }
});
exports.getPendingRequests = getPendingRequests;
const updateRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
        res.status(400).json({ message: "Invalid status" });
        return;
    }
    try {
        const request = yield requestRepo.findOneBy({ id: parseInt(id) });
        if (!request) {
            res.status(404).json({ message: "Request not found" });
            return;
        }
        request.status = status;
        yield requestRepo.save(request);
        res.json({ message: `Request ${status.toLowerCase()}` });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update request" });
    }
});
exports.updateRequestStatus = updateRequestStatus;
