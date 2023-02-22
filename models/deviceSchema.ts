import mongoose, { Schema, Document } from 'mongoose';

export interface DeviceData {
  [key: string]: string | number;
}

export interface Device extends Document {
  name: string;
  location: string;
  data: DeviceData[];
}

const deviceSchema: Schema = new Schema({
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
          type: mongoose.Schema.Types.Mixed,
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

export default deviceSchema;