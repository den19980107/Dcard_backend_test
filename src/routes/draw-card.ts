import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { ConnectionRecordModel, HOUR } from '../models/connectionRecord';
const router = express.Router();

// 取得目前登入的 user 資料
router.get('/', connectionLimitMiddleware, _getCurrentLoginUserRoute)

/**
 * [GET] /drawCard
 * @param req 
 * @param res 
 */
function _getCurrentLoginUserRoute(req, res) {
   res.sendStatus(200)
}

/**
 * 限制每小時來自同一個 IP 的請求數量不得超過 1000
 * 在 response headers 中加入剩餘的請求數量 (X-RateLimit-Remaining) 以及 rate limit 歸零的時間 (X-RateLimit-Reset)
 * @param req 
 * @param res 
 */
async function connectionLimitMiddleware(req, res, next: NextFunction) {
   const ip = req.ip
   let isSuccess = await ConnectionRecordModel.setRecord(ip);
   if (isSuccess) {
      let isHasAvailableConnectionTime = await ConnectionRecordModel.checkIsHasAvailableConnectionTime(ip)
      let record = await ConnectionRecordModel.getRecord(ip)
      if (isHasAvailableConnectionTime) {
         req.connationData = {
            allowConnection: true,
            availableTime: record.availableConnectionTime
         }
         res.set({
            'X-RateLimit-Remaining': record.availableConnectionTime,
            'X-RateLimit-Reset': new Date(record.lastConnectionTime.getTime() + HOUR)
         })
         next();
      } else {
         res.sendStatus(429)
      }
   } else {
      res.sendStatus(500)
   }
}


export = router;
