export interface Dictionary {
  [key: string]: unknown
}

export interface TypableObj extends Dictionary {
  [key: string]: string | number
}

export interface StrObj extends TypableObj {
  [key: string]: string
}

export interface NumObj extends TypableObj {
  [key: string]: number
}

export type Arr<T> = Array<T>

export interface Obj<V> {
  [key: string | number]: V
}
export interface StrKeyObj<V> {
  [key: string]: V
}
export interface NumKeyObj<V> {
  [key: number]: V
}

export interface ObjArr<Value> {
  [key: string | number]: Array<Value>
}

export interface StrKeyObjArr<Value> {
  [key: string]: Array<Value>
}

export interface NumKeyObjArr<Value> {
  [key: number]: Array<Value>
}
