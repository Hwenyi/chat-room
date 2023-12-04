import { useModal } from "@/hooks/use-modal-store"
import { useRouter } from "next/router"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const InviteModal = () => {
  const {onOpen, isOpen, onClose, type, data} = useModal()

  // const router = useRouter()

  const isModalOpen = isOpen &&  type === "invite"

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>
            Invite Friends
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}
