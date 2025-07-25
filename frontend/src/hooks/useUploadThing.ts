import { generateReactHelpers } from "@uploadthing/react";
import { type FileRouter } from "uploadthing/server";

export const { useUploadThing, uploadFiles } = generateReactHelpers<FileRouter>({
    url: "http://localhost:5001/api/uploadthing",
});
