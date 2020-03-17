import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const Header = () => {
  return (
    <div className="bg-danger">
      <div className="container ">
        <Navbar color="faded" dark expand="md">
          <NavbarBrand href="/">CoViz</NavbarBrand>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
