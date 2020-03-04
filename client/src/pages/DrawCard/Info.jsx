import React from 'react';

const Info = ({ title, body }) => {
   return (
      <div style={{ padding: "0 1rem" }}>
         <div>
            <p style={{ color: "rgb(65,159,211)" }}>{title}</p>
         </div>
         <div>
            <p>{body}</p>
         </div>
      </div>
   );
};

export default Info;