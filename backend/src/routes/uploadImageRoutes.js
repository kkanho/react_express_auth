import { createUploadthing } from 'uploadthing/server';
import { createRouteHandler } from 'uploadthing/express';

// UploadThing handler
const f = createUploadthing();

const fileRouter = {
    profileImage: f({ image: { maxFileSize: "4MB" } })
        .onUploadComplete(async ({ file }) => {
            console.log("File uploaded:", file.ufsUrl);
        }),
};

export const uploadImageRoutes = createRouteHandler({
    router: fileRouter,
    config: {
        token: process.env.UPLOADTHING_TOKEN,
    },
})