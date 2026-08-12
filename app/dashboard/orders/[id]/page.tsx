import Image from "next/image";
import { notFound } from "next/navigation";

import OrderStatusSelect from "@/components/dashboard/OrderStatusSelect";
import PaymentStatusSelect from "@/components/dashboard/PaymentStatusSelect";

import { getOrderForAdmin } from "@/lib/actions/order";

interface Props {
  params: Promise<{
    id: string;
  }>;
}


export default async function OrderDetailsPage({
  params,
}: Props) {


  const { id } = await params;


  const order = await getOrderForAdmin(id);


  if (!order) {
    notFound();
  }


  return (

    <div className="space-y-10">


      <div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
          Order
        </p>

        <h1 className="mt-2 text-4xl font-black text-white">
          {order.orderNumber}
        </h1>

        <p className="mt-2 text-neutral-400">
          Manage customer order
        </p>

      </div>



      <div className="grid gap-8 lg:grid-cols-3">


        <div className="space-y-8 lg:col-span-2">


          <div className="rounded-2xl border border-white/10 bg-[#111111]">


            <div className="border-b border-white/10 p-6">

              <h2 className="text-xl font-semibold text-white">
                Ordered Products
              </h2>

            </div>



            <div className="divide-y divide-white/10">


              {order.items.map((item)=>(

                <div
                  key={item.id}
                  className="flex items-center justify-between p-5"
                >


                  <div className="flex items-center gap-4">


                    <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-neutral-900">


                      <Image

                        src={
                          item.product.images[0]?.url ??
                          "/placeholder-product.png"
                        }

                        alt={item.product.name}

                        fill

                        className="object-cover"

                      />


                    </div>



                    <div>

                      <h3 className="font-semibold text-white">
                        {item.product.name}
                      </h3>


                      <p className="mt-1 text-sm text-neutral-500">
                        Qty: {item.quantity}
                      </p>


                    </div>


                  </div>



                  <p className="font-bold text-orange-400">
                    PKR {Number(item.price).toLocaleString()}
                  </p>


                </div>

              ))}


            </div>


          </div>


        </div>





        <div className="space-y-8">


          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">


            <h2 className="mb-6 text-xl font-semibold text-white">
              Customer
            </h2>



            <div className="space-y-4 text-sm">


              <div>

                <p className="text-neutral-500">
                  Name
                </p>

                <p className="text-white">
                  {order.user?.name ?? "Customer"}
                </p>

              </div>



              <div>

                <p className="text-neutral-500">
                  Email
                </p>

                <p className="text-white">
                  {order.user?.email}
                </p>

              </div>



            </div>


          </div>





          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">


            <h2 className="mb-6 text-xl font-semibold text-white">
              Order Status
            </h2>


            <OrderStatusSelect

              orderId={order.id}

              value={order.status}

            />


          </div>





          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">


            <h2 className="mb-6 text-xl font-semibold text-white">
              Payment Status
            </h2>


            <PaymentStatusSelect

              orderId={order.id}

              value={order.payment?.status}

            />


          </div>





          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">


            <h2 className="mb-6 text-xl font-semibold text-white">
              Summary
            </h2>



            <div className="space-y-4">


              <div className="flex justify-between">

                <span className="text-neutral-400">
                  Subtotal
                </span>

                <span className="text-white">
                  PKR {Number(order.subtotal).toLocaleString()}
                </span>

              </div>




              <div className="flex justify-between">

                <span className="text-neutral-400">
                  Shipping
                </span>

                <span className="text-white">
                  PKR {Number(order.shipping).toLocaleString()}
                </span>

              </div>




              <div className="flex justify-between">

                <span className="text-neutral-400">
                  Discount
                </span>

                <span className="text-white">
                  PKR {Number(order.discount).toLocaleString()}
                </span>

              </div>




              <div className="border-t border-white/10 pt-4 flex justify-between">

                <span className="font-semibold text-white">
                  Total
                </span>


                <span className="text-2xl font-black text-orange-400">
                  PKR {Number(order.total).toLocaleString()}
                </span>


              </div>


            </div>


          </div>



        </div>


      </div>


    </div>

  );

}