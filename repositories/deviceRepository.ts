import * as mongoose from 'mongoose';
import deviceSchema from '../models/deviceSchema';


export default mongoose.model("devices", deviceSchema);