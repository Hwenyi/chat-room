import { useModal } from "@/hooks/use-modal-store"
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import { Dialog } from "@radix-ui/react-dialog";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({name: z.string().min(1,{message: "Channel name is required"}).refine(name => name !== "general", {message: "Channel name cannot be general"}),
  type: z.enum(["text", "voice"])
})


export const CreateChannelModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter()

  const params = useParams() 

  const isModalOpen = isOpen && type === "createChannel"

  //表单验证器
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT
    }
  })
  
  const isLoading = form.formState.isSubmitting //表单是否正在提交

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog>
      
    </Dialog>
  )
}