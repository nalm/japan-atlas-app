import {
  PowerCenterRecord,
  FamousPerson,
  KoreanHistoryLink,
  MajorCityItem,
} from '../types/atlas';

export const city = (
  nameKo: string,
  nameHanja: string,
  note: string,
  status?: MajorCityItem['status'],
  populationText?: string,
): MajorCityItem => ({
  nameKo,
  nameHanja,
  note,
  status,
  populationText,
});

export const pwr = (
  title: string,
  eraId: string,
  category: PowerCenterRecord['category'],
  note: string,
  oldName?: string,
  period?: string,
): PowerCenterRecord => ({
  title,
  eraId,
  category,
  note,
  oldName,
  period,
});

export const person = (
  name: string,
  hanja: string,
  era: string,
  role: string,
  connectionType: FamousPerson['connectionType'],
  description: string,
): FamousPerson => ({
  name,
  hanja,
  era,
  role,
  connectionType,
  description,
});

export const ev = (era: string, title: string, detail: string) => ({
  era,
  title,
  detail,
});

export const kor = (
  category: KoreanHistoryLink['category'],
  title: string,
  year: string,
  description: string,
  tongsinsaStep?: number,
): KoreanHistoryLink => ({
  category,
  title,
  year,
  description,
  tongsinsaStep,
});
