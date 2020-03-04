import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";


const IP_AVAILABLE_CONNECTION_TIME_IN_ONE_HOUR = 1000;
export const HOUR = 3600000;

export type ConnectionRecordDocument = mongoose.Document & {
   ip: string,
   lastConnectionTime: Date,
   availableConnectionTime: number
};

let connectionRecordSchema = new mongoose.Schema({
   ip: {
      type: String
   },
   lastConnectionTime: {
      type: Date
   },
   availableConnectionTime: {
      type: Number
   }
}, { timestamps: true })


export class ConnectionRecordModel extends modelHelper {
   /**
    * 紀錄此 ip 的連線紀錄
    * @param ip 
    */
   static async setRecord(ip: string): Promise<boolean> {
      let isExisted: boolean = false;

      try {
         let record = await ConnectionRecord.findOne({ ip: ip });
         if (record) {
            const now = Date.now()
            console.log(now, record.lastConnectionTime.getTime())
            if (now - record.lastConnectionTime.getTime() > HOUR) {
               let setedRecord = await ConnectionRecord.findOneAndUpdate({ ip: ip },
                  {
                     lastConnectionTime: now,
                     availableConnectionTime: IP_AVAILABLE_CONNECTION_TIME_IN_ONE_HOUR
                  }
               )
            } else {
               if (record.availableConnectionTime > 0) {
                  let setedRecord = await ConnectionRecord.findOneAndUpdate({ ip: ip },
                     {
                        $inc: {
                           availableConnectionTime: -1
                        }
                     }
                  )
               }
            }
            return true;
         } else {
            let newRecord = await new ConnectionRecord({
               ip: ip,
               lastConnectionTime: Date.now(),
               availableConnectionTime: IP_AVAILABLE_CONNECTION_TIME_IN_ONE_HOUR
            }).save()
            return true
         }
      } catch (err) {
         console.log("setRecord error err=", err)
         return false
      }

   }

   /**
    * 確認此 ip 可連線次數是否大於 0
    * @param ip 
    */
   static async checkIsHasAvailableConnectionTime(ip: string): Promise<boolean> {
      let record = await this.getRecord(ip);
      if (!record) return false;

      if (record.availableConnectionTime > 0) {
         return true
      } else {
         return false
      }
   }




   /**
    * 取得紀錄 by ip
    * @param ip 
    */
   static async getRecord(ip: string): Promise<ConnectionRecordDocument> {
      try {
         let record = await ConnectionRecord.findOne({ ip: ip });
         return record
      } catch (err) {
         return null
      }

   }

}
export const ConnectionRecord = mongoose.model<ConnectionRecordDocument>("ConnectionRecord", connectionRecordSchema);
