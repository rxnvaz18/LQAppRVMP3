import { User } from "../models/user"
import * as NovelsApi from "../network/novels_api"
import { Navbar, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import styles from '../styles/NavBar.module.css';

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
        <div className="d-flex align-items-center justify-content-between w-100">
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <div className={styles.navbar}>
                <Navbar.Text as={Link} to="/reviews" className={styles.navLink} style={{ color: 'var(--secondary-color)' }}>My Book Reviews</Navbar.Text>
                <Navbar.Text as={Link} to="/search" className={styles.navLink} style={{ color: 'var(--secondary-color)' }}>Book Search</Navbar.Text>
                <Navbar.Text as={Link} to="/bookshelf" className={styles.navLink} style={{ color: 'var(--secondary-color)' }}>My Bookshelf</Navbar.Text>
            </div>
            <Button onClick={logout}>
                Log out
            </Button>
        </div>
    </>
);
}

export default NavBarLoggedIn