const express = require("express");
const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resturant title is Required"],
    },
    imageUrl: {
      type: String,
      default: "https://onlinetools.com/image/generate-random-image",
    },
    food: {
      type: Array,
    },
    time:{
        type:String
    },
    pickUp: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coordinates: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true },
);

const resturantModel = mongoose.model("resturant", resturantSchema);

module.exports = resturantModel;
