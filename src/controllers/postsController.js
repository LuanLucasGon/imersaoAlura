import { json } from "express";
import { getAllPosts, createPost, updatePost } from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/gemiiniAiService.js";

export async function listAllPosts(req, res){
  const posts =  await getAllPosts();
  res.status(200).json(posts);
}

export async function createNewPost(req, res){
  const novoPost = req.body;
  try{
    const createdPost = await createPost(novoPost);
    res.status(200).json(createdPost);
  }catch(error){
    console.error(error.message);
    res.status(500),json({
      "Erro": "Falha na requisição"
    });
  }
}

export async function uploadImage(req, res){
    const newPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
  };

  try {
      const postCriado = await createPost(newPost);
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
      fs.renameSync(req.file.path, imagemAtualizada)
      res.status(200).json(postCriado);  
  } catch(erro) {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function updateNewPost(req, res){
  const id  = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`

  try{
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)
    const post = {
      imgUrl: urlImage,
      descricao: descricao,
      alt: req.body.alt
    }
    const createdPost = await updatePost(id, post);
    res.status(200).json(createdPost);
  }catch(error){
    console.error(error.message);
    res.status(500),json({
      "Erro": "Falha na requisição"
    });
  }
}