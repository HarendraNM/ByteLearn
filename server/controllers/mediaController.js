import cloudinary from "../utils/cloudinary.js";
import getdatauri from "../utils/dataURI.js";

export const uploadVideo=async(req, res)=>{
    try {
        const file=req.file;
        const fileUri=getdatauri(file);

        const result=await cloudinary.uploader.upload(fileUri,{
            resource_type:"auto",
        });

        return res.status(200).json({
            success: true,
            message: "Video uploaded successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload video",
        })
    }
}