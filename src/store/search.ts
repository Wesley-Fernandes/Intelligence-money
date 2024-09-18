import { create } from 'zustand'

export type Data = {
    id: string,
    createdAt: string,
    start: string,
    end: string,
    operatorId: string,
    creatorId: string,
    operator: string,
    type: "PREJUIZO"|"LUCRO"
}

interface StorageProps{
    datas: Data[];
    setData: (data: Data[]) => void;
    parameters: string,
    setParameters: (params: string) => void;
    loading: boolean,
    setLoading: (loading: boolean) => void;
}


export const useSearch = create<StorageProps>((set) => ({
  datas: [],
  parameters: "",
  loading: false,
  setLoading: (loading) => set({ loading }),
  setData: (datas) => set(() => ({ datas: datas })),
  setParameters: (parameters) => set({parameters}),
}))