import { createUploadthing } from 'uploadthing/express'

const f = createUploadthing()

export const uploadRoutes = f
    .router()
    .image(
        'imageUploader',
        { 
            fileTypes: ['image'], 
            maxSize: '4MB',
            maxFileCount: 1,
        }
    )
    .onUploadError((err) => {
        console.error('❌ Upload error:', err)
        return { error: 'Upload failed' }
    })
    .onUploadComplete(async ({ file }) => {
        console.log('✅ Upload complete:', file.ufsUrl)
        return { url: file.ufsUrl }
    })
