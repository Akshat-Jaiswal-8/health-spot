"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export const Hero = (): React.JSX.Element => {
  return (
    <div>
      <motion.div
        className={
          "shadow-node h-[80vh] rounded-br-full rounded-tr-lg border-b-2 border-b-blue-600 bg-blue-800 bg-opacity-20"
        }
      >
        <div
          className={"container relative grid h-full grid-cols-2 items-center"}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20, y: 40 },
              visible: { opacity: 1, x: 0, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col items-start gap-y-12"
          >
            <h1
              className={
                "bg-gradient-to-br from-blue-400 to-blue-800 bg-clip-text py-4 text-7xl font-semibold text-transparent dark:text-slate-200"
              }
            >
              HealthSpot – Your Trusted Healthcare Companion
            </h1>
            <h2
              className={
                "text-3xl font-semibold text-slate-600 dark:text-slate-300"
              }
            >
              Find Nearby Hospitals & Clinics Instantly
            </h2>
            <p
              className={
                "text-xl font-normal text-slate-600 dark:text-slate-300"
              }
            >
              HealthSpot makes healthcare accessible by helping you locate the
              nearest hospitals, clinics, and pharmacies with ease. Stay
              prepared, stay safe! 🚑💙
            </p>

            <Link to={"/hospitals"}>
              <Button
                className={
                  "bg-blue-700 p-4 text-lg text-slate-100 hover:bg-blue-900 dark:text-white"
                }
              >
                Find nearby hospitals <ArrowRight />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 0, y: 100 },
              visible: { opacity: 1, x: 0, y: 0 },
            }}
            initial={"hidden"}
            animate={"visible"}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <img src={"/hero.svg"} alt={"hero svg"} height={600} width={600} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
