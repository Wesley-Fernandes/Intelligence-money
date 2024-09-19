

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


export function getMonthTimestamps() {
  const now = new Date();

  const startOfMonthDate = startOfMonth(now).toISOString();
  const endOfMonthDate = endOfMonth(now).toISOString();

  return { startOfMonthDate, endOfMonthDate };
}

export function calculateTimeDifference(startDate:string, endDate:string) {
  const totalMinutes = differenceInMinutes(new Date(endDate), new Date(startDate));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}h`;

  return formattedTime;
}


export function ConvertDate(isoDateString:string) {
  const date = new Date(isoDateString);
  return format(date, 'dd/MM/yyyy');
}
