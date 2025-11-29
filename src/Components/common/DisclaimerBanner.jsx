import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { useAppContext } from '@/Components/contexts/AppContext';
export default function DisclaimerBanner() {
  const {t, language } = useAppContext();
  return (
    <Alert className="bg-blue-50 border-blue-200 mb-6">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-800">
        <strong>{t('disclaimer_title')}</strong>{t('disclaimer_content')}
      </AlertDescription>
    </Alert>
  );
}