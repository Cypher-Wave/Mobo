"use client";

import React from "react";
import "./Reports.css";

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
  onCreate,
  onDelete,
}) => {
  return (
    <>
      <h1>Relatórios</h1>

      {/* Formulário de Criação */}
      <div className="button-container">
        <button className="btn btn-primary">Criar Registro</button>
        <button className="btn btn-primary" type="submit">
          Excluir Registro
        </button>
      </div>

      {/* Formulário de Exclusão */}
      <div className="table">
        <div className="user-list">
          {/* Cabeçalho da Tabela */}
          <div className="table-header">
            <div className="table-cell">SELECIONAR</div>
            <div className="table-cell">ÍNDICE</div>
            <div className="table-cell">DATA COLHEITA</div>
            <div className="table-cell">HORA INÍCIO</div>
            <div className="table-cell">HORA TÉRMINO</div>
            <div className="table-cell">DURAÇÃO</div>
            <div className="table-cell">QUANTIDADE COLHIDA</div>
            <div className="table-cell">PLANTAÇÃO</div>
            <div className="table-cell">QUALIDADE</div>
          </div>

          {/* Linhas da Tabela */}
          {/* {harvests.map((harvest, i) => (
            <div className="table-row" key={harvest._id}>
              <div className="table-cell">
                <input
                  type="checkbox"
                  className="select-record"
                  name="selected_id"
                  value={harvest._id}
                />
              </div>
              <div className="table-cell">
                {(currentPage - 1) * itemsPerPage + i + 1}
              </div>
              <div className="table-cell">
                {new Date(harvest.harvestDate).toLocaleDateString("pt-BR")}
              </div>
              <div className="table-cell">{harvest.harvestStart}</div>
              <div className="table-cell">{harvest.harvestEnd}</div>
              <div className="table-cell">{harvest.harvestDuration}</div>
              <div className="table-cell">{harvest.harvestedQuantity}</div>
              <div className="table-cell">
                {harvest.planting?.plantingName || "-"}
              </div>
              <div className="table-cell">{harvest.quality}/10</div>
            </div>
          ))} */}
          <div className="table-row">
              <div className="table-cell">
                <input
                  type="checkbox"
                  className="select-record"
                  name="selected_id"
                />
              </div>
              <div className="table-cell">
                1
              </div>
              <div className="table-cell">
                27/10/2025
              </div>
              <div className="table-cell">10:00</div>
              <div className="table-cell">12:00</div>
              <div className="table-cell">2:00</div>
              <div className="table-cell">500kg</div>
              <div className="table-cell">
                Area 1
              </div>
              <div className="table-cell">9/10</div>
            </div>
        </div>

        {/* Paginação */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`?page=${page}`}
              className={page === currentPage ? "active" : ""}
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
