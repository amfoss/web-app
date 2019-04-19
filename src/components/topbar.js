import React from 'react';
import { Navbar, Button } from '@blueprintjs/core';

class Topbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>amFOSS App</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
          </Navbar.Group>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Topbar;
