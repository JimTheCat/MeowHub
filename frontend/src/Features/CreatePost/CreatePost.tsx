import {IconPencil} from "@tabler/icons-react";
import {Button} from "@mantine/core";
import {ModificationModal} from "../shared/components/ModificationModal";
import {PostForm} from "./components/PostForm";
import {useRef, useState} from "react";
import {useAlert} from "../../Providers/AlertProvider.tsx";
import api from "../shared/services/api.ts";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const contentRef = useRef(content);
  const [images, setImages] = useState<File[]>([]);
  const imagesRef = useRef(images);
  const alert = useAlert();

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

    // Walidacja: musi być treść lub zdjęcia
    if (!contentToSave && images.length === 0) {
      alert.showError({
        title: "Error",
        message: "Post cannot be empty. Please add content or images.",
        level: "WARNING",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Prepare form data
    const formData = new FormData();
    if (contentToSave) formData.append("content", contentToSave);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    // TODO: After photos integration
    const response = await api.post("/api/posts", formData, {
      headers: {"Content-Type": "multipart/form-data"},
    });

    if (response.status === 200) {
      alert.showError({
        title: "Success",
        message: "Post created successfully!",
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
          handleAction: handleCreatePost,
          title: "Create post",
          buttonConfirmText: "Create",
          buttonConfirmColor: "blue",
          childrenContent: (
            <PostForm
              handleContentChange={handleContentChange}
              setImages={handleImagesChange}
            />
          ),
        })
      }
    >
      Create post
    </Button>
  );
};
