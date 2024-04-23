import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Novel } from "../models/novels";
import { NovelInput } from "../network/novels_api";
import * as NovelsApi from "../network/novels_api";
import TextInputField from "./form/TextInputField";

interface AddEditNovelReviewsProps {
    novelToEdit?: Novel,
    onDismiss: () => void,
    onNovelSaved: (novel: Novel) => void,
}

const AddEditNovelReviews = ({ novelToEdit, onDismiss, onNovelSaved }: AddEditNovelReviewsProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NovelInput>({
        defaultValues: {
            title: novelToEdit?.title || "",
            text: novelToEdit?.text || "",
        }
    });

    async function onSubmit(input: NovelInput) {
        try {
            let novelResponse: Novel;
            if (novelToEdit) {
                novelResponse = await NovelsApi.updateNovel(novelToEdit._id, input);
            } else {
                novelResponse = await NovelsApi.createNovel(input);
            }
            onNovelSaved(novelResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {novelToEdit ? "Edit novel review" : "Add novel review"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNovelForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNovelForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNovelReviews;