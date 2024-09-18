
import type { Data } from '@/store/search';
import { startOfMonth, endOfMonth, format, parse, parseISO, differenceInMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function DateFormat(isoDateString: string) {
  const parsedDate = parseISO(isoDateString);
  return format(parsedDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function DateBrFormat(isoDateString: string) {
  const parsedDate = parseISO(isoDateString);
  return format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
}

export function getCurrentMonthRangeISO() {
  const now = new Date();
  const firstDay = startOfMonth(now);
  const lastDay = endOfMonth(now);

  // Formata as datas para o padrão ISO 8601
  const firstDayISO = format(firstDay, "yyyy-MM-dd'T'HH:mm:ssXXX");
  const lastDayISO = format(lastDay, "yyyy-MM-dd'T'HH:mm:ssXXX");

  return {
    start: firstDayISO,
    end: lastDayISO
  };
}


export function getMonthRangeFromLocalDate(localDate: string) {
  const date = parse(localDate, 'yyyy-MM', new Date());
  const firstDay = startOfMonth(date);
  const lastDay = endOfMonth(date);
  const firstDayISO = format(firstDay, "yyyy-MM-dd'T'HH:mm:ssXXX");
  const lastDayISO = format(lastDay, "yyyy-MM-dd'T'HH:mm:ssXXX");

  return {
    firstDay: firstDayISO,
    lastDay: lastDayISO
  };
}


export function TimeDiference(startISO: string, endISO: string) {
  const startDate = parseISO(startISO);
  const endDate = parseISO(endISO);
  const totalMinutes = differenceInMinutes(endDate, startDate);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return {
    hours,
    minutes
  };
}

export const formatTime = (data:Data)=>{
  const {hours, minutes} = TimeDiference(data.start, data.end)
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}