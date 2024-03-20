import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Logo } from "../../images/img/Logo";
import NavBar from "./NavBar";
export default function Header() {
  return (
    <Navbar position="static" isBordered>
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {/* <Button
            as={Button}
            color="primary"
            href="#"
            variant="flat"
            startContent={<PiPlugsConnected />}
          >
            Connect
          </Button> */}
          <NavBar />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
