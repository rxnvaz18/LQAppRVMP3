import * as NovelsApi from "../network/novels_api"
import { Navbar, Button } from "react-bootstrap"
interface NavBarLoggedOutProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOut = ({onSignUpClicked, onLoginClicked}: NavBarLoggedOutProps) => {
    return(
        <>
        
        <Button onClick={onSignUpClicked}>Sign Up</Button>
        <Button onClick={onLoginClicked}>Log In</Button>
        </>
     )
}

export default NavBarLoggedOut