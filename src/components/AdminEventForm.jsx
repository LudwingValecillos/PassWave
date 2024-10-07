import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  FileText,
  Images,
} from "lucide-react";
import EventPrueba from "./EventPrueba";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadEvents } from "../redux/actions/eventsAction";
import Swal from "sweetalert2";

const AdminEventForm = () => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    name: "",
    description: "",
    artists: [""],
    date: "",
    ticketPrice: "",
    hasStand: true,
    images: [""],
    placeId: null, // Default to a valid place ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceChange = (e) => {
    const placeId = parseInt(e.target.value); // Convert the radio value to an integer
    setEvent((prev) => ({
      ...prev,
      placeId: placeId, // Directly set the place ID from radio value
    }));
  };

  const handleArtistChange = (index, value) => {
    const newArtists = [...event.artists];
    newArtists[index] = value;
    setEvent((prev) => ({
      ...prev,
      artists: newArtists,
    }));
  };

  const removeArtist = (index) => {
    const newArtists = event.artists.filter((_, i) => i !== index);
    setEvent((prev) => ({
      ...prev,
      artists: newArtists,
    }));
  };

  const addArtist = () => {
    setEvent((prev) => ({
      ...prev,
      artists: [...prev.artists, ""],
    }));
  };

  const addUrlImage = () => {
    setEvent((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeUrlImage = (index) => {
    const newImages = event.images.filter((_, i) => i !== index);
    setEvent((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...event.images];
    newImages[index] = value;
    setEvent((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const alerError = (msg) => {
    Swal.fire({
      title: "Oops! Something went wrong.",
      text: msg,
      icon: "error",
    });
  };

  const alerSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "Event created successfully",
      icon: "success",
    });
  };
  const handleSubmit = (e) => {
    if (
      event.name === "" ||
      event.description === "" ||
      event.artists.length === 0 ||
      event.date === "" ||
      event.ticketPrice === "" ||
      event.images.length === 0
    ) {
      alerError("All fields are required");
      return;
    }

    e.preventDefault();
    axios
      .post("http://localhost:8080/api/event/create", event, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alerSuccess();
        dispatch(loadEvents());
      })
      .catch((error) => {
        alerError(error.response.data);
      });
  };

  return (
    <div className="text-black flex px-12">
      <div className="w-1/2 bg-[#dfdfdf] rounded-lg overflow-hidden border-2 border-[#0D0D0D] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-[#0D0D0D] pb-4">
            Create New Event
          </h2>

          <div className="space-y-2">
            <label className="block font-medium">Images</label>
            {event.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Images className="text-[#0D0D0D]" />
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`Image URL ${index + 1}`}
                  className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeUrlImage(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addUrlImage}
              className="mt-2 px-4 py-2 bg-[#F2BB13] rounded hover:bg-[#F28D35] focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]"
            >
              Add Image
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="text-[#0D0D0D]" />
              <input
                type="text"
                name="name"
                value={event.name}
                onChange={handleChange}
                placeholder="Event Name"
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="text-[#0D0D0D]" />
              <span className="mr-2">Place Name:</span>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="2"
                  checked={event.place === 2}
                  onChange={handlePlaceChange}
                  className="form-radio h-5 w-5 text-[#0D0D0D] focus:ring-2 focus:ring-[#0D0D0D]"
                />
                <span>Crest (general)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1"
                  checked={event.place === 1}
                  onChange={handlePlaceChange}
                  className="form-radio h-5 w-5 text-[#0D0D0D] focus:ring-2 focus:ring-[#0D0D0D]"
                />
                <span>Tide (expo)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="3"
                  checked={event.place === 3}
                  onChange={handlePlaceChange}
                  className="form-radio h-5 w-5 text-[#0D0D0D] focus:ring-2 focus:ring-[#0D0D0D]"
                />
                <span>Drift</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="text-[#0D0D0D]" />
              <input
                type="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <DollarSign className="text-[#0D0D0D]" />
              <input
                type="number"
                name="ticketPrice"
                value={event.ticketPrice}
                onChange={handleChange}
                placeholder="Ticket Price"
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <FileText className="text-[#0D0D0D] mt-2" />
              <textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                placeholder="Event Description"
                className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Artists</label>
              {event.artists.map((artist, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Users className="text-[#0D0D0D]" />
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => handleArtistChange(index, e.target.value)}
                    placeholder={`Artist ${index + 1}`}
                    className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D0D0D] border-2 border-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeArtist(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addArtist}
                className="mt-2 px-4 py-2 bg-[#F2BB13] rounded hover:bg-[#F28D35] focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]"
              >
                Add Artist
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F2BB13] hover:bg-[#F28D35] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0D0D0D]"
          >
            Create Event
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <EventPrueba event={event} />
      </div>
    </div>
  );
};

export default AdminEventForm;
