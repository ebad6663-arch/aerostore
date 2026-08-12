"use client";


import { useTransition } from "react";

import {
  PaymentStatus,
} from "@prisma/client";


import {
  updatePaymentStatus,
} from "@/lib/actions/order";



interface Props {

  orderId:string;

  value?:PaymentStatus;

}



export default function PaymentStatusSelect({

  orderId,

  value,

}:Props) {



const [pending,startTransition] =
useTransition();




function handleChange(
e:React.ChangeEvent<HTMLSelectElement>
){


const status =
e.target.value as PaymentStatus;



startTransition(()=>{

updatePaymentStatus(
orderId,
status
);

});


}




return (


<select

value={value ?? PaymentStatus.PENDING}

onChange={handleChange}

disabled={pending}

className="
rounded-lg
border
border-border
bg-background
px-4
py-2
text-white
"


>


<option value={PaymentStatus.PENDING}>
Pending
</option>


<option value={PaymentStatus.PAID}>
Paid
</option>


<option value={PaymentStatus.FAILED}>
Failed
</option>


</select>


);

}