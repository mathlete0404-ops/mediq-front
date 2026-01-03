import { useAppContext } from "../contexts/AppContext";

const { language } = useAppContext();
const { t } = useAppContext();

export const departmentInfo = {
  '정형외과': {
    name: language === 'en' ? 'Orthopedics' : '정형외과',
    description: language === 'en' 
      ? 'Orthopedics diagnoses and treats conditions related to bones, joints, ligaments, and muscles through non-surgical or surgical methods.'
      : '관절, 뼈, 근육, 인대 등의 통증과 손상을 진단하고 수술 또는 비수술적 방법으로 치료하는 전문 분야입니다.',
  },
  '내과': {
    name: language === 'en' ? 'Internal Medicine' : '내과',
    description: language === 'en'
      ? 'Internal medicine diagnoses and treats diseases of internal organs through medication and lifestyle management.'
      : '내부 장기의 질환을 약물 치료와 생활 관리를 통해 진단하고 치료하는 전문 분야입니다.',
  },
  '신경과': {
    name: language === 'en' ? 'Neurology' : '신경과',
    description: language === 'en'
      ? 'Neurology diagnoses and treats diseases of the brain, spinal cord, and nerves through medication and physical therapy.'
      : '뇌, 척수, 신경의 질환을 약물 치료와 물리 치료를 통해 진단하고 치료하는 전문 분야입니다.',
  },
  '이비인후과': {
    name: language === 'en' ? 'Otolaryngology' : '이비인후과',
    description: language === 'en'
      ? 'Otolaryngology diagnoses and treats diseases of the ears, nose, and throat.'
      : '귀, 코, 목의 질환을 진단하고 치료하는 전문 분야입니다.',
  },
  // Add more departments as needed
};