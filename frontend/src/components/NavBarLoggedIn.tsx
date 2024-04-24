import { User } from "../models/user"
import * as NovelsApi from "../network/novels_api"
import { Navbar, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

interface NavBarLoggedInProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedIn = ({user, onLogoutSuccessful}: NavBarLoggedInProps) => {
    async function logout() {
        try {
            await NovelsApi.logout()
            onLogoutSuccessful()
        } catch(error) {
            console.error(error)
            alert(error)
        }
    }
    return(
        <>
        <Navbar.Text className="me-2">
            Signed in as: {user.username}
        </Navbar.Text>
        <Navbar.Text as={Link} to="/reviews" style={{ color: 'var(--secondary-color)' }}>My Book Reviews</Navbar.Text>
        <Navbar.Text as={Link} to="/search" style={{ color: 'var(--secondary-color)' }}>Book Search</Navbar.Text>
        <Navbar.Text as={Link} to="/bookshelf" style={{ color: 'var(--secondary-color)' }}>My Bookshelf</Navbar.Text>
        <Button onClick={logout}>
            Log out
        </Button>
        </>
     )
}

export default NavBarLoggedIn