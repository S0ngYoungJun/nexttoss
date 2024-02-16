// 'use client'

// import { useSearchParams } from "next/navigation";

export default  function Page(usesearchParams){
  // const searchParams = useSearchParams();

  // const orderId = searchParams.get("orderId")
  
  const secretKey = process.env.TOSS_SECRET_KEY || "";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const payments = fetch(
    `https://api.tosspayments.com/v1/payments/orders/${usesearchParams.orderId}`,
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      }
    }
  ).then((res)=> res.json());
  
  return(
    <div>
      <h1> 결제가 완료되었습니다.</h1>
      <ul>
        <li> 결제상품 {payments.orderName}</li>
        <li> 주문번호 {payments.orderId}</li>
        <li> 결제금액 {payments.amount}</li>

      </ul>
    </div>
  )
}