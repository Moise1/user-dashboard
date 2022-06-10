import React from 'react';
import '../../sass/managed-servers.scss';
const ManageServer = () => {
  return (
    <div className='container'>
      <h1>NO API Managed Server</h1>
      <table>
        <tr>       
          <td>Subscription</td>
          <td>Channel</td>
          <td>Username</td>
          <td>	Store Password</td>
        </tr>
        <hr/>
        <tr>        
          <td className='manage-server-section1'>NO API Server</td>
          <td className='manage-server-section2'><input placeholder='Amazon no api amazon uk api'/></td>
          <td className='manage-server-section3'><input placeholder='Enter amazon seller email'/></td>
          <td className='manage-server-section4'><input placeholder='****************'/></td>
        </tr>
      </table>
    </div>
  );
};

export default ManageServer;