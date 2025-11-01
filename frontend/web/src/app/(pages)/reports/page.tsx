"use client";

import React from "react";
import report from "./Reports.module.css";

interface Harvest {
  _id: string;
  harvestDate: string;
  harvestStart: string;
  harvestEnd: string;
  harvestDuration: string;
  harvestedQuantity: number;
  planting: { plantingName: string };
  quality: number;
}

interface PagesLayoutProps {
  children?: React.ReactNode;
  harvests?: Harvest[];
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  onCreate?: (event: React.FormEvent) => void;
  onDelete?: (event: React.FormEvent) => void;
}

const Reports: React.FC<PagesLayoutProps> = ({
  harvests = [],
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
}) => {
  return (
    <>
      <h1>Relatórios</h1>

      {/* Botões */}
      <div className={report.buttonContainer}>
        <button className="btn btn-primary">Criar Registro</button>
        <button className="btn btn-primary" type="submit">
          Excluir Registro
        </button>
      </div>

      {/* Tabela */}
      <div className={report.table}>
        <div className={report.userList}>
          {/* Cabeçalho */}
          <div className={report.tableHeader}>
            <div className={report.tableCell}>SELECIONAR</div>
            <div className={report.tableCell}>ÍNDICE</div>
            <div className={report.tableCell}>DATA COLHEITA</div>
            <div className={report.tableCell}>HORA INÍCIO</div>
            <div className={report.tableCell}>HORA TÉRMINO</div>
            <div className={report.tableCell}>DURAÇÃO</div>
            <div className={report.tableCell}>QUANTIDADE COLHIDA</div>
            <div className={report.tableCell}>PLANTAÇÃO</div>
            <div className={report.tableCell}>QUALIDADE</div>
          </div>

          {/* Linha mockada */}
          <div className={report.tableRow}>
            <div className={report.tableCell}>
              <input
                type="checkbox"
                className={report.selectRecord}
                name="selected_id"
              />
            </div>
            <div className={report.tableCell}>1</div>
            <div className={report.tableCell}>27/10/2025</div>
            <div className={report.tableCell}>10:00</div>
            <div className={report.tableCell}>12:00</div>
            <div className={report.tableCell}>2:00</div>
            <div className={report.tableCell}>500kg</div>
            <div className={report.tableCell}>Área 1</div>
            <div className={report.tableCell}>9/10</div>
          </div>
        </div>

        {/* Paginação */}
        <div className={report.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`?page=${page}`}
              className={
                page === currentPage ? report.active : report.pageLink
              }
            >
              {page}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reports;
