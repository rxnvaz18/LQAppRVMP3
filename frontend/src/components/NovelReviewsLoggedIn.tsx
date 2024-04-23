import { useEffect, useState } from 'react'
import { Button, Col, Row, Spinner } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { Novel as NovelReview } from '../models/novels'
import * as NovelsApi from "../network/novels_api"
import styles from "../styles/novelsreviews.module.css"
import styleUtils from "../styles/utils.module.css"
import AddEditNovelDialog from "./AddEditNovelReviews"
import Novel from './Novel'

const NovelReviewsLoggedIn = () => {

    const [novels, setNovels] = useState<NovelReview[]>([])
    const [novelsLoading, setNovelsLoading] = useState(true)
    const [showNovelsLoadingError, setShowNovelsLoadingError] = useState(false)

    const [showAddNovelDialog, setShowAddNovelDialog] = useState(false)
    const [novelToEdit, setNovelToEdit] = useState<NovelReview | null>(null)

    useEffect(() => {
        async function loadNovels() {
            try {
                setShowNovelsLoadingError(false)
                setNovelsLoading(true)
                const novels = await NovelsApi.fetchNovels()
                setNovels(novels)
            } catch (error) {
                console.error(error)
                setShowNovelsLoadingError(true)
            } finally {
                setNovelsLoading(false)
            }
        }
        loadNovels()
    }, [])

    async function deleteNovel(novel: NovelReview) {
        try {
            await NovelsApi.deleteNovel(novel._id)
            setNovels(novels.filter(existingNovel => existingNovel._id !== novel._id))
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    const novelsGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.novelsGrid}`}>
            {novels.map(novel => (
                <Col key={novel._id}>
                    <Novel
                        novel={novel}
                        onNovelClicked={setNovelToEdit}
                        onDeleteNovelClicked={deleteNovel}
                        className={styles.novel}
                    />
                </Col>
            ))}
        </Row>

    return (
        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddNovelDialog(true)}>
                <FaPlus />
                Add new book review
            </Button>
            {novelsLoading && <Spinner animation='border' variant='primary' />}
            {showNovelsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!novelsLoading && !showNovelsLoadingError &&
                <>
                    {novels.length > 0
                        ? novelsGrid
                        : <p>You don't have any book reviews yet</p>
                    }
                </>
            }
            {showAddNovelDialog &&
                <AddEditNovelDialog
                    onDismiss={() => setShowAddNovelDialog(false)}
                    onNovelSaved={(newNovel) => {
                        setNovels([...novels, newNovel])
                        setShowAddNovelDialog(false)
                    }}
                />
            }
            {novelToEdit &&
                <AddEditNovelDialog
                    novelToEdit={novelToEdit}
                    onDismiss={() => setNovelToEdit(null)}
                    onNovelSaved={(updatedNovel) => {
                        setNovels(novels.map(existingNovel => existingNovel._id === updatedNovel._id ? updatedNovel : existingNovel))
                        setNovelToEdit(null)
                    }}
                />
            }
        </>
    )
}

export default NovelReviewsLoggedIn