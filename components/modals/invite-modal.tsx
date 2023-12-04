import { useModal } from "@/hooks/use-modal-store"
import { useRouter } from "next/router"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Copy, RefreshCw } from "lucide-react";

export const InviteModal = () => {
  const {onOpen, isOpen, onClose, type, data} = useModal() //创建invite浮窗

  // const router = useRouter()

  const isModalOpen = isOpen &&  type === "invite" //传递可点击参数

  const {server} = data

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input  
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:rinig-offset-0"
              value="invite-link"
            />
            <Button size="icon">
              <Copy className="w-4 h-4w-4 h-4"/>
            </Button>
          </div>
          <Button variant="link" size="sm" className="text-xs text-zinc-500 mt-4">
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

}
