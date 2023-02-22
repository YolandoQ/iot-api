"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const deviceSchema_1 = require("../models/deviceSchema");
exports.default = mongoose.model("devices", deviceSchema_1.default);
