import mongoose from "mongoose";
import { RequestHandler } from "express";
import NovelModel from "../models/Novel"

export const getNovels: RequestHandler = async (req, res, next) => {
    try {
        const novels = await NovelModel.find().exec();
        res.status(200).json(novels);
    } catch (error) {
        next(error)
    }
}

export const getNovel: RequestHandler = async (req, res, next) => {
    const novelId = req.params.novelId
    try  {
        if (!mongoose.isValidObjectId(novelId)){
            throw Error("Invalid novel id")
        }
        const novel = await NovelModel.findById(novelId).exec()
        if (!novel) {
            throw Error("novel review not found")

        }
        res.status(200).json(novel)
    }
        catch (error) {
            next(error)
        }
    }

interface CreateNovelBody {
    title?: string,
    text?: string,
}


export const createNovel: RequestHandler<unknown, unknown, CreateNovelBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text

    try { 
        if (!title) {
            throw Error("review must have a title")
        }
        const newNovel = await NovelModel.create({
            title: title,
            text: text,
        })
        res.status(201).json(newNovel)

    }
        catch (error) {
            next(error)

        }
    }

interface UpdateNovelParams {
    novelId: string,
}

interface UpdateNovelBody {
    title?: string,
    text?: string,
}

export const updateNovel: RequestHandler<UpdateNovelParams, unknown, UpdateNovelBody, unknown> = async (req, res, next) => {
    const novelId = req.params.novelId
    const newTitle = req.body.title
    const newText = req.body.text
    try{
        if (!mongoose.isValidObjectId(novelId)){
            throw Error("Invalid novel id")
    }
    if (!newTitle) {
        throw Error("review must have a title")
    }

    const novel = await NovelModel.findById(novelId).exec()
    if (!novel) {
        throw Error("novel review not found")

    }
    novel.title = newTitle
    novel.text = newText

    const updatedNovel = await novel.save()
    
    res.status(200).json(updatedNovel)

    }catch(error){
        next(error)
    }
}

export const deleteNovel: RequestHandler = async(req, res, next) => {
    const novelId = req.params.novelId
    try {
        if (!mongoose.isValidObjectId(novelId)){
            throw Error("Invalid novel id")
    }

    const novel = await NovelModel.findById(novelId).exec()
    if (!novel) {
        throw Error("Novel review not found")
    }
    const deleteResult = await NovelModel.deleteOne({ _id: novelId });

        if (deleteResult.deletedCount === 0) {
            throw new Error("Novel not found");
        }
        res.sendStatus(204); // Successfully deleted
    } catch(error) {
        next(error)
    }
}