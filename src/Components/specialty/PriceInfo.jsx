import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/Components/ui/badge';
import { Info, BarChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/Components/ui/table";

const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: currency || 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

export default function PriceInfo({ priceBundle }) {
  if (!priceBundle || !priceBundle.items || priceBundle.items.length === 0) {
    return null;
  }

  const { items, currency, condition_key } = priceBundle;

  const totalMin = items.reduce((sum, item) => sum + (item.min || 0), 0);
  const totalMax = items.reduce((sum, item) => sum + (item.max || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-6 bg-gray-50/70 p-6 rounded-2xl border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <BarChart className="w-5 h-5 text-green-600" />
        </div>
        <div>
            <h4 className="font-bold text-gray-800">예상 진료비 정보</h4>
            <Badge variant="secondary">{condition_key}</Badge>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left font-semibold">항목</TableHead>
              <TableHead className="text-right font-semibold">예상 비용 범위</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(item.min, currency)} ~ {formatCurrency(item.max, currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {items.length > 1 && (totalMin > 0 || totalMax > 0) && (
            <TableFooter>
                <TableRow className="bg-gray-50">
                    <TableCell className="font-bold">총 예상 비용</TableCell>
                    <TableCell className="text-right font-bold font-mono">
                        {formatCurrency(totalMin, currency)} ~ {formatCurrency(totalMax, currency)}
                    </TableCell>
                </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-xs rounded-lg flex items-start gap-2">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        <p>
          실제 비용은 건강보험 적용 여부, 병원 정책, 환자 상태에 따라 크게 달라질 수 있으므로 참고용으로만 확인해주세요.
        </p>
      </div>
    </motion.div>
  );
}