import { Container } from "react-bootstrap";
import NovelReviewsLoggedIn from "../components/NovelReviewsLoggedIn";
import NovelReviewsLoggedOut from "../components/NovelReviewsLoggedOut";
import { User } from "../models/user";
import styles from "../styles/NovelsPage.module.css";

interface NovelsPageProps {
    loggedInUser: User | null,
}

const NovelsPage = ({ loggedInUser }: NovelsPageProps) => {
    return (
        <Container className={styles.notesPage}>
            <>
                {loggedInUser
                    ? <NovelReviewsLoggedIn />
                    : <NovelReviewsLoggedOut />
                }
            </>
        </Container>
    );
}

export default NovelsPage;