import axios from "axios"

const CLOUDINARY_UPLOAD_PRESET = 'speakeasy';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dog9364lq/image/upload';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};
