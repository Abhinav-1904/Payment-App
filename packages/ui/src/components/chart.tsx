"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"

export const description = "A stacked bar chart with a legend"

const chartConfig = {
  Spent: {
    label: "Spent",
    color: "hsl(var(--chart-1))",
  },
  Received: {
    label: "Received",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface BarChartProps{
  Title:string,
  Description:string,
  chartData:{
    date:string|undefined,
    spent:number|undefined,
    received:number|undefined
  }[]
}
export function BarChartComponent({Title,Description,chartData}:BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{Title}</CardTitle>
        <CardDescription>
          {Description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <Bar
              dataKey="spent"
              stackId="a"
              fill="var(--color-Spent)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="received"
              stackId="a"
              fill="var(--color-Received)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
