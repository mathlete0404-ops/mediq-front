
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Bot, MapPin, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import { useAppContext } from "@/Components/contexts/AppContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Step = ({ icon: Icon, title, desc }) => (
  <motion.div variants={fadeUp} className="relative">
    <Card className="rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#00C2B8] text-white flex items-center justify-center mb-3">
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-lg text-black mb-1 break-keep">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed break-keep">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const SampleCard = ({ title, img, alt }) => (
  <motion.div variants={fadeUp} className="group">
    <div className="rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <div className="relative aspect-video bg-gray-100 dark:bg-white/10 flex items-center justify-center">
        {img ? (
          <img src={img} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            <span>Sample</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h5 className="font-medium text-foreground">{title}</h5>
      </div>
    </div>
  </motion.div>
);

export default function AboutSection() {
  const { t } = useAppContext();

  return (
    <section id="about" className="py-20 bg-[#F5FAFF] dark:bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-3 px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md text-sm text-gray-700 dark:text-gray-200 shadow-sm">
              MedIQ · AI Healthcare
            </div>
            <div className="flex items-center justify-center mb-2">
              <span className="inline-block h-1 w-12 bg-[#00C2B8] rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 break-keep">
              {t("about.title")}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto break-keep">
              {t("about.subtitle")}
            </p>
          </motion.div>

          {/* 3-step process container (arrows removed, single row, word-break safe) */}
          <motion.div variants={fadeUp} className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-[#F9FAFF] to-[#E0F7FA] border border-gray-200 shadow-[0_10px_20px_rgba(0,0,0,0.08)] mb-10">
            <h3 className="text-xl font-semibold text-black mb-5 break-keep">
              {t("about.process_title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              <Step icon={MessageSquare} title={t("about.step1_title")} desc={t("about.step1_desc")} />
              <Step icon={Bot} title={t("about.step2_title")} desc={t("about.step2_desc")} />
              <Step icon={MapPin} title={t("about.step3_title")} desc={t("about.step3_desc")} />
            </div>
          </motion.div>

          {/* Samples */}
          <motion.div variants={fadeUp} className="mt-12">
            <div className="flex items-center justify-center mb-2">
              <span className="inline-block h-1 w-10 bg-[#00C2B8] rounded-full" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("about.samples_title")}</h3>
            <p className="text-sm text-muted-foreground mb-5">{t("about.samples_subtitle")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SampleCard
                title={t("about.sample1_title")}
                img="https://images.unsplash.com/photo-1583912267550-c9a3d0e17058?q=80&w=1200&auto=format&fit=crop"
                alt="Symptom input UI"
              />
              <SampleCard
                title={t("about.sample2_title")}
                img="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1200&auto=format&fit=crop"
                alt="AI analysis result UI"
              />
              <SampleCard
                title={t("about.sample3_title")}
                img="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
                alt="Hospital recommendation cards"
              />
            </div>
          </motion.div>

          {/* Closing line */}
          <motion.div variants={fadeUp} className="mt-10">
            <Card className="rounded-2xl border border-gray-200 bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
              <CardContent className="p-6 text-center text-foreground">
                <p className="font-medium">{t("about.closing_line")}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
