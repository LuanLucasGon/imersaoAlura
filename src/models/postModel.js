import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conn = await conectarAoBanco(process.env.STRING_DB)

export async function getAllPosts(){
  const db = conn.db("insta-bytes");
  const collection = db.collection("posts");
  return collection.find().toArray()
}

export async function createPost(newPost){
  const db = conn.db("insta-bytes");
  const collection = db.collection("posts");
  return collection.insertOne(newPost);
}

export async function updatePost(id, newPost){
  const db = conn.db("insta-bytes");
  const collection = db.collection("posts");
  const objectId = ObjectId.createFromHexString(id)
  return collection.updateOne({
    _id: new ObjectId(objectId)
  }, {
    $set:newPost
  });
}