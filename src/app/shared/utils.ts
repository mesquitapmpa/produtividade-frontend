import { Registro } from "../models/registro";
import {v4 as uuidv4} from 'uuid';

export function getImage(idpessoa: string)  {
  const str = idpessoa.split("")
  let link = ""
  let s = str.map( val => (
    link = link + `${val}/`
  ))
  return link
}



export function findIndexById(id: string, registros: Registro[]): number {
  let index = -1;
  for (let i = 0; i < registros.length; i++) {
      if (registros[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

export function createId(): string {
  let id = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export function createUuid(): string {
  return uuidv4();
}


export function isArray<T>(value: any): value is T[] {
  return Array.isArray(value)
}

export function isArrayOf<T>(value: any, typeCheck: (item: any) => item is T): value is T[] {
  return Array.isArray(value) && value.every(typeCheck);
}

export  function isNumber(value: any): value is number {
  return typeof value === 'number';
}
