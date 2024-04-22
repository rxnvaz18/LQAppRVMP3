import React, { useState, useEffect } from "react"
import { NovelReview } from "../models/novelreview"

const [novels, setNovels] = useState<NovelReview[]>([])

useEffect(() => {
    async function loadNovels() { 
        try {
            const response = await fetch ("/api/novels", {method: "GET"})
                const novels = await response.json()
                setNovels(novels)
        } catch (error) {
            console.error(error)
            alert(error)
        }
} loadNovels()
}, [])
