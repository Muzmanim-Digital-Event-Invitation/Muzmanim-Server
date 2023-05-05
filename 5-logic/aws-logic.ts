import { s3bucket } from "../2-utils/dal";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from 'dotenv';

dotenv.config({ path: ".env" });

export async function saveImagesToS3(file: any, imageId: string) {
    try {
        const type = file.name.split('.')[1];
        const params = {
            Body: file.data,
            Key: `${imageId}.${type}`,
            Bucket: 'muzmanim'
        }
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}

export async function deleteImageFromS3(imageId: string) {
    const params = { Bucket: 'muzmanim', Key: imageId };
    try {
        const results = await s3bucket.deleteObject(params).promise();
        return results
    } catch (e) {
        console.log(e);
    }
}

export async function saveBase64ImageToS3(base64Image: string, imageId: string) {
    try {
        const data = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const type = base64Image.split(';')[0].split('/')[1];
        const params = {
            Body: data,
            Key: `${imageId}`,
            Bucket: 'muzmanim'
        };
        await s3bucket.upload(params).promise();
        return params.Key;
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`);
    }
}
