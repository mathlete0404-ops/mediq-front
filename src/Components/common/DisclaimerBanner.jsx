import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/Components/ui/alert';

export default function DisclaimerBanner() {
  return (
    <Alert className="bg-blue-50 border-blue-200 mb-6">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-800">
        <strong>의료 정보 제공 서비스입니다.</strong> 이 서비스는 진단이 아닌 병원 방문을 돕기 위한 정보만 제공합니다. 
        정확한 진단과 치료는 반드시 의료 전문가와 상담하세요.
      </AlertDescription>
    </Alert>
  );
}