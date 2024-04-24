import mongoose from "mongoose";
import { RequestHandler } from "express";
import Novel from "../models/Novel"
import { assertIsDefined } from "../util/assertIsDefined"
import createHttpError from "http-errors";

export const getNovels: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId
    try {
        assertIsDefined(authenticatedUserId)
        const novels = await Novel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(novels);
    } catch (error) {
        next(error)
    }
}

export const getNovel: RequestHandler = async (req, res, next) => {
    const novelId = req.params.novelId
    const authenticatedUserId = req.session.userId

    try  {
        assertIsDefined(authenticatedUserId)

        if (!mongoose.isValidObjectId(novelId)){
            throw Error("Invalid novel id")
        }
        const novel = await Novel.findById(novelId).exec()
        if (!novel) {
            throw Error("novel review not found")
        }
        if(!novel.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this novel review")
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
    const authenticatedUserId = req.session.userId

    try { 
        assertIsDefined(authenticatedUserId)
        if (!title) {
            throw createHttpError(400, "review must have a title")
        }
        const newNovel = await Novel.create({
            userId: authenticatedUserId,
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
    const authenticatedUserId = req.session.userId
    try{
        assertIsDefined(authenticatedUserId)
        if (!mongoose.isValidObjectId(novelId)){
            throw Error("Invalid novel id")
    }
    if (!newTitle) {
        throw Error("review must have a title")
    }

    const novel = await Novel.findById(novelId).exec()
    if (!novel) {
        throw Error("novel review not found")

    }

    if(!novel.userId.equals(authenticatedUserId)) {
        throw createHttpError(401, "You cannot access this novel review")
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
    const authenticatedUserId = req.session.userId
    try {
        assertIsDefined(authenticatedUserId)

        if (!mongoose.isValidObjectId(novelId)){
            throw Error("Invalid novel id")
    }

    const novel = await Novel.findById(novelId).exec()
    if (!novel) {
        throw Error("Novel review not found")
    }
    const deleteResult = await Novel.deleteOne({ _id: novelId });

        if (deleteResult.deletedCount === 0) {
            throw createHttpError(401,"Novel not found");
        }

        if(!novel.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this novel review")
        }
        await novel.deleteOne()

        res.sendStatus(204); // Successfully deleted
    } catch(error) {
        next(error)
    }
}