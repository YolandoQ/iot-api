"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const deviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    data: {
        type: [
            {
                _id: false,
                key: {
                    type: String,
                    required: true,
                },
                value: {
                    type: mongoose_1.default.Schema.Types.Mixed,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
        default: [],
    },
});
exports.default = deviceSchema;
