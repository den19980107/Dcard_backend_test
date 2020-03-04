import React from 'react';
import './Card.css'
// import component
import Info from './Info'
import { Button } from 'antd'
const Card = () => {
   return (
      <div className="Dcard">
         <div className="header">
            <div className="blur-image">

            </div>
            <div className="avatar-container">
               <img className="avatar" src="https://i.imgur.com/Dj42qJ5.jpg"></img>
            </div>
            <div className="name">
               <h3>男同學</h3>
               <p>國立高雄科技大學 電腦與通訊工程系</p>
            </div>
         </div>
         <Info title="興趣專長" body="吉他"></Info>
         <Info title="參加過的社團" body="吉他社"></Info>
         <Info title="喜歡的課程" body="有關程式或音樂的課"></Info>
         <Info title="喜歡的國家" body="台灣"></Info>
         <Info title="自己最近的困擾" body="希望可以成功進入 Dcard"></Info>
         <Info title="可以交換的事情" body="新鮮的肝xd"></Info>
         <Info title="想嘗試的內容" body="到 Dcard 實習"></Info>
         <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
            <Button type="link" style={{ fontSize: "20px" }}>邀請加入Dcard</Button>
         </div>
      </div>
   );
};

export default Card;