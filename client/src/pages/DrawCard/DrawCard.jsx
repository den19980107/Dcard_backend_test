import React, { useEffect, useState } from 'react';
import axios from 'axios'

// import component 
import { message, Spin, Icon } from 'antd'
import Card from './Card'
const DrawCard = () => {

   const [availableTime, setAvailableTime] = useState(null);
   const [nextReflashTime, setNextReflashTime] = useState(null);
   useEffect(() => {
      getData()
   }, [])

   const getData = async () => {
      try {
         let data = await axios.get('/api/drawCard');
         setAvailableTime(data.headers["x-ratelimit-remaining"])
         setNextReflashTime(new Date(data.headers["x-ratelimit-reset"]).toLocaleString())
      } catch (err) {
         message.error(err.response.data)
      }
   }

   return (
      <div>
         {availableTime && nextReflashTime ?
            <div style={{ backgroundColor: "rgb(0,51,79)" }}>
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ padding: "1rem" }}>
                     <h3 style={{ color: "white" }}>剩餘次數 {availableTime}</h3>
                     <h3 style={{ color: "white" }}>下次更新時間 {nextReflashTime}</h3>
                  </div>
               </div>
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <Card></Card>
               </div>
            </div>
            :
            <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
               <Icon type="loading" style={{ fontSize: 64 }} spin />
            </div>
         }
      </div>
   );
};

export default DrawCard;