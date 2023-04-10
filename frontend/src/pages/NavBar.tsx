// import { LinkContainer } from "react-router-bootstrap";
// import Navbar from "react-bootstrap/Navbar"; // change Nav to Navbar
// import Nav from "react-bootstrap/Nav";

// export default function NavBar() {
//     return (
//       <div className="App container py-3">
//         <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
//           <LinkContainer to="/">
//             <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle />
//           <Navbar.Collapse className="justify-content-end">
//             <Nav activeKey={window.location.pathname}>
//               <LinkContainer to="/signup">
//                 <Nav.Link>Signup</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/">
//                 <Nav.Link>Login</Nav.Link>
//               </LinkContainer>
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar>
//       </div>
//     );
// }
import React from 'react';
import { Button, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
 
    <Space>
      <Button danger type="text">
        Logout
      </Button>
      </Space>
    
  </Space>

);

export default App;