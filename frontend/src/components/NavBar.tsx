import { Container, Navbar, Nav } from "react-bootstrap"
import { User } from "../models/user"
import NavBarLoggedIn from "./NavBarLoggedIn"
import NavBarLoggedOut from "./NavBarLoggedOut"
import { Link } from 'react-router-dom'


interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void, 
}
const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful}: NavBarProps) => {
    return ( 
        <Navbar variant="dark" expand="lg" sticky="top" >
        <Container>
        <Navbar.Brand as={Link} to="/">LitQuest</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar"/>
            <Navbar.Collapse id="main-navbar">
                <Nav className="ms-auto">
                    { loggedInUser 
                    ? <NavBarLoggedIn user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                    : <NavBarLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
) 
}
export default NavBar