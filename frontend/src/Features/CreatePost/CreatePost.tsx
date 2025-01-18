import {IconPencil} from "@tabler/icons-react";
import {Button} from "@mantine/core";
import {ModificationModal} from "../shared/components/ModificationModal";
import {PostForm} from "./components/PostForm";
import {useRef, useState} from "react";
import {useAlert} from "../../Providers/AlertProvider.tsx";
import api from "../shared/services/api.ts";
import {useTranslation} from "react-i18next";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const contentRef = useRef(content);
  const [images, setImages] = useState<File[]>([]);
  const imagesRef = useRef(images);
  const alert = useAlert();
  const {t} = useTranslation('createPost');

  const handleContentChange = (html: string) => {
    setContent(html);
    contentRef.current = html;
  };

  const handleImagesChange = (files: File[]) => {
    setImages(files);
    imagesRef.current = files;
  };

  const handleCreatePost = async () => {
    const contentToSave = contentRef.current;
    const images = imagesRef.current;

    // Validation, at least one of the fields should be filled
    if (!contentToSave && images.length === 0) {
      alert.showError({
        title: t("createPost.alertError.title"),
        message: t("createPost.alertError.message"),
        level: "WARNING",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Prepare form data
    const formData = new FormData();
    if (contentToSave) formData.append("content", contentToSave);
    images.forEach((image) => {
      formData.append(`pictures`, image);
    });

    const response = await api.post("/api/posts", formData);

    if (response.status === 200) {
      alert.showError({
        title: t("createPost.alertSuccess.title"),
        message: t("createPost.alertSuccess.message"),
        level: "INFO",
        timestamp: new Date().toISOString(),
      });
      close();
    }
  };

  return (
    <Button
      variant="subtle"
      size="md"
      leftSection={<IconPencil/>}
      fullWidth
      justify="flex-start"
      color="gray"
      onClick={() =>
        ModificationModal({
          handleAction: () => {
            handleCreatePost().catch();
          },
          title: t("createPost.modal.title"),
          buttonConfirmText: t("createPost.modal.buttonConfirmText"),
          buttonCancelText: t("createPost.modal.buttonCancelText"),
          buttonConfirmColor: "blue",
          childrenContent: (
            <PostForm
              handleContentChange={handleContentChange}
              setImages={handleImagesChange}
              dropzoneText={t('createPostForm.dropzone.text')}
              dropzoneDimmedText={t('createPostForm.dropzone.textDimmed')}
            />
          ),
        })
      }
    >
      {t("createPost.children")}
    </Button>
  );
};
