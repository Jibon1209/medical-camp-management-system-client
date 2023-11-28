import { Banner } from "flowbite-react";
import bannerimg from "../../assets/banner3.jpg";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";
import SectionTitle from "../../Components/SectionTitle";
import { Helmet } from "react-helmet-async";

// create custom icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// markers
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Hello, I am pop up 1",
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Hello, I am pop up 2",
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Hello, I am pop up 3",
  },
];
const ContactUs = () => {
  return (
    <div className="pt-24">
      <Helmet>
        <title>CampHealth Portal | Contact Us</title>
      </Helmet>
      <Banner className="xl:px-24 px-4 ">
        <div className="relative z-0 h-56 sm:h-64 xl:h-96 2xl:h-[550px]">
          <img
            className="w-full h-full object-cover rounded-md"
            src={bannerimg}
            alt=""
          />
          <div className="absolute rounded-xl flex items-center h-full  left-0 top-0  bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
            <div className=" space-y-4 pl-12 ">
              <h1 className="uppercase text-xl lg:text-4xl font-bold text-white">
                Your Gateway to Holistic Healthcare!
              </h1>
              <p className=" text-white">
                Elevate Your Camp Experience with CampHealth Portal.
              </p>
            </div>
          </div>
        </div>
      </Banner>
      <div className="pt-10">
        <SectionTitle heading="Contact Us" />
      </div>
      <div className="flex justify-center items-center flex-col lg:flex-row xl:px-24 px-4 py-10 ">
        <div className=" body-font relative lg:w-1/2">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">
                Contact Us
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center lg:w-1/2">
          <MapContainer center={[48.8566, 2.3522]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              {markers.map((marker) => (
                <Marker
                  key={marker.geocode}
                  position={marker.geocode}
                  icon={customIcon}
                >
                  <Popup>{marker.popUp}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
