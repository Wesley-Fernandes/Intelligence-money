import { create } from 'zustand'

export type Data ={
  id: number,
  created_at: string,
  startTime: string,
  endTime: string,
  creator: string,
  price: number,
  operator: string,
  type: "PREJUIZO"|"LUCRO",
  quantity: string,
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