<template>
  <br />
  1 : {{ starts }} <br />
  <br />
  2 : {{ stops }} <br />

  <br />
  3 : {{ stopped1 }} <br />
  <br />
  4 : {{ started }} <br />
  <br />
  5 : {{ stopped }} <br />

  <br />
  6 : {{ formatDate(dateGenerated) }} <br />

  <br />
  7 : {{ formatDate2(dateGenerated) }} <br />
</template>

<script setup lang="ts">
const dateGenerated = new Date("11/04/2004");

const started = dateGenerated.toDateString();
const stopped = dateGenerated.toLocaleDateString();
const stopped1 = dateGenerated.toLocaleString();

const starts = "2023-04-01";
const stops = "2023-04-30";

const formatDate = (value: any) => {
  const date = new Date(value);
  return date.toLocaleString("en-ZM", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit", 
  });
};

const formatDate2 = (value: any) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-ZM", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
  });
};

console.log(started);
console.log(stopped);
</script>
