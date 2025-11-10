import { ISensorData } from "@/types/SensorData";

const colors1 = [
  "rgb(180, 234, 72)",
  "rgb(144, 171, 96)",
  "rgb(97, 116, 61)",
  "rgb(48, 74, 13)",
  "rgb(34, 44, 21)",
];

const colors2 = [
  "rgb(174, 88, 119)",
  "rgb(241, 43, 115)",
  "rgb(183, 10, 73)",
  "rgb(131, 5, 51)",
  "rgb(92, 6, 37)",
];

export const temperature = (data: ISensorData[]) => {
  const filtered = data.filter(
    (s) => s.sensor?.sensorType == "temperature" // ✅ só sensores de um tipo
  );

  return {
    labels: filtered.map((s) => s.planting?.plantingName ?? "Sem nome"),
    datasets: [
      {
        data: filtered.map((s) => s.temperature ?? 0), // ✅ Nunca undefined
        backgroundColor: colors2,
        borderColor: ["rgb(236, 226, 214)"],
        borderWidth: 2,
      },
    ],
  };
};

export const airHumidity = (data: ISensorData[]) => {
  const filtered = data.filter(
    (s) => s.sensor?.sensorType == "air_humidity" // ✅ só sensores de um tipo
  );

  return {
    labels: filtered.map((s) => s.planting?.plantingName ?? "Sem nome"),
    datasets: [
      {
        data: filtered.map((s) => s.airHumidity ?? 0),
        backgroundColor: colors1,
        borderColor: ["rgb(236, 226, 214)"],
        borderWidth: 2,
      },
    ],
  };
};

export const soilHumidity = (data: ISensorData[]) => {
  const filtered = data.filter(
    (s) => s.sensor?.sensorType == "soil_humidity" // ✅ só sensores de um tipo
  );

  return {
    labels: filtered.map((s) => s.planting?.plantingName ?? "Sem nome"),
    datasets: [
      {
        data: filtered.map((s) => s.soilHumidity ?? 0), // ✅ Nunca undefined
        backgroundColor: colors1,
        borderColor: ["rgb(236, 226, 214)"],
        borderWidth: 2,
      },
    ],
  };
};
