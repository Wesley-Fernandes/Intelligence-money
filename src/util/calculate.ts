
import { TimeDiference } from "./time";
import type { Data } from "@/store/search";


export const calculateData = (data:Data) =>{
    const {hours, minutes} = TimeDiference(data.start, data.end);
    const price = 14.12;
    return (hours  + (minutes / 60)) * price;
}

export const calculateAllDatas = (datas:Data[], type: "LUCRO"|"PREJUIZO") =>{
    return datas.reduce((acc, value) => value.type ===type ? (calculateData(value) + acc):acc + 0, 0)
}

export const toPrice = (value: number) => {
    return `R$ ${String(value.toFixed(2).replace(".", ","))}`
}