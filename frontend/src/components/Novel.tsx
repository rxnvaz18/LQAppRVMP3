import styles from "../styles/novel.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Novel as NovelModel } from "../models/novels";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NovelProps {
    novel: NovelModel,
    onNovelClicked: (novel: NovelModel) => void,
    onDeleteNovelClicked: (novel: NovelModel) => void,
    className?: string,
}

const Novel = ({ novel, onNovelClicked, onDeleteNovelClicked, className }: NovelProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = novel;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.novelCard} ${className}`}
            onClick={() => onNovelClicked(novel)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNovelClicked(novel);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Novel;