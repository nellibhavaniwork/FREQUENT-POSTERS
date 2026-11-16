import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ew2tcjy5',
  api_key: process.env.CLOUDINARY_API_KEY || '713663139356954',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'YsS3cCPhT_TanMmlaXeu7GfGNLc',
  secure: true,
});

/**
 * Upload a Base64 or local buffer to Cloudinary
 * @param {string} fileStr - Data URI or file path
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<{public_id: string, secure_url: string}>}
 */
export async function uploadImage(fileStr, folder = 'frequent_posters') {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder,
      resource_type: 'auto',
    });
    return {
      public_id: uploadResponse.public_id,
      secure_url: uploadResponse.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Delete an image by its public_id
 * @param {string} publicId
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
}

export default cloudinary;

