import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import PlaceResult = google.maps.places.PlaceResult;
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
import { useAuthStore } from "@/store/useAuthStore.ts";
import { Hospitals } from "@/components/hospitals.tsx";
import { motion } from "motion/react";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
};

const DEFAULT_CENTER = {
  lat: 28.61468886977496,
  lng: 77.38484103444529,
};

type UserLocation = {
  lat: number;
  lng: number;
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries: "places"[] = ["places"];

function MapComponent() {
  const { user } = useAuthStore((state) => state);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [hospitals, setHospitals] = useState<PlaceResult[] | null>([]);
  const [selectedHospital, setSelectedHospital] = useState<PlaceResult | null>(
    null,
  );
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const fetchHospitals = useCallback(
    (map: google.maps.Map, location: UserLocation) => {
      if (!map || !location) return;
      if (!window.google.maps.places) {
        toast.error("Places API not loaded!");
        return;
      }

      const service = new window.google.maps.places.PlacesService(map);

      // Fetch hospitals within 5km radius
      const request = {
        location: new window.google.maps.LatLng(location.lat, location.lng),
        radius: 5000,
        type: "hospital",
      };

      service?.nearbySearch(
        request,
        (results: PlaceResult[] | null, status: PlacesServiceStatus) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setHospitals(results ? results : null);
          } else {
            toast.error("Error fetching hospitals:", { description: status });
            console.error("Error fetching hospitals:", status);
          }
        },
      );
    },
    [],
  );

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMapInstance(map);
      if (userLocation) {
        fetchHospitals(map, userLocation);
      }
    },
    [fetchHospitals, userLocation],
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    if (!user) toast.error("Login first!");
    if (user) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          toast.error(
            "Error getting location! Please try again after sometime.",
          );
          console.error("Error getting location:", error);
        },
      );
    }
  }, [user]);

  useEffect(() => {
    if (mapInstance && userLocation) {
      fetchHospitals(mapInstance, userLocation);
    }
  }, [userLocation, mapInstance, fetchHospitals]);

  return (
    <div className={"container mb-5 mt-[calc(var(--nav-height)+2rem)]"}>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-blue-300 to-blue-800 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl lg:mb-20"
      >
        Find Healthcare Near You!
      </motion.h1>
      <div className={"mb-10 h-[70vh] rounded-xl border-2 border-blue-600"}>
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={userLocation ?? DEFAULT_CENTER}
            onLoad={onMapLoad}
          >
            {userLocation && <Marker position={userLocation} />}

            {hospitals?.map((hospital, index) => (
              <Marker
                key={index}
                position={hospital?.geometry?.location || DEFAULT_CENTER}
                onClick={() => {
                  setSelectedHospital(hospital);
                }}
              />
            ))}

            {selectedHospital && selectedHospital?.geometry?.location && (
              <InfoWindow
                position={selectedHospital.geometry.location}
                onCloseClick={() => setSelectedHospital(null)}
              >
                <div className={"flex w-[20rem] items-center space-x-5"}>
                  <img
                    className={"size-10 rounded-full border object-contain p-1"}
                    src={selectedHospital.icon}
                    alt={selectedHospital.name}
                  />
                  <div className={"space-y-2"}>
                    <h3 className={"text-xl font-bold"}>
                      {selectedHospital.name}
                    </h3>
                    <p className={"text-sm"}>{selectedHospital.vicinity}</p>
                  </div>
                </div>
              </InfoWindow>
            )}

            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
      <Hospitals
        userLocation={userLocation}
        hospitals={hospitals}
        setDirections={setDirections}
      />
    </div>
  );
}

export default MapComponent;
