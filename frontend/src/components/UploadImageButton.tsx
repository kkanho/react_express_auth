import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUploadThing } from "../hooks/useUploadThing";
import { type FileRouter } from "uploadthing/server";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface UploadImageButtonProps {
  endpoint: keyof FileRouter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClientUploadComplete?: (res: any[]) => void;
  onUploadError?: (error: Error) => void;
  onUploadingChange?: (uploading: boolean) => void;
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({
  endpoint,
  onUploadingChange,
  onClientUploadComplete,
  onUploadError,
}) => {
  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete,
    onUploadError,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const res = await startUpload(Array.from(files));
        if (onClientUploadComplete && res) {
          onClientUploadComplete(res);
        }
      } catch (error) {
        if (onUploadError && error instanceof Error) {
          onUploadError(error);
        }
      }
    }
  };

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading]);

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      disabled={isUploading}
      sx={{ width: "100%", justifyContent: "center" }}
    >
      {isUploading ? "Uploading..." : "Upload Profile Picture"}
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleFileChange}
      />
    </Button>
  );
};

export default UploadImageButton;
