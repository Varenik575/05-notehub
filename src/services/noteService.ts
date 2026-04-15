import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";
const AUTHORISATION_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
    
}

export const fetchNotes = async(newSearch?:string, newPage:number = 1 ):Promise<FetchNotesResponse> => {
    const response:AxiosResponse<FetchNotesResponse> = 
    await axios.get<FetchNotesResponse>(`https://notehub-public.goit.study/api/notes`, {
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

export const createNote = async(newTitle:string, newContent:string, newTag: Note["tag"]):Promise<Note> => {

const newNote = {
    title: newTitle,
    content: newContent,
    tag: newTag
};

  const response = await axios.post<Note>(
  'https://notehub-public.goit.study/api/notes',
  newNote,
  {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${AUTHORISATION_KEY}`,
      'Content-Type': 'application/json'
    }
  }
);
 return response.data;
}

export const deleteNote = async(noteId:Note['id']):Promise<Note> => {
const response:AxiosResponse<Note> = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${noteId}`, {
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${AUTHORISATION_KEY}`
  }
});
return response.data;
}

 