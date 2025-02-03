

// firebaseFunctions.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import firebaseConfig from "../config/FirebaseConfig.js";
import {v4 as uuidv4} from "uuid";

initializeApp(firebaseConfig);

const storage = getStorage();

export const uploadImageToFirebase = async (file,folder) => {
    try {
        if(!file) throw new Error("File not Recieved");
        const uniqueFileName = `${uuidv4()}-${file.originalname}`
        const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
        const metadata = {
            contentType: file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const result = {
            name: file.originalname,
            type: file.mimetype,
            downloadURL: downloadURL
        };
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteImageFromFirebase = async (downloadURL) => {
    try {
        const imageRef = ref(storage, downloadURL);
        await deleteObject(imageRef);
      } catch (error) {
        throw error;
      }
  };
