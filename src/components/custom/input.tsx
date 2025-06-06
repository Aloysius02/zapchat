import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



type props = {
  type:string,
  label:string,
  placeholder:string,
  value:string,
  onChange:(e:any)=> void
}

export default function InputWithLabel({
  type,
  label,
  placeholder,
  value,
  onChange,
}:props) {
  
 
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="email" className="text-white">{label}</Label>
      <Input
       className="bg-transparent"
       type={type}
       placeholder={placeholder} 
       value={value}
       onChange={onChange}
       />
    </div>
  )
}
