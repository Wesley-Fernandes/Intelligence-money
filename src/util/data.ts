import type { Data } from "@/store/search";

export const sortByCreateation = (data:Data[]) =>{
    return data.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}