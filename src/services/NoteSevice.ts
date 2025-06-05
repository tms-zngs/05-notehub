// fetchNotes
// createNote
// deleteNote;

import axios from "axios";
// import { useMutation } from "@tanstack/react-query";

export const fetchNotes = async (page = 1) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  const url = "https://notehub-public.goit.study/api";
  const perPage = 10;

  const response = await axios.get(
    `${url}/notes?page=${page}&perPage=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
