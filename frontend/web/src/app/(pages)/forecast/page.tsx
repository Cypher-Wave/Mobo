"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import forecastStyle from "./Forecast.module.css";

interface EventItem {
  title: string;
  time: string;
}

interface DayEvents {
  day: number;
  month: number;
  year: number;
  events: EventItem[];
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const Forecast: React.FC = () => {
  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState<number>(today.getDate());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [eventsArr, setEventsArr] = useState<DayEvents[]>([]);
  const [dateInput, setDateInput] = useState<string>("");

  /** Carrega eventos do localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) setEventsArr(JSON.parse(saved));
  }, []);

  /** Salva eventos no localStorage */
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  }, [eventsArr]);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  function changeMonth(offset: number) {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  }

  function gotoDate() {
    const [m, y] = dateInput.split("/").map((v) => parseInt(v));
    if (!isNaN(m) && !isNaN(y) && m > 0 && m <= 12 && dateInput.length >= 7) {
      setMonth(m - 1);
      setYear(y);
    } else {
      alert("Data Inválida");
    }
  }

  function convertTime(time: string) {
    const [h, m] = time.split(":").map(Number);
    const format = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${format}`;
  }

  function updateEvents(dayNum: number): EventItem[] {
    const found = eventsArr.find(
      (ev) => ev.day === dayNum && ev.month === month + 1 && ev.year === year
    );
    return found ? found.events : [];
  }

  function addEvent(title: string, from: string, to: string) {
    if (!title || !from || !to) {
      alert("Preencha todos os campos!");
      return;
    }

    const newEvent: EventItem = {
      title,
      time: `${convertTime(from)} - ${convertTime(to)}`,
    };

    setEventsArr((prev) => {
      const existingDay = prev.find(
        (e) => e.day === activeDay && e.month === month + 1 && e.year === year
      );
      if (existingDay) {
        existingDay.events.push(newEvent);
        return [...prev];
      } else {
        return [
          ...prev,
          { day: activeDay, month: month + 1, year, events: [newEvent] },
        ];
      }
    });
  }

  function deleteEvent(title: string) {
    if (!confirm("Você deseja excluir essa marcação?")) return;
    setEventsArr((prev) =>
      prev
        .map((day) =>
          day.day === activeDay && day.month === month + 1 && day.year === year
            ? {
                ...day,
                events: day.events.filter((e) => e.title !== title),
              }
            : day
        )
        .filter((day) => day.events.length > 0)
    );
  }

  /** Monta os dias */
  const days: React.ReactNode[] = [];

  for (let x = day; x > 0; x--) {
    days.push(
      <div key={`p${x}`} className={forecastStyle.prevDate}>
        {prevDays - x + 1}
      </div>
    );
  }

  for (let i = 1; i <= lastDate; i++) {
    const hasEvent = eventsArr.some(
      (e) => e.day === i && e.month === month + 1 && e.year === year
    );
    const isToday =
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth();

    const classes = [
      forecastStyle.day,
      isToday ? forecastStyle.today : "",
      activeDay === i ? forecastStyle.active : "",
      hasEvent ? forecastStyle.event : "",
    ]
      .filter(Boolean)
      .join(" ");

    days.push(
      <div key={i} className={classes} onClick={() => setActiveDay(i)}>
        {i}
      </div>
    );
  }

  for (let j = 1; j <= nextDays; j++) {
    days.push(
      <div key={`n${j}`} className={forecastStyle.nextDate}>
        {j}
      </div>
    );
  }

  const activeEvents = updateEvents(activeDay);

  return (
    <>
      <h1 className={forecastStyle.title}>Previsão Colheita</h1>

      <div className={forecastStyle.calendar}>
        {/* LEFT */}
        <div className={forecastStyle.left}>
          <div className={forecastStyle.month}>
            <i
              className={`fas fa-angle-left ${forecastStyle.prev}`}
              onClick={() => changeMonth(-1)}
            ></i>

            <div className={forecastStyle.date}>
              {months[month]} {year}
            </div>

            <i
              className={`fas fa-angle-right ${forecastStyle.next}`}
              onClick={() => changeMonth(1)}
            ></i>
          </div>

          <div className={forecastStyle.weekdays}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className={forecastStyle.days}>{days}</div>

          <div className={forecastStyle.gotoToday}>
            <div className={forecastStyle.goto}>
              <input
                type="text"
                placeholder="mes/ano"
                className={forecastStyle.dateInput}
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
              <button className={forecastStyle.gotoBtn} onClick={gotoDate}>
                Procurar
              </button>
            </div>

            <button
              className={forecastStyle.todayBtn}
              onClick={() => {
                const now = new Date();
                setMonth(now.getMonth());
                setYear(now.getFullYear());
                setActiveDay(now.getDate());
              }}
            >
              Hoje
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className={forecastStyle.right}>
          <div className={forecastStyle.todayDate}>
            <div className={forecastStyle.eventDay}>
              {new Date(year, month, activeDay).toLocaleDateString("pt-BR", {
                weekday: "long",
              })}
            </div>

            <div className={forecastStyle.eventDate}>
              {activeDay} {months[month]} {year}
            </div>
          </div>

          <div className={forecastStyle.events}>
            {activeEvents.length > 0 ? (
              activeEvents.map((ev, i) => (
                <div
                  key={i}
                  className={forecastStyle.eventCard}
                  onClick={() => deleteEvent(ev.title)}
                >
                  <div className={forecastStyle.titleRow}>
                    <i className="fas fa-circle"></i>
                    <h3 className={forecastStyle.eventTitle}>{ev.title}</h3>
                  </div>
                  <div className={forecastStyle.eventTime}>{ev.time}</div>
                </div>
              ))
            ) : (
              <div className={forecastStyle.noEvent}>
                <Image
                  src="/images/eventsCalend.png"
                  alt="Sem Eventos"
                  width={400}
                  height={400}
                />
                <p>Você ainda não possui marcações.</p>
              </div>
            )}
          </div>

          <button
            className={forecastStyle.addEvent}
            onClick={() => {
              const title = prompt("Título do evento:");
              const from = prompt("Hora início (hh:mm):");
              const to = prompt("Hora fim (hh:mm):");
              if (title && from && to) addEvent(title, from, to);
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Forecast;
