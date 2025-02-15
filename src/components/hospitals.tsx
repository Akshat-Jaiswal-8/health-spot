import PlaceResult = google.maps.places.PlaceResult;
import * as React from "react";
import { Button } from "@/components/ui/button.tsx";
import { ArrowRightFromLine } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge.tsx";
import { motion, AnimatePresence } from "motion/react";

export const Hospitals = ({
  hospitals,
  userLocation,
  setDirections,
}: {
  hospitals: PlaceResult[] | null;
  userLocation: { lat: number; lng: number } | null;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | null>
  >;
}) => {
  const getDirections = async (hospital: PlaceResult) => {
    if (!userLocation || !hospital.geometry?.location) return;

    const directionsService = new google.maps.DirectionsService();
    const origin = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    const destination = hospital.geometry.location;

    await directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          toast.error("Error fetching directions:", { description: status });
        }
      },
    );
  };
  return (
    <div className={"flex flex-col space-y-5"}>
      <AnimatePresence mode="wait">
        {hospitals &&
          hospitals?.map((hospital: PlaceResult, index: number) => (
            <motion.div
              key={hospital.place_id}
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 500 }}
              transition={{
                type: "spring",
                delay: index * 0.2,
                duration: 0.5,
                stiffness: 100,
              }}
              className={"flex items-center gap-x-10 rounded-xl border p-4"}
            >
              <img
                className={`size-20 rounded-full border object-contain bg-[${hospital.icon_background_color}]`}
                src={hospital.icon}
                alt={hospital.name}
              />
              <div className={"space-y-4"}>
                <div className={"flex gap-x-5"}>
                  <Badge
                    variant={
                      !hospital.opening_hours?.open_now
                        ? "destructive"
                        : "default"
                    }
                  >
                    {hospital.opening_hours?.open_now === true
                      ? "Open Now"
                      : "Closed"}
                  </Badge>
                  <Badge
                    variant={
                      hospital.business_status === "OPERATIONAL"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {hospital.business_status}
                  </Badge>
                </div>
                <h1 className={"text-lg font-medium"}>
                  <span className={"mr-2 text-xl font-bold"}>
                    Hospital name:
                  </span>
                  {hospital.name}
                </h1>
                <h1 className={"text-lg font-semibold"}>
                  <span className={"mr-2 text-xl font-bold"}>
                    Hospital Vicinity:
                  </span>
                  {hospital.vicinity}
                </h1>
                <Button
                  variant={"outline"}
                  onClick={async () => {
                    await getDirections(hospital);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Get Directions <ArrowRightFromLine />
                </Button>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
