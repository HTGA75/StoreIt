import { Chart } from "@/components/Chart";
import { getTotalSpaceUsed } from "@/lib/actions/file.actions";
import Image from "next/image";

export default async function Home() {
  const chartData = await getTotalSpaceUsed()
  console.log(chartData)
  return (
    <>
      <Chart used={chartData.used} />
    </>
  );
}
