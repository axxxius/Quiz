import { AtomEffect } from "recoil";

export const localPersist: AtomEffect<any> = ({onSet, setSelf, node}) => {
  const storedData = localStorage.getItem(node.key)
  if (storedData != null){
    setSelf(JSON.parse(storedData))
  }
  onSet((newData, __, isReset) => {
    isReset
      ? localStorage.removeItem(node.key)
      : localStorage.setItem(node.key, JSON.stringify(newData));
  })
}
