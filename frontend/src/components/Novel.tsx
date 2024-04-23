import styles from "../styles/novel.module.css"
import { Card } from "react-bootstrap"
import {Novel as NovelReview} from "../models/novels"



interface NovelProps {
    novel: NovelReview,
}
const Novel = ({novel}: NovelProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = novel
    return (
        <Card className={styles.novelCard}>
            <Card.Body>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>

        </Card>
    )

}
export default Novel