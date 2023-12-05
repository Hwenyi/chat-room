//读取当前url

import { useEffect, useState } from "react"

export const useOrigin = () => {
  const [mounted , setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  },[])

  //读取页面url，防止客户端还没渲染window，服务端确提前渲染完成的报错
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "" //url

  if(!mounted) {
    return ""
  }

  return origin
}