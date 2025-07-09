"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"

interface CourseWeek {
  week: number
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
}

interface CourseScheduleTableProps {
  data: CourseWeek[]
  title: string
}

const columnHelper = createColumnHelper<CourseWeek>()

const columns = [
  columnHelper.accessor("week", {
    header: "Week",
    cell: (info) => <div className="font-semibold">Week {info.getValue()}</div>,
  }),
  columnHelper.accessor("title", {
    header: "Topic",
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("level", {
    header: "Level",
    cell: (info) => (
      <Badge
        variant="outline"
        className={`
          ${info.getValue() === "Beginner" && "border-green-500 text-green-700"}
          ${info.getValue() === "Intermediate" && "border-blue-500 text-blue-700"}
          ${info.getValue() === "Advanced" && "border-purple-500 text-purple-700"}
        `}
      >
        {info.getValue()}
      </Badge>
    ),
  }),
]

export function CourseScheduleTable({ data, title }: CourseScheduleTableProps) {
  const isMobile = useIsMobile()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        {data.map((week, idx) => (
          <Card key={idx} className="p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-primary">Week {week.week}</div>
              <Badge
                variant="outline"
                className={`
                  ${week.level === "Beginner" && "border-green-500 text-green-700"}
                  ${week.level === "Intermediate" && "border-blue-500 text-blue-700"}
                  ${week.level === "Advanced" && "border-purple-500 text-purple-700"}
                `}
              >
                {week.level}
              </Badge>
            </div>
            <div className="font-medium text-gray-800 mb-1">{week.title}</div>
            <div className="text-sm text-gray-600">{week.description}</div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="rounded-lg border shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 