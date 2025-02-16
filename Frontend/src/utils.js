function isImage(file) {
    const fileType = file?.type;
    return (fileType === "image/jpeg" || 
            fileType === "image/jpg" || 
            fileType === "image/png");
}

export { isImage };