"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import api from "@/services/api";
import map from "./MapClient.module.css";

// ícone padrão do Leaflet (ajuste necessário no Next)
const DefaultIcon = L.icon({
  iconUrl: "/images/icons/pin.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultCenter = { lat: -24.496174, lng: -47.846708 };

export default function MapClient() {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  function MapClickHandler() {
    useMapEvents({
      click(event) {
        setMarker({ lat: event.latlng.lat, lng: event.latlng.lng });
        setStatus(null);
      },
    });
    return null;
  }

  async function saveLocation() {
    if (!marker) return;
    setSaving(true);
    setStatus(null);

    try {
      await api.post("/sensors", {
        lat: marker.lat,
        lng: marker.lng,
        source: "user_click",
        timestamp: new Date().toISOString(),
      });

      setStatus("Localização salva com sucesso ✅");
    } catch (error) {
      console.error(error);
      setStatus("Falha ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* BOTÕES */}
      <div style={{ marginBottom: 8 }}>
        <button
          className="btn-item btn-primary"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setMarker({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => setStatus("Não foi possível obter a localização.")
            );
          }}
          style={{ marginRight: 8 }}
        >
          Usar minha localização
        </button>

        <button className="btn-item btn-primary" onClick={() => setMarker(null)}>
          Limpar marcação
        </button>
      </div>

      {/* MAPA */}
      <MapContainer
        center={marker ?? defaultCenter}
        zoom={marker ? 14 : 12}
        className={map.map}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {marker && (
          <Marker
            position={marker}
            draggable={true}
            eventHandlers={{
              dragend: (event) => {
                const latlng = event.target.getLatLng();
                setMarker({ lat: latlng.lat, lng: latlng.lng });
              },
            }}
          />
        )}
      </MapContainer>

      {/* INFO */}
      <div style={{ marginTop: 12 }}>
        {marker ? (
          <>
            <button
              className="btn-item btn-primary"
              onClick={saveLocation}
              disabled={saving}
              style={{ marginTop: 8 }}
            >
              {saving ? "Salvando..." : "Salvar localização"}
            </button>
          </>
        ) : (
          <div>Clique no mapa para marcar uma posição.</div>
        )}

        {status && <div style={{ marginTop: 8 }}>{status}</div>}
      </div>
    </div>
  );
}
