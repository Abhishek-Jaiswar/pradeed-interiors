import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: Buffer, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: `pradeep-interior/${folder}`,
      resource_type: 'auto',
    };

    // Convert buffer to base64
    const base64Data = `data:image/jpeg;base64,${file.toString('base64')}`;

    cloudinary.uploader.upload(base64Data, uploadOptions, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result?.secure_url || '');
    });
  });
}

export async function deleteImage(publicId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result?.result === 'ok');
    });
  });
}

export default cloudinary;
