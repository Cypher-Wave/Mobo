"use client";

import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import api from "@/services/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: -24.4675, lng: -47.8507 }; // exemplo

export default function MapClient() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setStatus(null);
  }, []);

  const onMarkerDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, []);

  const saveLocation = useCallback(async () => {
    if (!marker) return;
    setSaving(true);
    setStatus(null);
    try {
      const res =  api.post("/sensors", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: marker.lat,
          lng: marker.lng,
          // opcional: userId, deviceId, metadata...
          source: "user_click",
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      setStatus("Localização salva com sucesso ✅");
    } catch (err) {
      console.error(err);
      setStatus("Falha ao salvar. Veja o console.");
    } finally {
      setSaving(false);
    }
  }, [marker]);

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button
          onClick={async () => {
            // tentar pegar geolocalização do navegador
            try {
              const pos = await new Promise<GeolocationPosition>(
                (resolve, reject) =>
                  navigator.geolocation.getCurrentPosition(resolve, reject)
              );
              setMarker({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            } catch (err) {
              setStatus("Permissão de localização negada ou indisponível.");
            }
          }}
          style={{ marginRight: 8 }}
        >
          Usar minha localização
        </button>

        <button
          onClick={() => {
            setMarker(null);
            setStatus(null);
          }}
        >
          Limpar marcação
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker ?? defaultCenter}
        zoom={marker ? 14 : 10}
        onClick={onMapClick}
      >
        {marker && (
          <Marker
            position={marker}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </GoogleMap>

      <div style={{ marginTop: 12 }}>
        <div>
          {marker ? (
            <>
              <div>
                Lat: {marker.lat.toFixed(6)} — Lng: {marker.lng.toFixed(6)}
              </div>
              <button
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
        </div>

        {status && <div style={{ marginTop: 8 }}>{status}</div>}
      </div>
    </div>
  );
}
