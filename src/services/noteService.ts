import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";
const AUTHORISATION_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
    
}

export const fetchNotes = async(newSearch?:string, newPage:number = 1 ):Promise<FetchNotesResponse> => {
    const response:AxiosResponse<FetchNotesResponse> = await axios.get<FetchNotesResponse>(`https://notehub-public.goit.study/api/notes`, {
        headers: {
            Authorization: `Bearer ${AUTHORISATION_KEY}`
        },
        params:{
            search: newSearch,
            page: newPage,
            perPage: 12,
            sortBy: "created",
        }
    })
    return response.data;
}

export const createNote = async(newTitle:string, newContent:string, newTag: Note["tag"]) => {

const newNote = {
    title: newTitle,
    content: newContent,
    tag: newTag
};

  const response = await axios.post("https://notehub-public.goit.study/api/notes", { newNote,
     headers: {
            Authorization: `Bearer ${AUTHORISATION_KEY}`
        } });
 return response.data;
}

 