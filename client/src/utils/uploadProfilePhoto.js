import axios from 'axios';
const uploadPhoto = async (file, userId) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('file', file);
  try {
    const { data } = await axios.post(
      `/uploadProfilePhoto/${userId}`,
      formData,
      config
    );
    const { filePath } = data;
    return filePath;
  } catch (error) {
    let message;

    if (error.response && error.response.data.error) {
      message = error.response.data.error;
    } else {
      message = error.message;
    }
    return {
      error: message,
    };
  }
};

export default uploadPhoto;
