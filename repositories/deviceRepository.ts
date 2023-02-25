import * as mongoose from 'mongoose';
import deviceSchema, {Device} from '../models/deviceSchema';


export default mongoose.model("devices", deviceSchema);