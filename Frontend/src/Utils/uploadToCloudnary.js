const uploadToCloudinary = async (pics) => {  
    if (!pics) {
        console.log("Error: No image provided for upload");
        return null;
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "twitter"); 
    data.append("cloud_name", "ddz9eyycd");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/ddz9eyycd/image/upload", {
            method: "POST",
            body: data,
        });

        const fileData = await res.json();
        
        if (!res.ok) {
            throw new Error(fileData.error?.message || "Upload failed");
        }

        return fileData.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error.message);
        return null;
    }
};
export default uploadToCloudinary;