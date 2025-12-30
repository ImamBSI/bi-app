import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumberID } from "@/library/format";

interface ForecastRow {
  date: string;
  forecastValue: number | null;
  upperValue: number | null;
  lowerValue: number | null;
}

export function ForecastTable({ forecastData }: { forecastData: ForecastRow[] }) {
  return (
    <Card className="flex-1 min-w-[300px] bg-gray-200 gap-3 py-3">
      <CardHeader className="px-3">
        <CardTitle>Data Forecast</CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <Table className="bg-white rounded-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>DATE</TableHead>
              <TableHead>Forecast Value</TableHead>
              <TableHead>Upper Value</TableHead>
              <TableHead>Lower Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forecastData.length > 0 ? (
              forecastData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.forecastValue != null ? formatNumberID(row.forecastValue) : "-"}</TableCell>
                  <TableCell>{row.upperValue != null ? formatNumberID(row.upperValue) : "-"}</TableCell>
                  <TableCell>{row.lowerValue != null ? formatNumberID(row.lowerValue) : "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
