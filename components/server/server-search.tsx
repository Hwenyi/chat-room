"use client"

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";


interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member",
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    } [] | undefined//这里也是同样可以传进来的是data的数组
  }[] //接受的是data的数据
}






export const ServerSearch = ({
  data
}:ServerSearchProps) => {

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onClick = ({id, type}: {id: string, type: "channel"| "member"}) => {
    console.log(id, type)
    setOpen(false);

    if(type === "member") {
      return router.push(`/server/${params?.serverId}/conversations/${id}`)
    }

    if(type === "channel") {
      return router.push(`/server/${params?.serverId}/channels/${id}`)
    }
  }

  return (
    <>
      <button
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text=zinc-400"/> 
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
        >
          Search
        </p>
        <kbd>
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog>
        <CommandInput/>
          <CommandList>
            <CommandEmpty>
              No Results found
            </CommandEmpty>
            {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                  {data?.map(({ id, icon, name }) => {
                    return (
                      <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                        {icon}
                        <span>{name}</span>
                      </CommandItem>
                    )
                  })}
              </CommandGroup>
            )
          })}
          </CommandList>
      </CommandDialog>
    </>
  )
}