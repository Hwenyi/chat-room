import axios from "axios"
import { useModal } from "@/hooks/use-modal-store"
import { useRouter } from "next/router"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";

const roleIconMap = {
  "GUEST" : null,
  "MODERATOR": <ShieldCheck className="w-4 h-4 text-zinc-500"/>,
  "ADMIN": <ShieldAlert className="w-4 h-4 text-zinc-500"/>
}

export const MembersModal = () => {
  const {onOpen, isOpen, onClose, type, data} = useModal() //创建invite浮窗
  const [copied, setCopied] = useState(false) 
  const [isLoading, setIsLoading] = useState(false) 

  const origin = useOrigin()

  const isModalOpen = isOpen &&  type === "members" //传递可点击参数

  const {server} = data as {server: ServerWithMembersWithProfiles}

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  //Regenerate invite code
  const onNewInvite = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length}  Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member)=> (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl}/>

              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">
                  {member.profile.email}
                </p>
              </div>
              {/* 管理员下拉菜单界面 */}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )

}
